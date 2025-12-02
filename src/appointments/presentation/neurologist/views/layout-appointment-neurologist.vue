<script setup>
const appointments = [
  {
    id: 1,
    date: "2025-12-05",
    time: "09:30",
    patientName: "Juan Pérez",
    type: "Consulta inicial",
    status: "confirmed",
    notes: "Evaluación neurológica completa + MRI previa.",
  },
  {
    id: 2,
    date: "2025-12-05",
    time: "11:00",
    patientName: "María García",
    type: "Control",
    status: "pending",
    notes: "Revisión de tratamiento para epilepsia.",
  },
  {
    id: 3,
    date: "2025-12-06",
    time: "15:00",
    patientName: "Luis Gómez",
    type: "Teleconsulta",
    status: "confirmed",
    notes: "Seguimiento trastorno del sueño.",
  },
  {
    id: 4,
    date: "2025-12-07",
    time: "10:15",
    patientName: "Ana Torres",
    type: "Consulta inicial",
    status: "cancelled",
    notes: "Cancelada por el paciente.",
  },
];
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <div>
          <h1 class="title">Appointments</h1>
          <p class="subtitle">
            Vista de tus próximas citas con pacientes
          </p>
        </div>

        <div class="actions">
          <button class="btn-outline">Filtrar</button>
          <button class="btn-primary">Nueva cita</button>
        </div>
      </header>

      <!-- Card principal -->
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">Próximas citas</h2>
          <span class="badge">{{ appointments.length }} en total</span>
        </div>

        <div v-if="appointments.length === 0" class="empty">
          Aún no tienes citas programadas.
        </div>

        <div v-else class="table-wrapper">
          <table class="table">
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Notas</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="appt in appointments" :key="appt.id">
              <td>{{ appt.date }}</td>
              <td>{{ appt.time }}</td>
              <td>{{ appt.patientName }}</td>
              <td>{{ appt.type }}</td>
              <td>
                  <span
                      :class="[
                      'status-pill',
                      `status-${appt.status.toLowerCase()}`
                    ]"
                  >
                    {{ appt.status }}
                  </span>
              </td>
              <td class="notes-cell">
                {{ appt.notes }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.3rem;
}

.title {
  margin: 0;
  font-size: 1.6rem;
  color: #111827;
}

.subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-outline,
.btn-primary {
  border-radius: 0.6rem;
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
  border: 1px solid transparent;
}

.btn-outline {
  background: white;
  border-color: #cbd5e1;
  color: #111827;
}

.btn-outline:hover {
  background: #f3f4f6;
}

.btn-primary {
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
}

/* Card */
.card {
  background: white;
  border-radius: 0.9rem;
  padding: 1.2rem 1.2rem 1.1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
  margin-top: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.card-title {
  margin: 0;
  font-size: 1rem;
  color: #111827;
}

.badge {
  font-size: 0.8rem;
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

/* Tabla */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.table th,
.table td {
  padding: 0.55rem 0.4rem;
  text-align: left;
  white-space: nowrap;
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

.notes-cell {
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Estado cita */
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-confirmed {
  background: #dcfce7;
  color: #166534;
}

.status-pending {
  background: #fef9c3;
  color: #854d0e;
}

.status-cancelled {
  background: #fee2e2;
  color: #b91c1c;
}

/* Empty */
.empty {
  font-size: 0.9rem;
  color: #6b7280;
  padding: 0.7rem 0.2rem 0.2rem;
}

/* Responsive */
@media (max-width: 640px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
