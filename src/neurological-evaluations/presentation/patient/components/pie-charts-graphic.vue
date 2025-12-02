<template>
  <div class="chart-wrapper" :style="{ height: height + 'px' }">
    <canvas ref="canvasRef" aria-label="Rendimiento neurológico — pie"></canvas>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="!hasData" class="no-data">No hay datos para mostrar</div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import Chart from 'chart.js/auto'

/* --- props --- */
const props = defineProps({
  record: { type: Object, required: false, default: null },
  height: { type: Number, default: 260 }
})

/* --- refs / estado --- */
const canvasRef = ref(null)
let chartInstance = null

/* --- colores --- */
const COLORS = [
  "rgba(255,99,132,0.75)",
  "rgba(255,159,64,0.75)",
  "rgba(255,205,86,0.75)",
  "rgba(75,192,192,0.75)",
  "rgba(54,162,235,0.75)",
  "rgba(153,102,255,0.75)",
  "rgba(201,203,207,0.75)"
]

/* --- utilidades --- */
const hasData = computed(() => {
  return !!props.record && Object.keys(props.record).length > 0
})

function buildLabelsAndValues(record) {
  if (!record) return { labels: [], values: [] }

  const labels = Object.keys(record)
  const rawValues = Object.values(record)

  // Convertir a números y evitar NaN
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
    console.error('[pie] error al destruir chart:', err)
  }
}

async function renderPieChart(labels, values) {
  await nextTick()

  const cvs = canvasRef.value
  if (!cvs || !(cvs instanceof HTMLCanvasElement)) {
    // canvas aún no listo
    // console.warn('[pie] canvas no disponible')
    return
  }

  const ctx = cvs.getContext && cvs.getContext('2d')
  if (!ctx) {
    console.error('[pie] no se pudo obtener contexto 2D')
    return
  }

  try {
    // Destruir instancia previa si existe
    destroyChart()

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: COLORS.slice(0, values.length),
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'nearest' }
        }
      }
    })
  } catch (err) {
    console.error('[pie] fallo al crear/actualizar chart:', err)
    destroyChart()
  }
}

/* --- reactividad --- */
watch(
    () => props.record,
    async (newVal) => {
      await nextTick()

      // si no hay datos, destruimos la gráfica y salimos
      if (!newVal || Object.keys(newVal).length === 0) {
        destroyChart()
        return
      }

      const { labels, values } = buildLabelsAndValues(newVal)
      await renderPieChart(labels, values)
    },
    { immediate: true, deep: true }
)

/* --- keep-alive / lifecycle --- */
onActivated(async () => {
  if (hasData.value && !chartInstance) {
    const { labels, values } = buildLabelsAndValues(props.record)
    await renderPieChart(labels, values)
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
}
</style>
