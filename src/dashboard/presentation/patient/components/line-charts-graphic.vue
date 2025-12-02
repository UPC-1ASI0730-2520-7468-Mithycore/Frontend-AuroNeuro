<template>
  <div class="chart-wrapper" :style="{ height: height + 'px' }">
    <canvas ref="canvasRef" aria-label="Rendimiento neurológico — línea"></canvas>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="!hasData" class="no-data">No hay datos para mostrar</div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import Chart from 'chart.js/auto'

/* --- props --- */
const props = defineProps({
  // record puede ser null al inicio
  record: { type: Object, required: false, default: null },
  // altura del contenedor para dar espacio al canvas
  height: { type: Number, default: 260 }
})

/* --- referencias / estado --- */
const canvasRef = ref(null)
let chartInstance = null

/* --- utilidades --- */
const hasData = computed(() => {
  // consideramos que hay datos si record es un objeto y tiene al menos una clave
  return !!props.record && Object.keys(props.record).length > 0
})

function buildLabelsAndValues(record) {
  if (!record) return { labels: [], values: [] }

  // Si el record es un objeto de pares clave:valor (como en tu ejemplo)
  const labels = Object.keys(record)
  const rawValues = Object.values(record)

  // Convertir a números (evitar NaN) y usar 0 como fallback
  const values = rawValues.map(v => {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  })

  return { labels, values }
}

function destroyChart() {
  try {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  } catch (err) {
    // no romper la app por errores al destruir
    // console.warn('Error destruyendo chart:', err)
  }
}

/* --- render / update --- */
async function renderLineChart(labels, values) {
  // esperar al DOM (útil si usamos v-if o el componente viene de keep-alive)
  await nextTick()

  const cvs = canvasRef.value
  if (!cvs || !(cvs instanceof HTMLCanvasElement)) {
    // canvas aun no listo
    // console.warn('Canvas no disponible todavía')
    return
  }

  const ctx = cvs.getContext && cvs.getContext('2d')
  if (!ctx) {
    // console.error('No se pudo obtener context 2d')
    return
  }

  try {
    // Si ya existe, actualizar datos
    if (chartInstance) {
      chartInstance.data.labels = labels
      chartInstance.data.datasets[0].data = values
      chartInstance.update()
      return
    }

    // Nuevo chart
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Rendimiento Neurológico',
            data: values,
            borderColor: 'rgba(59,130,246,0.95)',
            backgroundColor: 'rgba(59,130,246,0.12)',
            tension: 0.3,
            fill: true,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { suggestedMin: 0, suggestedMax: 100 }
        },
        plugins: {
          legend: { display: false }
        }
      }
    })
  } catch (err) {
    console.error('Error creando/actualizando chart:', err)
    destroyChart()
  }
}

/* --- reactividad: actualizar cuando record cambie --- */
watch(
    () => props.record,
    async (newRecord) => {
      // Si no hay record, destruimos la gráfica y salimos
      if (!newRecord || Object.keys(newRecord).length === 0) {
        destroyChart()
        return
      }

      const { labels, values } = buildLabelsAndValues(newRecord)
      await renderLineChart(labels, values)
    },
    { immediate: true, deep: true }
)

/* --- soporte para keep-alive y limpieza --- */
onActivated(async () => {
  // Si está activado y hay datos pero no hay instancia, recrear
  if (hasData.value && !chartInstance) {
    const { labels, values } = buildLabelsAndValues(props.record)
    await renderLineChart(labels, values)
  }
})

onDeactivated(() => {
  // liberar recursos cuando el componente queda en cache
  destroyChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  min-height: 160px;
}
canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
.no-data {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
  pointer-events: none;
  background: rgba(255,255,255,0.0);
}
</style>
