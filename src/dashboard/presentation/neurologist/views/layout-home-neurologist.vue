<script setup>
import { ref, computed } from "vue";
import { useIamApi } from "../../../../iam/application/iam.storage.js";

const store = useIamApi();

// Datos de demo (luego los sustituyes por API real)
const recentPrescriptions = ref([
  {
    id: 1,
    patientName: "Juan Pérez",
    createdAt: "2025-11-21",
    diagnosis: "Migraine",
    medication: "Sumatriptan 50mg",
  },
  {
    id: 2,
    patientName: "María García",
    createdAt: "2025-11-20",
    diagnosis: "Epilepsy",
    medication: "Levetiracetam 500mg",
  },
  {
    id: 3,
    patientName: "Luis Gómez",
    createdAt: "2025-11-18",
    diagnosis: "Sleep disorder",
    medication: "Melatonin 3mg",
  },
]);

const patients = ref([
  {
    id: 101,
    name: "Juan Pérez",
    lastVisit: "2025-11-21",
    condition: "Migraine",
  },
  {
    id: 102,
    name: "María García",
    lastVisit: "2025-11-19",
    condition: "Epilepsy",
  },
  {
    id: 103,
    name: "Luis Gómez",
    lastVisit: "2025-11-15",
    condition: "Sleep disorder",
  },
]);

// Iniciales a partir de store.user.fullName
const initials = computed(() => {
  const fullName = store.user?.fullName ?? "";
  if (!fullName) return "N";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
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
              {{
                store.loading || !store.user
                    ? "Neurologist"
                    : "Dr. " + store.user.fullName
              }}
            </h1>
          </div>

          <div class="top-actions">
            <button class="btn-pill">
              New prescription
            </button>
            <button class="btn-outline">
              Add patient
            </button>
            <button class="btn-outline">
              New Neuro Assessment
            </button>
          </div>
        </header>

        <section class="grid">
          <!-- Recetas recientes -->
          <section class="card">
            <div class="card-header">
              <h2>Recent prescriptions</h2>
              <button class="link-small">
                View all
              </button>
            </div>
            <div class="card-body">
              <ul class="list">
                <li
                    v-for="rx in recentPrescriptions"
                    :key="rx.id"
                    class="list-item"
                >
                  <div class="list-main">
                    <p class="list-title">
                      {{ rx.medication }}
                    </p>
                    <p class="list-subtitle">
                      {{ rx.diagnosis }} • {{ rx.patientName }}
                    </p>
                  </div>
                  <div class="list-meta">
                    <span class="pill pill-light">
                      {{ rx.createdAt }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Pacientes -->
          <section class="card">
            <div class="card-header">
              <h2>My patients</h2>
              <button class="link-small">
                View all
              </button>
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
                    <button class="link-small">
                      Open record
                    </button>
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
  background: #f5f5f7; /* fondo gris muy suave */
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

/* GRID CARDS */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

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

.link-small {
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
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

.pill {
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.75rem;
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

.table-actions {
  text-align: right;
}

.empty {
  margin-top: 0.7rem;
  font-size: 0.8rem;
  color: #9ca3af;
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
  margin: 0 0 0.2rem;
}

.stat-value {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
  }

  .main {
    order: -1;
  }
}

@media (max-width: 700px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .top-actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
