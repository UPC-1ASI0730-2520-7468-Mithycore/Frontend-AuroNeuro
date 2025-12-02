<template>
  <div class="chart-wrapper" :style="{ height: height + 'px' }">
    <canvas ref="canvasRef" aria-label="Rendimiento neurológico — radar"></canvas>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="!hasData" class="no-data">No hay datos para mostrar</div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import Chart from 'chart.js/auto'

/* --- props --- */
const props = defineProps({
  // Ahora opcional: evita warnings si el padre pasa null inicialmente
  record: { type: Object, required: false, default: null },
  height: { type: Number, default: 300 }
})

/* --- refs / estado --- */
const canvasRef = ref(null)
let chartInstance = null

/* --- helpers --- */
const hasData = computed(() => {
  // Consideramos que hay datos si record es objeto y tiene al menos una clave
  return !!props.record && Object.keys(props.record).length > 0
})

function getLabelsAndValues(record) {
  if (!record) return { labels: [], values: [] }

  // Si esperas un objeto de pares clave:valor, usamos sus keys/values
  const labels = Object.keys(record)
  const rawValues = Object.values(record)

  // Convertir a números (fallback 0) y normalizar
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
    console.error('[radar] error al destruir chart:', err)
  }
}

/* --- create / update chart --- */
async function renderRadarChart(labels, values) {
  // esperar a que el DOM esté listo (útil si el componente se monta dinámicamente)
  await nextTick()

  const cvs = canvasRef.value
  if (!cvs || !(cvs instanceof HTMLCanvasElement)) {
    // canvas no listo
    // console.warn('[radar] canvas no disponible')
    return
  }

  const ctx = cvs.getContext && cvs.getContext('2d')
  if (!ctx) {
    console.error('[radar] no se pudo obtener contexto 2D')
    return
  }

  try {
    // destruir instancia previa si existe
    destroyChart()

    chartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Rendimiento Neurológico',
          data: values,
          backgroundColor: 'rgba(59,130,246,0.15)',
          borderColor: 'rgba(59,130,246,0.95)',
          pointBackgroundColor: 'rgba(59,130,246,0.9)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          // escala radial (r) para radar charts
          r: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 10
            },
            grid: { color: 'rgba(0,0,0,0.06)' },
            angleLines: { color: 'rgba(0,0,0,0.06)' },
            pointLabels: { font: { size: 12 } }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    })
  } catch (err) {
    console.error('[radar] fallo al crear/actualizar chart:', err)
    destroyChart()
  }
}

/* --- reactividad: actualizar cuando record cambie --- */
watch(
    () => props.record,
    async (newVal) => {
      // Si no hay datos, destruimos la gráfica y salimos
      if (!newVal || Object.keys(newVal).length === 0) {
        destroyChart()
        return
      }

      const { labels, values } = getLabelsAndValues(newVal)
      await renderRadarChart(labels, values)
    },
    { immediate: true, deep: true }
)

/* --- soporte para keep-alive y limpieza --- */
onActivated(async () => {
  if (hasData.value && !chartInstance) {
    const { labels, values } = getLabelsAndValues(props.record)
    await renderRadarChart(labels, values)
  }
})

onDeactivated(() => {
  // liberar recursos si el componente queda en cache
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
  min-height: 200px;
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
}
</style>
