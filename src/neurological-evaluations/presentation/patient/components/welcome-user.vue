<script setup>
import { ref, computed, watch, onMounted } from "vue";
import DoughnutGraphic from "./doughnut-graphic.vue";
import RadarChartsGraphic from "./radar-charts-graphic.vue";
import PieChartsGraphic from "./pie-charts-graphic.vue";
import LineChartsGraphic from "./line-charts-graphic.vue";
import {useHomeStorage} from "../../../../dashboard/application/patient/home.storage.js";
import {useIamApi} from "../../../../iam/application/iam.storage.js";

/* Stores */
const store = useHomeStorage();
const storeIam = useIamApi();

/* Datos base */
const patient = computed(() => storeIam.user ?? null);

/* La evaluación más reciente (ajusta según cómo guardes la respuesta) */
const record = computed(() => {
  const r = store.neuroAssessment;
  if (Array.isArray(r)) return r[0] ?? null;
  return r ?? null;
});

/* Carga al montar o cuando el paciente esté listo */
watch(
    () => patient.value?.id,
    (id) => { if (id) store.getNeuroAssessmentById(id); },
    { immediate: true }
);
onMounted(() => {
  if (patient.value?.id) store.getNeuroAssessmentById(patient.value.id);
});

/* Fecha última evaluación (fallback a createdAt) */
const lastEvaluationDate = computed(() => record.value?.lastEvaluationDate || record.value?.createdAt || null);
function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    }).format(new Date(iso));
  } catch { return "—"; }
}

/* Iniciales del paciente */
const patientInitials = computed(() => {
  const n = patient.value?.fullName || "";
  if (n) {
    const parts = n.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase() || "P";
  }
  const p = record.value?.patient;
  if (p?.firstName || p?.lastName) {
    return ((p.firstName?.[0] ?? "") + (p.lastName?.[0] ?? "")).toUpperCase() || "P";
  }
  return "P";
});

/* Utilidades KPI */
function avg(...vals) {
  const nums = vals.filter(v => typeof v === "number" && !Number.isNaN(v));
  if (!nums.length) return null;
  return Math.round((nums.reduce((a,b)=>a+b, 0) / nums.length) * 10) / 10; // 1 decimal
}
const cap10 = v => Math.max(0, Math.min(10, Number(v) || 0));
const toPct = v => `${Math.round((cap10(v)/10)*100)}%`;

/* KPI derivados del record (0..10) */
const kpi = computed(() => {
  const r = record.value || {};
  return {
    mobility: avg(r.gaitScore, r.balanceScore, r.coordinationScore, r.strengthScore),
    cognition: avg(r.cognitionScore, r.memoryScore, r.speechScore),
    sensory:  avg(r.sensoryScore, r.reflexScore),
    tremor:   typeof r.tremorScore === "number" ? r.tremorScore : null,
  };
});

/* Riesgo / alerta a partir de isFlagged + alertLevel */
const alertLevel = computed(() => Number(record.value?.alertLevel ?? 0));
const isFlagged  = computed(() => !!record.value?.isFlagged);
const riskLabel = computed(() => {
  if (isFlagged.value && alertLevel.value >= 2) return "Riesgo alto";
  if (isFlagged.value || alertLevel.value === 1) return "Riesgo moderado";
  return "Estable";
});
const riskClass = computed(() => {
  if (isFlagged.value && alertLevel.value >= 2) return "pill pill-danger";
  if (isFlagged.value || alertLevel.value === 1) return "pill pill-warn";
  return "pill pill-ok";
});

/* Acciones */
const emit = defineEmits(["quick-test", "report-help", "download-report"]);
function onQuickTest()  { emit("quick-test",      { recordId: record.value?.id ?? null }); }
function onReportHelp() { showReportModal.value = true; }
function onDownload()   { emit("download-report", { recordId: record.value?.id ?? null }); }

/* Modal Reportar ayuda */
const showReportModal   = ref(false);
const reportText        = ref("");
const notifyCaregivers  = ref(true);
function closeModal()   { showReportModal.value = false; reportText.value = ""; notifyCaregivers.value = true; }
function submitReport() {
  const text = (reportText.value || "").trim();
  if (!text) return;
  emit("report-help", {
    recordId: record.value?.id ?? null,
    text, notify: notifyCaregivers.value,
    timestamp: new Date().toISOString(),
  });
  closeModal();
}

/* Insights básicos (texto dinámico según KPI y flags) */
const insights = computed(() => {
  const items = [];
  if (isFlagged.value) items.push("Se detectaron señales que requieren atención (Flag activo).");
  if (alertLevel.value >= 2) items.push(`Nivel de alerta ${alertLevel.value}: priorizar seguimiento.`);
  if (kpi.value.mobility != null && kpi.value.mobility < 5) items.push("Movilidad por debajo del umbral recomendado.");
  if (kpi.value.cognition != null && kpi.value.cognition < 5) items.push("Cognición con tendencia baja: revisar memoria y lenguaje.");
  if (!items.length) items.push("Sin hallazgos críticos recientes.");
  return items;
});
</script>

<template>
  <div class="analytics">
    <!-- HERO -->
    <header class="hero">
      <div class="hero-left">
        <div class="avatar"><span>{{ patientInitials }}</span></div>
        <div class="hero-info">
          <h1 class="hero-title">Analítica Neurológica</h1>
          <p class="hero-sub">
            {{ patient?.fullName ?? "Paciente" }}
            <span class="divider">•</span>
            <span v-if="lastEvaluationDate">Última evaluación: <strong>{{ formatDate(lastEvaluationDate) }}</strong></span>
            <span v-else>evaluaciones registradas</span>
          </p>
          <div class="hero-pills">
            <span :class="riskClass">{{ riskLabel }}</span>
            <span class="pill pill-neutral" v-if="typeof alertLevel === 'number'">Alerta: {{ alertLevel }}</span>
          </div>
        </div>
      </div>

      <div class="hero-actions" role="toolbar" aria-label="Acciones">
        <button class="btn btn-primary" @click="onQuickTest" title="Iniciar test rápido">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 L20 12 L12 22 L4 12 Z"/></svg>
          Test Rápido
        </button>
        <button class="btn btn-warning" @click="onReportHelp" title="Reportar ayuda">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          Reportar Ayuda
        </button>
        <button class="btn btn-secondary" @click="onDownload" title="Descargar reporte PDF">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20h14v-2H5v2zM12 3v9l3-3 1.4 1.4L12 16 7.6 10.4 9 9 12 12V3z"/></svg>
          Descargar
        </button>
      </div>
    </header>

    <!-- KPIs -->
    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top">
          <h3>Movilidad</h3>
          <span class="kpi-val">{{ kpi.mobility ?? "—" }}</span>
        </div>
        <div class="bar"><div class="bar-fill" :style="{ width: kpi.mobility != null ? (kpi.mobility/10*100)+'%' : '0%' }"></div></div>
        <p class="kpi-sub">Promedio de marcha, balance, coordinación y fuerza.</p>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <h3>Cognición</h3>
          <span class="kpi-val">{{ kpi.cognition ?? "—" }}</span>
        </div>
        <div class="bar"><div class="bar-fill" :style="{ width: kpi.cognition != null ? (kpi.cognition/10*100)+'%' : '0%' }"></div></div>
        <p class="kpi-sub">Memoria, lenguaje y funciones ejecutivas.</p>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <h3>Sensorial</h3>
          <span class="kpi-val">{{ kpi.sensory ?? "—" }}</span>
        </div>
        <div class="bar"><div class="bar-fill" :style="{ width: kpi.sensory != null ? (kpi.sensory/10*100)+'%' : '0%' }"></div></div>
        <p class="kpi-sub">Reflejos y percepción sensorial.</p>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <h3>Temblor</h3>
          <span class="kpi-val">{{ kpi.tremor ?? "—" }}</span>
        </div>
        <div class="bar"><div class="bar-fill" :style="{ width: kpi.tremor != null ? (kpi.tremor/10*100)+'%' : '0%' }"></div></div>
        <p class="kpi-sub">Intensidad promedio de temblor.</p>
      </div>
    </section>

    <!-- Charts -->
    <section class="charts">
      <article class="chart-card">
        <div class="card-head">
          <div>
            <h3>Balance y Fuerza</h3>
            <p class="muted">Radar</p>
          </div>
          <small class="score">Última: {{ record?.motor?.radarScore ?? "—" }}</small>
        </div>
        <div class="chart-body">
          <RadarChartsGraphic v-show="!!record" :record="record" />
        </div>
      </article>

      <article class="chart-card">
        <div class="card-head">
          <div>
            <h3>Tono Muscular</h3>
            <p class="muted">Doughnut</p>
          </div>
          <small class="score">Última: {{ record?.motor?.doughnutScore ?? "—" }}</small>
        </div>
        <div class="chart-body">
          <DoughnutGraphic v-show="!!record" :record="record" />
        </div>
      </article>

      <article class="chart-card">
        <div class="card-head">
          <div>
            <h3>Función Ejecutiva</h3>
            <p class="muted">Pie</p>
          </div>
          <small class="score">Última: {{ record?.cognitive?.pieScore ?? "—" }}</small>
        </div>
        <div class="chart-body">
          <PieChartsGraphic v-show="!!record" :record="record" />
        </div>
      </article>

      <article class="chart-card wide">
        <div class="card-head">
          <div>
            <h3>Seguimiento Temporal</h3>
            <p class="muted">Line</p>
          </div>
          <small class="score">Última: {{ record?.cognitive?.lineScore ?? "—" }}</small>
        </div>
        <div class="chart-body">
          <LineChartsGraphic v-show="!!record" :record="record" />
        </div>
      </article>
    </section>

    <!-- Insights -->
    <section class="insights">
      <h2 class="insights-title">Insights</h2>
      <ul class="insights-list">
        <li v-for="(it, i) in insights" :key="i">{{ it }}</li>
      </ul>
    </section>

    <!-- Empty state -->
    <p v-if="!record" class="empty">
      Aún no hay evaluaciones cargadas para mostrar analítica.
    </p>

    <!-- Modal: Reportar Ayuda -->
    <div v-if="showReportModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-label="Reportar ayuda">
        <header class="modal-header">
          <h3>Reportar ayuda</h3>
          <button class="close" @click="closeModal" aria-label="Cerrar">✕</button>
        </header>
        <main class="modal-body">
          <label class="field">
            <span>Describe la situación</span>
            <textarea v-model="reportText" rows="4" placeholder="Escribe aquí..."></textarea>
          </label>
          <label class="field small">
            <input type="checkbox" v-model="notifyCaregivers" />
            Notificar al equipo de cuidado
          </label>
        </main>
        <footer class="modal-footer">
          <button class="btn" @click="closeModal">Cancelar</button>
          <button class="btn btn-primary" @click="submitReport">Enviar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bg: #f6f8fb;
  --card: #ffffff;
  --ink: #0f172a;
  --muted: #6b7280;
  --accent: #3b82f6;
  --accent2: #06b6d4;
  --ok: #16a34a;
  --warn: #f59e0b;
  --danger: #dc2626;
  --glass: rgba(255,255,255,0.65);
}

/* ===== LAYOUT GENERAL ===== */
.analytics {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(180deg, #eef2ff 0%, var(--bg) 100%);
  color: var(--ink);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* ===== HERO ===== */
.hero {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #eef2ff, #e0f2fe);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 10px 28px rgba(15,23,42,0.06);
}
.hero-left { display: flex; gap: 12px; align-items: center; }
.avatar {
  width: 48px; height: 48px; border-radius: 999px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff; font-weight: 800; font-size: 18px;
}
.hero-info { display: flex; flex-direction: column; gap: 4px; }
.hero-title { margin: 0; font-size: 18px; letter-spacing: -0.2px; color: #0b1220; }
.hero-sub { margin: 0; font-size: 13px; color: var(--muted); }
.hero-pills { display: flex; gap: 8px; margin-top: 4px; flex-wrap: wrap; }
.divider { opacity: .35; margin: 0 6px; }

.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

/* ===== PILLS ===== */
.pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid;
}
.pill-ok     { background: #dcfce7; color: #166534; border-color: #86efac; }
.pill-warn   { background: #fef9c3; color: #854d0e; border-color: #fde047; }
.pill-danger { background: #fee2e2; color: #b91c1c; border-color: #fecaca; }
.pill-neutral{ background: #e2e8f0; color: #334155; border-color: #cbd5e1; }

/* ===== BOTONES ===== */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 10px; border: 0; cursor: pointer;
  background: var(--card); color: var(--ink);
  box-shadow: 0 1px 3px rgba(15,23,42,0.06);
  font-weight: 700; transition: transform .12s ease, box-shadow .12s ease;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(11,18,32,0.08); }
.btn-primary { background: linear-gradient(90deg, var(--accent), var(--accent2)); color: #fff; }
.btn-secondary { background: #0f172a; color: #fff; }
.btn-warning { background: #f97316; color: #fff; }
.icon { width: 16px; height: 16px; fill: currentColor; }

/* ===== KPIs ===== */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 12px;
  margin: 14px 0 16px;
}
.kpi-card {
  background: var(--card);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.06);
}
.kpi-top { display: flex; align-items: baseline; justify-content: space-between; }
.kpi-top h3 { margin: 0; font-size: 14px; color: #0b1220; }
.kpi-val { font-weight: 800; font-size: 18px; color: var(--accent); }
.bar { margin-top: 8px; height: 8px; border-radius: 999px; background: #f1f5f9; overflow: hidden; }
.bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 999px; }
.kpi-sub { margin: 6px 0 0; font-size: 12px; color: var(--muted); }

/* ===== CHARTS ===== */
.charts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
}
.chart-card {
  background: var(--card);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.06);
  min-height: 300px;
  display: flex; flex-direction: column;
}
.chart-card.wide { grid-column: 1 / -1; }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.card-head h3 { margin: 0; font-size: 15px; }
.muted { margin: 0; color: var(--muted); font-size: 12px; }
.score { color: var(--accent); font-weight: 700; font-size: 12px; }
.chart-body { flex: 1 1 auto; display: grid; place-items: center; }

/* ===== INSIGHTS ===== */
.insights { margin: 14px 0 8px; }
.insights-title { margin: 0 0 8px; font-size: 15px; color: #0b1220; }
.insights-list { margin: 0; padding-left: 18px; color: #374151; }

/* ===== EMPTY ===== */
.empty {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #9ca3af;
}

/* ===== MODAL ===== */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 80;
  background: rgba(2,6,23,0.5);
  display: grid; place-items: center; padding: 20px;
}
.modal {
  width: min(680px, 95vw);
  max-height: 90vh;
  background: var(--card);
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 30px 60px rgba(2,6,23,0.4);
  display: flex; flex-direction: column;
}
.modal-header, .modal-footer {
  padding: 12px 16px;
  border-bottom: 1px solid #eef2f6;
}
.modal-footer { border-top: 1px solid #eef2f6; border-bottom: none; display: flex; justify-content: flex-end; gap: 8px; }
.modal-body {
  padding: 16px; overflow-y: auto; flex: 1 1 auto;
}
.close { border: 0; background: transparent; cursor: pointer; font-size: 18px; }
.field { display: grid; gap: 6px; margin-bottom: 12px; }
.field.small { grid-auto-flow: column; align-items: center; gap: 8px; width: fit-content; }
.field textarea {
  width: 100%; min-height: 120px; resize: vertical;
  border-radius: 8px; border: 1px solid #d1d5db; padding: 10px;
  font-size: 0.95rem;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 980px) {
  .kpi-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 720px) {
  .charts { grid-template-columns: 1fr; }
  .hero { flex-direction: column; align-items: stretch; gap: 10px; }
  .hero-actions { justify-content: flex-start; }
}
</style>
