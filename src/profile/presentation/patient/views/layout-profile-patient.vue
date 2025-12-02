<script setup>
import { computed } from "vue";
import { useIamApi } from "../../../../iam/application/iam.storage.js";

const iamStore = useIamApi();

// Objeto de usuario con el nuevo shape
const user = computed(() => iamStore.user);

/* ============================
   Derivados de presentación
============================ */
const initial = computed(() => {
  const name = user.value?.fullName ?? "";
  return name ? name.trim().charAt(0).toUpperCase() : "N";
});

const statusLabel = computed(() =>
    user.value?.isActive ? "Cuenta activa" : "Cuenta inactiva"
);

const statusClass = computed(() =>
    user.value?.isActive ? "pill pill-active" : "pill pill-inactive"
);

// Formato de fecha de nacimiento y edad
const birthDateFormatted = computed(() => {
  const raw = user.value?.birthDate;
  if (!raw) return "—";
  const d = new Date(raw);
  // Formato en español (ej. 2 de diciembre de 2025)
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
});

const age = computed(() => {
  const raw = user.value?.birthDate;
  if (!raw) return "—";
  const d = new Date(raw);
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
  return isFinite(a) ? a : "—";
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div v-if="!user" class="empty">
        <p>No se encontró información del paciente.</p>
      </div>

      <div v-else class="profile-card">
        <!-- Header -->
        <div class="header">
          <div class="avatar">
            <span>{{ initial }}</span>
          </div>

          <div class="info">
            <h1 class="name">{{ user.fullName || "—" }}</h1>
            <p class="role">Paciente</p>

            <div class="chips">
              <span :class="statusClass">{{ statusLabel }}</span>
              <span class="pill pill-neutral" v-if="user?.userId != null">
                User ID: {{ user.userId }}
              </span>
              <span class="pill pill-neutral" v-if="user?.id != null">
                ID interno: {{ user.id }}
              </span>
            </div>
          </div>
        </div>

        <hr class="separator" />

        <!-- Información de contacto -->
        <div class="section">
          <h2 class="section-title">Información de Contacto</h2>

          <div class="grid">
            <div class="field">
              <label>Email</label>
              <p>{{ user.email || "—" }}</p>
            </div>

            <div class="field">
              <label>Teléfono</label>
              <p>{{ user.phoneNumber || "—" }}</p>
            </div>
          </div>
        </div>

        <!-- Datos personales -->
        <div class="section">
          <h2 class="section-title">Datos Personales</h2>

          <div class="grid">
            <div class="field">
              <label>Fecha de nacimiento</label>
              <p>{{ birthDateFormatted }}</p>
            </div>

            <div class="field">
              <label>Edad</label>
              <p>{{ age }}</p>
            </div>
          </div>
        </div>

        <!-- Dirección -->
        <div class="section">
          <h2 class="section-title">Dirección</h2>
          <p>{{ user.address || "—" }}</p>
        </div>

        <div class="footer">
          <button class="btn-outline" type="button">Editar Perfil (Próximamente)</button>
          <button class="btn-primary" type="button">Ver Panel de Pacientes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === LAYOUT === */
.page {
  padding: 2rem;
  background: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 820px;
  margin: 0 auto;
}

/* === CARD === */
.profile-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.06);
  border: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* === HEADER === */
.header {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
}

.info .name {
  margin: 0;
  font-size: 1.6rem;
  color: #1e293b;
}

.role {
  margin: 3px 0;
  color: #64748b;
  font-size: 0.95rem;
}

/* === CHIPS (PILLS) === */
.chips {
  margin-top: 6px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pill {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.pill-active {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.pill-inactive {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.pill-neutral {
  background: #e2e8f0;
  color: #334155;
  border: 1px solid #cbd5e1;
}

/* === CONTENT === */
.separator {
  border: none;
  border-bottom: 1px solid #ececec;
  margin: 0;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: #1e293b;
}

.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 700px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.field label {
  font-size: 0.78rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
}

.field p {
  margin: 4px 0 0;
  font-size: 1rem;
  color: #334155;
}

/* === BUTTONS === */
.footer {
  margin-top: 1rem;
  display: flex;
  gap: 12px;
}

.btn-outline {
  padding: 10px 16px;
  border: 1px solid #94a3b8;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-primary {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(59,130,246,0.25);
  transition: 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(59,130,246,0.3);
}

/*** EMPTY ***/
.empty {
  text-align: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  border: 1px solid #ececec;
}
</style>
