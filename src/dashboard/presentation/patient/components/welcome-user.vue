<script setup>
import { ref, computed, onMounted } from "vue";
import DoughnutGraphic from "./doughnut-graphic.vue";
import RadarChartsGraphic from "./radar-charts-graphic.vue";
import PieChartsGraphic from "./pie-charts-graphic.vue";
import LineChartsGraphic from "./line-charts-graphic.vue";
import { useHomeStorage } from "../../../application/patient/home.storage.js";

const store = useHomeStorage();
const record = computed(() => store.neuroAssessment?.[0] ?? null);

// 👉 Aquí podrías también tener store.patient si haces otra llamada a la API
// const patient = computed(() => store.patient ?? null);

// Cargar el registro al montar
onMounted(() => {
  // Ajusta el id según necesites (por route param, por ejemplo)
  // Aquí se consulta a la base de datos para obtener la evaluación (y posiblemente datos del paciente)
  store.getNeuroAssessmentById(1);

  // Si tuvieras un método separado para solo datos del paciente:
  // store.getPatientById(1);
});

/* Nombre e info del paciente basados en el record */
const patientName = computed(() => {
  // ajusta estas propiedades según tu DTO real
  return (
      record.value?.patient?.fullName ||
      `${record.value?.patient?.firstName ?? ""} ${record.value?.patient?.lastName ?? ""}`.trim() ||
      record.value?.name ||
      "Sin nombre"
  );
});

const patientId = computed(() => {
  return record.value?.patient?.id ?? record.value?.patientId ?? record.value?.id ?? null;
});

const patientAge = computed(() => {
  // si en tu API viene como edad directa, úsala:
  if (record.value?.patient?.age != null) return record.value.patient.age;

  // si viene fecha de nacimiento, puedes calcularla en otro momento
  return null;
});

const lastEvaluationDate = computed(() => {
  return record.value?.lastEvaluationDate || record.value?.createdAt || null;
});

const patientInitials = computed(() => {
  const p = record.value?.patient;
  const n = record.value?.name;
  if (p?.firstName || p?.lastName) {
    return (
        (p.firstName?.charAt(0) ?? "") +
        (p.lastName?.charAt(0) ?? "")
    ).toUpperCase() || "P";
  }
  if (typeof n === "string" && n.length > 0) {
    return n.charAt(0).toUpperCase();
  }
  return "P";
});

/* emits para que el padre maneje la lógica real */
const emit = defineEmits(["quick-test", "report-help", "download-report"]);

/* Estado del modal / reporte */
const showReportModal = ref(false);
const reportText = ref("");
const notifyCaregivers = ref(true);

/* Handlers */
function onQuickTest() {
  emit("quick-test", { recordId: record.value?.id ?? null });
}

function onReportHelp() {
  showReportModal.value = true;
}

function onDownloadReport() {
  emit("download-report", { recordId: record.value?.id ?? null });
}

function closeModal() {
  showReportModal.value = false;
  reportText.value = "";
  notifyCaregivers.value = true;
}

function submitReport() {
  const text = (reportText.value || "").trim();
  if (!text) {
    // aquí puedes mostrar un toast
    return;
  }

  emit("report-help", {
    recordId: record.value?.id ?? null,
    text,
    notify: notifyCaregivers.value,
    timestamp: new Date().toISOString(),
  });

  closeModal();
}
</script>

<template>
  <div class="dashboard">
    <!-- Top bar -->
    <header class="topbar">
      <div class="title-wrap">
        <h1 class="app-title">Panel de Evaluaciones Neurológicas</h1>
        <p class="subtitle">
          Visualización de resultados por evaluación
        </p>
      </div>

      <div class="actions" role="toolbar" aria-label="Acciones principales">
        <button class="btn btn-primary" @click="onQuickTest" title="Iniciar test rápido">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2 L20 12 L12 22 L4 12 Z" fill="currentColor" />
          </svg>
          Test Rápido
        </button>

        <button class="btn btn-warning" @click="onReportHelp" title="Reportar que necesita ayuda">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="currentColor"
            />
          </svg>
          Reportar Ayuda
        </button>

        <button class="btn btn-secondary" @click="onDownloadReport" title="Descargar reporte PDF">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M5 20h14v-2H5v2zM12 3v9l3-3 1.4 1.4L12 16 7.6 10.4 9 9 12 12V3z"
                fill="currentColor"
            />
          </svg>
          Descargar Reporte
        </button>
      </div>
    </header>

    <!-- 🧍‍♂️ Resumen / ficha del paciente -->
    <section class="patient-summary" aria-label="Información del paciente">
      <div class="patient-avatar">
        <span>{{ patientInitials }}</span>
      </div>

      <div class="patient-info">
        <h2 class="patient-name">
          {{ patientName }}
        </h2>
        <p class="patient-meta">
          <span v-if="patientId">ID Paciente: <strong>#{{ patientId }}</strong></span>
          <span v-if="patientAge != null"> • Edad: <strong>{{ patientAge }}</strong></span>
        </p>
        <p class="patient-meta" v-if="lastEvaluationDate">
          Última evaluación: <strong>{{ lastEvaluationDate }}</strong>
        </p>
      </div>
    </section>

    <!-- Evaluaciones agrupadas: cada par tiene un título -->
    <section class="evaluation-group">
      <h2 class="group-title">Evaluación Motora</h2>

      <div class="grid">
        <!-- Card 1 -->
        <article class="chart-card" aria-label="Balance y Fuerza (Radar)">
          <div class="card-header">
            <div>
              <h3>Balance y Fuerza</h3>
              <p class="muted">Radar</p>
            </div>
            <small class="score">Última: {{ record?.motor?.radarScore ?? "—" }}</small>
          </div>
          <div class="chart-body">
            <RadarChartsGraphic v-show="record" :record="record" />
          </div>
        </article>

        <!-- Card 2 -->
        <article class="chart-card" aria-label="Tono Muscular (Doughnut)">
          <div class="card-header">
            <div>
              <h3>Tono Muscular</h3>
              <p class="muted">Doughnut</p>
            </div>
            <small class="score">Última: {{ record?.motor?.doughnutScore ?? "—" }}</small>
          </div>
          <div class="chart-body">
            <DoughnutGraphic v-show="record" :record="record" />
          </div>
        </article>
      </div>
    </section>

    <section class="evaluation-group">
      <h2 class="group-title">Evaluación Cognitiva</h2>

      <div class="grid">
        <!-- Card 3 -->
        <article class="chart-card" aria-label="Función Ejecutiva (Pie)">
          <div class="card-header">
            <div>
              <h3>Función Ejecutiva</h3>
              <p class="muted">Pie</p>
            </div>
            <small class="score">Última: {{ record?.cognitive?.pieScore ?? "—" }}</small>
          </div>
          <div class="chart-body">
            <PieChartsGraphic v-show="record" :record="record" />
          </div>
        </article>

        <!-- Card 4 -->
        <article class="chart-card" aria-label="Seguimiento Temporal (Line)">
          <div class="card-header">
            <div>
              <h3>Seguimiento Temporal</h3>
              <p class="muted">Line</p>
            </div>
            <small class="score">Última: {{ record?.cognitive?.lineScore ?? "—" }}</small>
          </div>
          <div class="chart-body">
            <LineChartsGraphic v-show="record" :record="record" />
          </div>
        </article>
      </div>
    </section>

    <!-- Modal sencillo para Reportar Ayuda -->
    <div v-if="showReportModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-label="Reportar Ayuda">
        <header class="modal-header">
          <h3>Reportar Ayuda</h3>
          <button class="close" @click="closeModal" aria-label="Cerrar">✕</button>
        </header>

        <main class="modal-body">
          <label class="field">
            <span>Descripción:</span>
            <textarea
                v-model="reportText"
                rows="4"
                placeholder="Describe por qué se necesita ayuda..."
            ></textarea>
          </label>

          <label class="field small">
            <input type="checkbox" v-model="notifyCaregivers" />
            Notificar al equipo de cuidado
          </label>
        </main>

        <footer class="modal-footer">
          <button class="btn" @click="closeModal">Cancelar</button>
          <button class="btn btn-primary" @click="submitReport">Enviar Reporte</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bg: #f6f8fb;
  --card: #ffffff;
  --accent: #3b82f6;
  --accent-2: #06b6d4;
  --muted: #6b7280;
  --glass: rgba(255,255,255,0.6);
}

/* Layout */
.dashboard {
  padding: 20px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(180deg, #eef2ff 0%, var(--bg) 100%);
  min-height: 100vh;
  color: #0f172a;
}

/* Top bar */
.topbar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title-wrap { flex: 1 1 auto; }
.app-title {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: #0b1220;
}
.subtitle {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

/* 🧍‍♂️ patient summary */
.patient-summary {
  margin: 12px 0 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.8);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(15,23,42,0.06);
}

.patient-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}

.patient-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.patient-name {
  margin: 0;
  font-size: 16px;
  color: #0b1220;
}

.patient-meta {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

/* Buttons */
.actions { display: flex; gap: 10px; align-items: center; }
.btn {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  background: var(--card);
  color: #0b1220;
  box-shadow: 0 1px 3px rgba(15,23,42,0.06);
  font-weight: 600;
  transition: transform .12s ease, box-shadow .12s ease;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(11,18,32,0.08); }
.btn:active { transform: translateY(0); }

/* Semantic buttons */
.btn-primary { background: linear-gradient(90deg,var(--accent),var(--accent-2)); color: white; }
.btn-secondary { background: #0f172a; color: white; }
.btn-warning { background: #f97316; color: white; }

/* Icon */
.icon { width: 16px; height: 16px; opacity: 0.95; }

/* Group title */
.evaluation-group { margin: 18px 0; }
.group-title {
  margin: 8px 0 12px;
  color: #0b1220;
  font-size: 16px;
  border-left: 4px solid var(--accent);
  padding-left: 10px;
  background: linear-gradient(90deg, rgba(59,130,246,0.06), transparent);
  border-radius: 4px;
}

/* Grid 2 columnas */
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 14px;
}

/* Card */
.chart-card {
  background: var(--card);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(12,18,26,0.06);
  display: flex;
  flex-direction: column;
  min-height: 300px;
  transition: transform .12s ease;
}
.chart-card:hover { transform: translateY(-6px); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.card-header h3 { margin: 0; font-size: 15px; }
.muted { margin: 0; color: var(--muted); font-size: 12px; }
.score { color: var(--accent); font-weight: 700; font-size: 13px; }

/* Chart container */
.chart-body {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
  padding: 20px;
}
.modal {
  width: 720px;
  max-width: 100%;
  background: var(--card);
  border-radius: 10px;
  box-shadow: 0 30px 60px rgba(2,6,23,0.4);
  overflow: hidden;
}
.modal-header {
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 12px 16px;
  border-bottom: 1px solid #eef2f6;
}
.modal-body { padding: 16px; }
.modal-footer { padding: 12px 16px; display:flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #eef2f6; }

.close {
  border: none; background: transparent; cursor: pointer; font-size: 18px;
}

.field { display:block; margin-bottom: 12px; }
.field small { display:block; color: var(--muted); font-size: 12px; }

/* Responsive: una columna en pantallas pequeñas */
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .topbar { flex-direction: column; align-items: stretch; gap: 12px; }
  .actions { justify-content: flex-start; }
  .patient-summary {
    flex-direction: row;
    align-items: center;
  }
}
</style>
