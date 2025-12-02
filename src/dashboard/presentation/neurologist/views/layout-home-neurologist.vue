<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { useIamApi } from "../../../../iam/application/iam.storage.js";
import { useHomeStorage } from "../../../application/patient/home.storage.js";

const store = useIamApi();
const storeHome = useHomeStorage();

/* ----------------------------
   DATA DE DEMO
----------------------------- */
const recentPrescriptions = ref([
  { id: 1, patientName: "Juan Pérez", createdAt: "2025-11-21", diagnosis: "Migraine", medication: "Sumatriptan 50mg" },
  { id: 2, patientName: "María García", createdAt: "2025-11-20", diagnosis: "Epilepsy", medication: "Levetiracetam 500mg" },
  { id: 3, patientName: "Luis Gómez", createdAt: "2025-11-18", diagnosis: "Sleep disorder", medication: "Melatonin 3mg" },
]);

const patients = ref([
  { id: 101, name: "Juan Pérez", lastVisit: "2025-11-21", condition: "Migraine" },
  { id: 102, name: "María García", lastVisit: "2025-11-19", condition: "Epilepsy" },
  { id: 103, name: "Luis Gómez", lastVisit: "2025-11-15", condition: "Sleep disorder" },
]);

/* ----------------------------
   INICIALES DEL USUARIO
----------------------------- */
const initials = computed(() => {
  const fullName = store.user?.fullName ?? "";
  if (!fullName) return "N";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
});

/* ----------------------------
   MODAL PARA ASIGNAR PACIENTE
----------------------------- */
const showAddPatientModal = ref(false);
const newPatientId = ref("");
const isSubmittingPatient = ref(false);
const addPatientError = ref(null);

async function addPatient() {
  addPatientError.value = null;

  if (!newPatientId.value) {
    addPatientError.value = "Patient ID is required.";
    return;
  }
  storeHome.assignNeurologistToPatient(newPatientId.value, {
    neurologistId: store.user.id
  });
}

/* ----------------------------
   MODAL NUEVO NEURO ASSESSMENT
----------------------------- */
const showNeuroModal = ref(false);
const isSubmittingNeuro = ref(false);
const neuroError = ref(null);

const neuroForm = ref({
  patientId: "",
  gaitScore: 0,
  balanceScore: 0,
  reflexScore: 0,
  cognitionScore: 0,
  memoryScore: 0,
  speechScore: 0,
  tremorScore: 0,
  strengthScore: 0,
  coordinationScore: 0,
  sensoryScore: 0,
  eegSummary: "",
  neurologistNotes: "",
  isFlagged: false,
  alertLevel: 0,
});

// Abre el modal desde el botón
function addNewNeuroAssessment() {
  neuroError.value = null;
  showNeuroModal.value = true;
}

// Envía el formulario al backend
async function submitNeuroAssessment() {
  neuroError.value = null;

  if (!neuroForm.value.patientId) {
    neuroError.value = "Patient ID is required.";
    return;
  }

  try {
    isSubmittingNeuro.value = true;

    const payload = {
      patientId: Number(neuroForm.value.patientId),
      neurologistId: store.user?.id ?? 0,
      gaitScore: Number(neuroForm.value.gaitScore),
      balanceScore: Number(neuroForm.value.balanceScore),
      reflexScore: Number(neuroForm.value.reflexScore),
      cognitionScore: Number(neuroForm.value.cognitionScore),
      memoryScore: Number(neuroForm.value.memoryScore),
      speechScore: Number(neuroForm.value.speechScore),
      tremorScore: Number(neuroForm.value.tremorScore),
      strengthScore: Number(neuroForm.value.strengthScore),
      coordinationScore: Number(neuroForm.value.coordinationScore),
      sensoryScore: Number(neuroForm.value.sensoryScore),
      eegSummary: neuroForm.value.eegSummary,
      neurologistNotes: neuroForm.value.neurologistNotes,
      isFlagged: Boolean(neuroForm.value.isFlagged),
      alertLevel: Number(neuroForm.value.alertLevel),
    };

    await storeHome.createNeuroAssessment(payload);

    // Reset
    showNeuroModal.value = false;
    neuroForm.value = {
      patientId: "",
      gaitScore: 0,
      balanceScore: 0,
      reflexScore: 0,
      cognitionScore: 0,
      memoryScore: 0,
      speechScore: 0,
      tremorScore: 0,
      strengthScore: 0,
      coordinationScore: 0,
      sensoryScore: 0,
      eegSummary: "",
      neurologistNotes: "",
      isFlagged: false,
      alertLevel: 0,
    };
  } catch (err) {
    console.error(err);
    neuroError.value =
        err?.response?.data?.message || err?.message || "Could not create neuro assessment.";
  } finally {
    isSubmittingNeuro.value = false;
  }
}

/* ----------------------------
   BLOQUEAR SCROLL DEL FONDO + ESC
----------------------------- */
const anyModalOpen = computed(() => showAddPatientModal.value || showNeuroModal.value);

function onKeydown(e) {
  if (e.key === "Escape") {
    if (showNeuroModal.value) showNeuroModal.value = false;
    if (showAddPatientModal.value) showAddPatientModal.value = false;
  }
}

watch(anyModalOpen, (open) => {
  if (open) {
    document.body.classList.add("no-scroll");
    window.addEventListener("keydown", onKeydown, { passive: true });
  } else {
    document.body.classList.remove("no-scroll");
    window.removeEventListener("keydown", onKeydown);
  }
});

onUnmounted(() => {
  document.body.classList.remove("no-scroll");
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-shell">
      <!-- Sidebar / Profile -->
      <aside class="sidebar">
        <div class="profile-card" v-if="!store.loading && store.user">
          <div class="avatar">
            <span>{{ initials }}</span>
          </div>
          <h2 class="name">{{ store.user.fullName }}</h2>
          <p class="role">Neurologist</p>

          <div class="profile-info">
            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{{ store.user.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">License</span>
              <span class="value">{{ store.user.licenseNumber }}</span>
            </div>
            <div class="info-item">
              <span class="label">Clinic</span>
              <span class="value">
                {{ store.user.clinicAddress || "No info" }}
              </span>
            </div>
          </div>

          <router-link class="btn-profile" to="/neurologist/profile">
            View full profile
          </router-link>
        </div>

        <div v-else class="profile-card loading">
          Loading profile...
        </div>
      </aside>

      <!-- Main content -->
      <main class="main">
        <!-- Top bar -->
        <header class="top-bar">
          <div>
            <p class="welcome">
              {{ store.loading ? "Loading..." : "Welcome back," }}
            </p>
            <h1 class="top-title">
              {{ store.loading || !store.user ? "Neurologist" : "Dr. " + store.user.fullName }}
            </h1>
          </div>

          <div class="top-actions">
            <button class="btn-pill">New prescription</button>

            <!-- BOTÓN QUE ABRE EL MODAL DE PACIENTE -->
            <button class="btn-outline" @click="showAddPatientModal = true">
              Add patient
            </button>

            <!-- BOTÓN QUE ABRE EL MODAL DE NEURO ASSESSMENT -->
            <button class="btn-outline" @click="addNewNeuroAssessment">
              New Neuro Assessment
            </button>
          </div>
        </header>

        <section class="grid">
          <!-- Recetas recientes -->
          <section class="card">
            <div class="card-header">
              <h2>Recent prescriptions</h2>
              <button class="link-small">View all</button>
            </div>
            <div class="card-body">
              <ul class="list">
                <li v-for="rx in recentPrescriptions" :key="rx.id" class="list-item">
                  <div class="list-main">
                    <p class="list-title">{{ rx.medication }}</p>
                    <p class="list-subtitle">
                      {{ rx.diagnosis }} • {{ rx.patientName }}
                    </p>
                  </div>
                  <div class="list-meta">
                    <span class="pill pill-light">{{ rx.createdAt }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Pacientes -->
          <section class="card">
            <div class="card-header">
              <h2>My patients</h2>
              <button class="link-small">View all</button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                <tr>
                  <th>Patient</th>
                  <th>Last visit</th>
                  <th>Main condition</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="p in patients" :key="p.id">
                  <td>{{ p.name }}</td>
                  <td>{{ p.lastVisit }}</td>
                  <td>{{ p.condition }}</td>
                  <td class="table-actions">
                    <button class="link-small">Open record</button>
                  </td>
                </tr>
                </tbody>
              </table>
              <p v-if="patients.length === 0" class="empty">
                No patients assigned yet.
              </p>
            </div>
          </section>

          <!-- Resumen / métricas simples -->
          <section class="card full">
            <div class="card-header">
              <h2>Overview</h2>
            </div>
            <div class="overview-grid">
              <div class="stat">
                <p class="stat-label">Active patients</p>
                <p class="stat-value">{{ patients.length }}</p>
              </div>
              <div class="stat">
                <p class="stat-label">Prescriptions this week</p>
                <p class="stat-value">{{ recentPrescriptions.length }}</p>
              </div>
              <div class="stat">
                <p class="stat-label">Next appointments</p>
                <p class="stat-value">3</p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>

    <!-- -------------------------
         MODAL: ADD PATIENT
    -------------------------- -->
    <div
        v-if="showAddPatientModal"
        class="modal-backdrop"
        @click.self="showAddPatientModal = false"
    >
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="add-patient-title">
        <header class="modal-header">
          <h3 id="add-patient-title">Add Patient</h3>
          <button class="close" @click="showAddPatientModal = false">✕</button>
        </header>

        <main class="modal-body">
          <label class="field">
            <span>Patient ID:</span>
            <input
                v-model="newPatientId"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                placeholder="Enter patient ID"
                class="input"
            />
          </label>

          <p v-if="addPatientError" class="error-msg">{{ addPatientError }}</p>
        </main>

        <footer class="modal-footer">
          <button class="btn" type="button" @click="showAddPatientModal = false">
            Cancel
          </button>
          <button class="btn btn-primary" :disabled="isSubmittingPatient" @click="addPatient" type="button">
            {{ isSubmittingPatient ? "Assigning..." : "Assign Patient" }}
          </button>
        </footer>
      </div>
    </div>

    <!-- -------------------------
         MODAL: NEW NEURO ASSESSMENT
    -------------------------- -->
    <div
        v-if="showNeuroModal"
        class="modal-backdrop"
        @click.self="showNeuroModal = false"
    >
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="neuro-modal-title">
        <header class="modal-header">
          <h3 id="neuro-modal-title">New Neuro Assessment</h3>
          <button class="close" @click="showNeuroModal = false">✕</button>
        </header>

        <main class="modal-body">
          <!-- Patient ID (fila completa) -->
          <div class="field">
            <span>Patient ID</span>
            <input
                v-model="neuroForm.patientId"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                placeholder="Enter patient ID"
                class="input"
            />
          </div>

          <hr style="margin: 0.75rem 0" />

          <!-- GRID DE DOS COLUMNAS PARA LOS SCORES -->
          <div class="field-grid">
            <div class="field">
              <span>Gait score</span>
              <input v-model.number="neuroForm.gaitScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Balance score</span>
              <input v-model.number="neuroForm.balanceScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Reflex score</span>
              <input v-model.number="neuroForm.reflexScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Cognition score</span>
              <input v-model.number="neuroForm.cognitionScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Memory score</span>
              <input v-model.number="neuroForm.memoryScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Speech score</span>
              <input v-model.number="neuroForm.speechScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Tremor score</span>
              <input v-model.number="neuroForm.tremorScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Strength score</span>
              <input v-model.number="neuroForm.strengthScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Coordination score</span>
              <input v-model.number="neuroForm.coordinationScore" type="number" min="0" max="10" step="1" class="input" />
            </div>

            <div class="field">
              <span>Sensory score</span>
              <input v-model.number="neuroForm.sensoryScore" type="number" min="0" max="10" step="1" class="input" />
            </div>
          </div>

          <!-- CAMPOS DE TEXTO (fila completa) -->
          <div class="field">
            <span>EEG summary</span>
            <textarea v-model="neuroForm.eegSummary" rows="2" class="input" style="resize: vertical"></textarea>
          </div>

          <div class="field">
            <span>Neurologist notes</span>
            <textarea v-model="neuroForm.neurologistNotes" rows="3" class="input" style="resize: vertical"></textarea>
          </div>

          <div class="field" style="margin-top: 0.5rem">
            <label style="display: flex; align-items: center; gap: 0.5rem">
              <input type="checkbox" v-model="neuroForm.isFlagged" />
              <span>Flag as alert</span>
            </label>
          </div>

          <div class="field">
            <span>Alert level</span>
            <input v-model.number="neuroForm.alertLevel" type="number" min="0" max="3" step="1" class="input" />
          </div>

          <p v-if="neuroError" class="error-msg">{{ neuroError }}</p>
        </main>

        <footer class="modal-footer">
          <button class="btn" type="button" @click="showNeuroModal = false">
            Cancel
          </button>
          <button
              class="btn btn-primary"
              :disabled="isSubmittingNeuro"
              @click="submitNeuroAssessment"
              type="button"
          >
            {{ isSubmittingNeuro ? "Saving..." : "Save assessment" }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* PAGE */
.dashboard-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 1.5rem;
  box-sizing: border-box;
  background: #f5f5f7;
}

/* GRID GENERAL */
.dashboard-shell {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(240px, 280px) 1fr;
  gap: 1.5rem;
}

/* SIDEBAR */
.sidebar {
  display: flex;
}

.profile-card {
  background: #ffffff;
  color: #0f172a;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-card.loading {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
}

.name {
  font-size: 1.15rem;
  margin: 0;
}

.role {
  font-size: 0.9rem;
  color: #6b7280;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9ca3af;
}

.value {
  font-size: 0.9rem;
}

.btn-profile {
  margin-top: auto;
  align-self: flex-start;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  font-size: 0.8rem;
  color: #1f2933;
  text-decoration: none;
  transition: 0.15s;
  background: #ffffff;
}

.btn-profile:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

/* MAIN */
.main {
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* TOP BAR */
.top-bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.welcome {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.top-title {
  margin: 0.2rem 0 0;
  font-size: 1.4rem;
  color: #111827;
}

.top-actions {
  display: flex;
  gap: 0.5rem;
}

/* BUTTONS */
.btn-pill {
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.25);
  transition: 0.15s;
}

.btn-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(59, 130, 246, 0.35);
}

.btn-outline {
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #111827;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.15s;
}

.btn-outline:hover {
  background: #f3f4f6;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* CARDS */
.card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: 1px solid #e5e7eb;
}

.card.full {
  grid-column: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1rem;
  color: #111827;
}

/* LIST */
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.list-item {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  align-items: center;
  padding: 0.55rem 0.4rem;
  border-radius: 0.6rem;
  background: #f9fafb;
}

.list-main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.list-title {
  margin: 0;
  font-size: 0.9rem;
  color: #111827;
}

.list-subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.list-meta {
  display: flex;
  align-items: center;
}

.pill-light {
  background: #eff6ff;
  color: #1d4ed8;
}

/* TABLE */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.table th,
.table td {
  padding: 0.45rem 0.35rem;
  text-align: left;
}

.table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9ca3af;
  border-bottom: 1px solid #e5e7eb;
}

.table tbody tr:nth-child(odd) {
  background: #f9fafb;
}

/* OVERVIEW */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 0.6rem;
}

.stat {
  background: #f9fafb;
  border-radius: 0.9rem;
  padding: 0.7rem 0.8rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.2rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
}

/* -------------------------------
     MODAL STYLES
--------------------------------*/
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

/* Modal flexible + altura limitada */
.modal {
  background: #ffffff;
  border-radius: 12px;
  width: min(640px, 95vw);
  max-height: 90vh;             /* nunca supera la pantalla */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;             /* esconder overflow externo */
  animation: modalIn 0.2s ease-out;

  display: flex;                /* header - body - footer en columna */
  flex-direction: column;
}

@keyframes modalIn {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;               /* no se comprime */
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;               /* no se comprime */
}

/* solo el cuerpo hace scroll */
.modal-body {
  padding: 1rem;
  overflow-y: auto;
  flex: 1 1 auto;
  overscroll-behavior: contain; /* evita "arrastrar" scroll al fondo */
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.input {
  padding: 0.55rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.close {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
}

/* Botones genéricos de modal */
.btn {
  border-radius: 0.5rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* GRID de 2 columnas para los scores */
.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 0.5rem;
  margin-bottom: 0.75rem;
}

/* Responsive: en pantallas muy pequeñas, 1 columna */
@media (max-width: 480px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}

/* Bloquear scroll del body cuando un modal está abierto */
:global(body.no-scroll) {
  overflow: hidden;
}
</style>
