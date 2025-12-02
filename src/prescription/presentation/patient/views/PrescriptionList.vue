<script setup>
import { ref, computed, onMounted } from "vue";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage";
import PrescriptionCard from "../components/PrescriptionCard.vue";

/** Paciente actual */
const patientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

/** === MODO DEMO ===
 * Cambia a false cuando tengas el backend listo.
 */
const USE_DEMO = true;

/** Datos demo con el shape solicitado */
const DEMO_PRESCRIPTIONS = [
  {
    id: 1001,
    patientId,
    neurologistId: "6cb57c40-5f8e-4b45-9e95-0f1a19b3a111",
    issuedAt: "2025-11-21T10:30:00.000Z",
    signatureHash: "0xA12B34C56DEF987",
    revoked: false,
    medicines: [
      { name: "Levetiracetam", dosage: "500 mg", frequency: "2 veces al día" },
      { name: "Clonazepam", dosage: "0.5 mg", frequency: "1 vez al día (noche)" },
    ],
  },
  {
    id: 1002,
    patientId,
    neurologistId: "6cb57c40-5f8e-4b45-9e95-0f1a19b3a111",
    issuedAt: "2025-11-18T14:05:00.000Z",
    signatureHash: "0xFFEECCAA9922",
    revoked: true,
    medicines: [
      { name: "Sumatriptán", dosage: "50 mg", frequency: "Según crisis (máx 2/día)" },
    ],
  },
  {
    id: 1003,
    patientId,
    neurologistId: "d1c5f8b0-4c89-4b7f-9b9a-2f4c9bde1f22",
    issuedAt: "2025-12-01T08:00:00.000Z",
    signatureHash: "0xBEEFABCD1234",
    revoked: false,
    medicines: [
      { name: "Melatonina", dosage: "3 mg", frequency: "1 vez al día (noche)" },
    ],
  },
];

const prescriptions = ref([]);
const loading = ref(true);
const loadError = ref(null);

/** Contadores */
const totalPrescriptions = computed(() => prescriptions.value.length);
const activeCount = computed(() => prescriptions.value.filter(p => !p.revoked).length);
const revokedCount = computed(() => prescriptions.value.filter(p => p.revoked).length);

/** Filtro UI */
const filter = ref("all"); // 'all' | 'active' | 'revoked'
const filteredPrescriptions = computed(() => {
  if (filter.value === "active") return prescriptions.value.filter(p => !p.revoked);
  if (filter.value === "revoked") return prescriptions.value.filter(p => p.revoked);
  return prescriptions.value;
});

onMounted(async () => {
  try {
    loading.value = true;

    if (USE_DEMO) {
      prescriptions.value = DEMO_PRESCRIPTIONS;
      return;
    }

    const res = await PrescriptionStorage.getPatientPrescriptions(patientId);
    if (Array.isArray(res) && res.length) {
      prescriptions.value = res;
    } else {
      // fallback demo si viene vacío
      prescriptions.value = DEMO_PRESCRIPTIONS;
    }
  } catch (e) {
    // fallback demo si hay error
    console.error("Error loading patient prescriptions", e);
    loadError.value = "No se pudieron cargar las recetas.";
    prescriptions.value = DEMO_PRESCRIPTIONS;
  } finally {
    loading.value = false;
  }
});

/** Utilidades de fecha (para usar en header si se quisiera) */
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso ?? "—";
  }
}
</script>

<template>
  <div class="page">
    <div class="page-inner">
      <header class="header">
        <div class="header-left">
          <p class="eyebrow">Patient space</p>
          <h1 class="title">My Prescriptions</h1>
          <p class="subtitle">
            Review the prescriptions your neurologist has issued for you.
          </p>
        </div>

        <div v-if="!loading" class="header-summary">
          <div class="summary-block">
            <p class="summary-label">TOTAL</p>
            <p class="summary-number">{{ totalPrescriptions }}</p>
            <p class="summary-caption">all items</p>
          </div>

          <div class="divider"></div>

          <div class="summary-block">
            <p class="summary-label">ACTIVE</p>
            <p class="summary-number">{{ activeCount }}</p>
            <p class="summary-caption">current</p>
          </div>

          <div class="divider"></div>

          <div class="summary-block">
            <p class="summary-label">REVOKED</p>
            <p class="summary-number">{{ revokedCount }}</p>
            <p class="summary-caption">cancelled</p>
          </div>
        </div>
      </header>

      <!-- Filtros -->
      <div class="filters">
        <button
            class="filter-btn"
            :class="{ active: filter === 'all' }"
            @click="filter = 'all'"
            type="button"
        >
          All
        </button>
        <button
            class="filter-btn"
            :class="{ active: filter === 'active' }"
            @click="filter = 'active'"
            type="button"
        >
          Active
        </button>
        <button
            class="filter-btn"
            :class="{ active: filter === 'revoked' }"
            @click="filter = 'revoked'"
            type="button"
        >
          Revoked
        </button>
      </div>

      <!-- Estados -->
      <p v-if="loading" class="empty-state">Loading prescriptions...</p>
      <p v-else-if="filteredPrescriptions.length === 0" class="empty-state">
        No prescriptions for this filter.
      </p>

      <!-- Lista -->
      <div v-else class="list">
        <PrescriptionCard
            v-for="(p, index) in filteredPrescriptions"
            :key="p.id"
            :prescription="p"
            :index="index + 1"
            class="list-item"
        />
      </div>

      <!-- Nota de error (opcional) -->
      <p v-if="loadError" class="error-note">{{ loadError }}</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  min-height: 100%;
}

.page-inner {
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 72px 56px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.5rem;
  margin-bottom: 18px;
}

.header-left {
  max-width: 520px;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 4px;
}

.title {
  font-size: 2.3rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin: 0 0 4px;
}

.subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #6b7280;
}

/* SUMMARY */
.header-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 0.9rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(209, 213, 219, 0.9);
  box-shadow: 0 18px 35px rgba(148, 163, 184, 0.25);
  min-width: 280px;
}

.summary-block {
  text-align: right;
  min-width: 82px;
}

.summary-label {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ca3af;
}

.summary-number {
  margin: 2px 0 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.summary-caption {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
}

.divider {
  width: 1px;
  align-self: stretch;
  background: rgba(209, 213, 219, 0.8);
}

/* FILTERS */
.filters {
  display: flex;
  gap: 8px;
  margin: 12px 0 8px;
}

.filter-btn {
  padding: 6px 12px;
  font-size: 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #fff;
  color: #111827;
  cursor: pointer;
  transition: 0.15s ease;
}

.filter-btn:hover {
  background: #f3f4f6;
}

.filter-btn.active {
  background: #111827;
  border-color: #111827;
  color: #fff;
}

/* LISTA */
.empty-state {
  margin-top: 20px;
  font-size: 0.98rem;
  color: #9ca3af;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 14px;
}

.list-item {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeInUp 0.35s ease forwards;
}

.list-item:nth-child(1) { animation-delay: 0.03s; }
.list-item:nth-child(2) { animation-delay: 0.1s; }
.list-item:nth-child(3) { animation-delay: 0.18s; }
.list-item:nth-child(n + 4) { animation-delay: 0.22s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

/* NOTA ERROR */
.error-note {
  margin-top: 16px;
  color: #b91c1c;
  font-size: 0.9rem;
}

/* responsive */
@media (max-width: 960px) {
  .page-inner {
    padding: 28px 20px 40px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-summary {
    text-align: left;
  }
}
</style>
