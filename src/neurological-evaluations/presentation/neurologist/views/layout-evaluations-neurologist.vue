<script setup>
// Datos mockeados para visualizar la vista
const evaluations = [
  {
    id: 1,
    patientName: "Juan Pérez",
    neurologistName: "Dr. Romero",
    gaitScore: 78,
    balanceScore: 67,
    reflexScore: 34,
    cognitionScore: 56,
    memoryScore: 67,
    speechScore: 78,
    tremorScore: 89,
    strengthScore: 65,
    coordinationScore: 34,
    sensoryScore: 78,
    eegSummary: "Actividad normal con leve variación temporal.",
    neurologistNotes: "Paciente muestra avances positivos.",
    isFlagged: false,
    alertLevel: 0,
  },
  {
    id: 2,
    patientName: "María García",
    neurologistName: "Dr. Romero",
    gaitScore: 45,
    balanceScore: 34,
    reflexScore: 22,
    cognitionScore: 38,
    memoryScore: 41,
    speechScore: 59,
    tremorScore: 72,
    strengthScore: 55,
    coordinationScore: 29,
    sensoryScore: 60,
    eegSummary: "Se detectan descargas cortas focales.",
    neurologistNotes: "Se recomienda seguimiento semanal.",
    isFlagged: true,
    alertLevel: 2,
  },
  {
    id: 3,
    patientName: "Luis Gómez",
    neurologistName: "Dr. Romero",
    gaitScore: 85,
    balanceScore: 80,
    reflexScore: 75,
    cognitionScore: 90,
    memoryScore: 88,
    speechScore: 92,
    tremorScore: 45,
    strengthScore: 74,
    coordinationScore: 80,
    sensoryScore: 85,
    eegSummary: "Lectura completamente normal.",
    neurologistNotes: "Sin observaciones relevantes.",
    isFlagged: false,
    alertLevel: 0,
  },
];
</script>

<template>
  <div class="page">
    <div class="container">

      <!-- Header -->
      <header class="header">
        <div>
          <h1 class="title">Neurological Evaluations</h1>
          <p class="subtitle">
            Lista de evaluaciones neurológicas realizadas a pacientes
          </p>
        </div>

        <button class="btn-primary">Nueva evaluación</button>
      </header>

      <!-- Tabla -->
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">Evaluaciones registradas</h2>
          <span class="badge">{{ evaluations.length }} items</span>
        </div>

        <div class="table-wrapper">
          <table class="table">
            <thead>
            <tr>
              <th>Paciente</th>
              <th>Gait</th>
              <th>Balance</th>
              <th>Cognition</th>
              <th>Memory</th>
              <th>Speech</th>
              <th>Tremor</th>
              <th>Strength</th>
              <th>Alert</th>
              <th>Notas</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="ev in evaluations" :key="ev.id">
              <td class="patient">
                {{ ev.patientName }}
                <span v-if="ev.isFlagged" class="flag">⚠</span>
              </td>

              <td><span :class="['score', getColor(ev.gaitScore)]">{{ ev.gaitScore }}</span></td>
              <td><span :class="['score', getColor(ev.balanceScore)]">{{ ev.balanceScore }}</span></td>
              <td><span :class="['score', getColor(ev.cognitionScore)]">{{ ev.cognitionScore }}</span></td>
              <td><span :class="['score', getColor(ev.memoryScore)]">{{ ev.memoryScore }}</span></td>
              <td><span :class="['score', getColor(ev.speechScore)]">{{ ev.speechScore }}</span></td>
              <td><span :class="['score', getColor(ev.tremorScore)]">{{ ev.tremorScore }}</span></td>
              <td><span :class="['score', getColor(ev.strengthScore)]">{{ ev.strengthScore }}</span></td>

              <td>
                  <span :class="['alert-pill', `alert-${ev.alertLevel}`]">
                    {{ ev.alertLevel === 0 ? 'OK' : ev.alertLevel }}
                  </span>
              </td>

              <td class="notes-cell">
                {{ ev.neurologistNotes }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
// Composable simple dentro del mismo archivo
export default {
  methods: {
    getColor(score) {
      if (score >= 75) return "good";
      if (score >= 50) return "medium";
      return "low";
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f7;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title {
  margin: 0;
  font-size: 1.7rem;
  color: #111827;
}

.subtitle {
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.btn-primary {
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* Card */
.card {
  background: white;
  border-radius: 0.9rem;
  padding: 1.1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.card-title {
  margin: 0;
  font-size: 1rem;
  color: #111827;
}

.badge {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

/* Tabla */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.87rem;
}

.table th {
  text-align: left;
  padding: 0.6rem;
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
}

.table td {
  padding: 0.6rem;
}

.patient {
  font-weight: 600;
}

.flag {
  color: #dc2626;
  margin-left: 6px;
  font-size: 1rem;
}

/* Puntajes (scores) */
.score {
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: white;
}

.good {
  background: #16a34a;
}

.medium {
  background: #fbbf24;
  color: #1d1d1d;
}

.low {
  background: #dc2626;
}

/* Alert-level */
.alert-pill {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.alert-0 {
  background: #e2e8f0;
  color: #475569;
}

.alert-1 {
  background: #fef9c3;
  color: #854d0e;
}

.alert-2 {
  background: #fee2e2;
  color: #b91c1c;
}

.alert-3 {
  background: #991b1b;
  color: white;
}

/* Notas */
.notes-cell {
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 700px) {
  .table {
    font-size: 0.75rem;
  }

  .notes-cell {
    max-width: 120px;
  }
}
</style>
