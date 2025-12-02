<script setup>
import { ref, onMounted, computed } from "vue";
// import axios from "axios"; // si usas axios

// Aquí puedes obtener el id del usuario logueado
// por ejemplo desde localStorage, pinia, jwt, etc.
const neurologistId = ref(1); // <-- reemplaza por lo real

const neurologist = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Datos de ejemplo (hasta que conectes API)
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

const initials = computed(() => {
  if (!neurologist.value) return "N";
  const { firstName, lastName } = neurologist.value;
  return (
      (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "")
  ).toUpperCase();
});

const fullName = computed(() => {
  if (!neurologist.value) return "";
  return `${neurologist.value.firstName} ${neurologist.value.lastName}`;
});

async function loadNeurologist() {
  try {
    isLoading.value = true;
    error.value = null;

    // 🔗 Ejemplo de llamada a tu API .NET
    // const { data } = await axios.get(`/api/neurologists/${neurologistId.value}`);
    // neurologist.value = data;

    // Mientras tanto, mock:
    neurologist.value = {
      id: neurologistId.value,
      firstName: "Carlos",
      lastName: "Ramírez",
      email: "c.ramirez@auraneuro.com",
      licenseNumber: "CMP-12345",
      role: "Neurologist",
      city: "Lima",
      country: "Peru",
    };
  } catch (e) {
    console.error(e);
    error.value = "Error loading neurologist data";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadNeurologist();
});
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-shell">
      <!-- Sidebar / Profile simple -->
      <aside class="sidebar">
        <div class="profile-card" v-if="!isLoading && neurologist">
          <div class="avatar">
            <span>{{ initials }}</span>
          </div>
          <h2 class="name">{{ fullName }}</h2>
          <p class="role">{{ neurologist.role || "Neurologist" }}</p>

          <div class="profile-info">
            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{{ neurologist.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">License</span>
              <span class="value">{{ neurologist.licenseNumber }}</span>
            </div>
            <div class="info-item" v-if="neurologist.city || neurologist.country">
              <span class="label">Location</span>
              <span class="value">
                {{ neurologist.city }}{{ neurologist.country ? ', ' + neurologist.country : '' }}
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
              {{ isLoading ? 'Loading...' : 'Welcome back,' }}
            </p>
            <h1 class="top-title">
              {{ isLoading ? 'Neurologist' : 'Dr. ' + fullName }}
            </h1>
          </div>

          <div class="top-actions">
            <button class="btn-pill">
              New prescription
            </button>
            <button class="btn-outline">
              Add patient
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
.dashboard-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 1.5rem;
  box-sizing: border-box;
}

.dashboard-shell {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(240px, 280px) 1fr;
  gap: 1.5rem;
}

/* Sidebar / profile */
.sidebar {
  display: flex;
}

.profile-card {
  background: #0d0d16;
  color: #f5f5ff;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
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
  background: linear-gradient(135deg, #7145d8, #9c5bff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
}

.name {
  font-size: 1.15rem;
  margin: 0;
}

.role {
  font-size: 0.85rem;
  color: #bcbce8;
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
  color: #8b8bb8;
}

.value {
  font-size: 0.9rem;
}

.btn-profile {
  margin-top: auto;
  align-self: flex-start;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1px solid #3b3b66;
  font-size: 0.8rem;
  color: #f5f5ff;
  text-decoration: none;
  transition: 0.2s;
}

.btn-profile:hover {
  background: #1b1b2f;
  border-color: #7145d8;
}

/* Main */
.main {
  background: #05050a;
  border-radius: 1.5rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  color: #f5f5ff;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

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
  color: #bcbce8;
}

.top-title {
  margin: 0.2rem 0 0;
  font-size: 1.4rem;
}

.top-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-pill {
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  background: linear-gradient(135deg, #7145d8, #9c5bff);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(90, 54, 185, 0.6);
  transition: 0.15s;
}

.btn-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 13px 30px rgba(90, 54, 185, 0.8);
}

.btn-outline {
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  background: transparent;
  border: 1px solid #3b3b66;
  color: #f5f5ff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.15s;
}

.btn-outline:hover {
  background: #18182a;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.card {
  background: #0d0d18;
  border-radius: 1.2rem;
  padding: 1rem 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
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
}

.link-small {
  border: none;
  background: transparent;
  color: #9c88ff;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
}

/* List */
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
  background: rgba(255, 255, 255, 0.02);
}

.list-main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.list-title {
  margin: 0;
  font-size: 0.9rem;
}

.list-subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #bcbce8;
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
  background: rgba(156, 136, 255, 0.15);
  color: #e0dcff;
}

/* Table */
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
  color: #9b9bcc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.table tbody tr:nth-child(odd) {
  background: rgba(255, 255, 255, 0.01);
}

.table-actions {
  text-align: right;
}

.empty {
  margin-top: 0.7rem;
  font-size: 0.8rem;
  color: #9b9bcc;
}

/* Overview */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 0.6rem;
}

.stat {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.9rem;
  padding: 0.7rem 0.8rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #9b9bcc;
  margin: 0 0 0.2rem;
}

.stat-value {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Responsive */
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
