<template>
  <div class="chart-wrapper" :style="{ height: height + 'px' }">
    <canvas ref="canvasRef" aria-label="Rendimiento neurológico"></canvas>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="!hasData" class="no-data">No hay datos para mostrar</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onActivated, onDeactivated, watch, nextTick, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  // Ahora opcional y con default null para evitar warnings cuando el padre pasa null
  record: { type: Object, required: false, default: null },
  height: { type: Number, default: 260 }
})

const canvasRef = ref(null)
let chartInstance = null

const COLORS = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(255, 159, 64, 0.6)",
  "rgba(255, 205, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(201, 203, 207, 0.6)",
  "rgba(255, 99, 132, 0.4)",
  "rgba(75, 192, 192, 0.4)",
  "rgba(54, 162, 235, 0.4)"
]

/* --- helpers --- */
const hasData = computed(() => {
  const r = props.record
  if (!r) return false
  // Ajusta la comprobación a las propiedades que tu record realmente usa:
  return (
      typeof r.gaitScore !== 'undefined' ||
      typeof r.balanceScore !== 'undefined' ||
      typeof r.reflexScore !== 'undefined'
  )
})

function buildLabelsAndValues(record) {
  if (!record) {
    return {
      labels: [
        "Gait","Balance","Reflex","Cognition","Memory",
        "Speech","Tremor","Strength","Coordination","Sensory"
      ],
      values: [0,0,0,0,0,0,0,0,0,0]
    }
  }

  const labels = [
    "Gait","Balance","Reflex","Cognition","Memory",
    "Speech","Tremor","Strength","Coordination","Sensory"
  ]

  const values = [
    Number(record.gaitScore ?? 0),
    Number(record.balanceScore ?? 0),
    Number(record.reflexScore ?? 0),
    Number(record.cognitionScore ?? 0),
    Number(record.memoryScore ?? 0),
    Number(record.speechScore ?? 0),
    Number(record.tremorScore ?? 0),
    Number(record.strengthScore ?? 0),
    Number(record.coordinationScore ?? 0),
    Number(record.sensoryScore ?? 0)
  ]

  return { labels, values }
}

function destroyChart() {
  try {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
      // console.log('[chart] destruido')
    }
  } catch (err) {
    console.error('[chart] error al destruir:', err)
  }
}

function renderChart(labels, values) {
  try {
    // validar canvas
    const cvs = canvasRef.value
    if (!cvs || !(cvs instanceof HTMLCanvasElement)) {
      console.warn('[chart] canvas no listo aún')
      return
    }

    const ctx = cvs.getContext && cvs.getContext('2d')
    if (!ctx) {
      console.error('[chart] no se pudo obtener contexto 2D')
      return
    }

    // limpiar instancia previa
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Rendimiento Neurológico',
          data: values,
          backgroundColor: COLORS.slice(0, values.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    })
  } catch (err) {
    console.error('[chart] fallo al crear/actualizar:', err)
  }
}

/* --- lifecycle & reactividad --- */
onMounted(async () => {
  await nextTick()
  if (hasData.value) {
    const { labels, values } = buildLabelsAndValues(props.record)
    renderChart(labels, values)
  }
})

// Vigila cambios en todo el record (deep) y en particular re-renderiza cuando lleguen datos.
// El guard devuelve si newVal es null; además esperamos nextTick para que el canvas exista.
watch(
    () => props.record,
    async (newVal) => {
      await nextTick()
      if (!newVal) {
        // si ya no hay datos, destruimos la gráfica
        destroyChart()
        return
      }
      const { labels, values } = buildLabelsAndValues(newVal)
      renderChart(labels, values)
    },
    { immediate: true, deep: true }
)

// Si usas <keep-alive>
onActivated(async () => {
  if (hasData.value && !chartInstance) {
    await nextTick()
    const { labels, values } = buildLabelsAndValues(props.record)
    renderChart(labels, values)
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
  min-height: 160px;
}
canvas { width: 100% !important; height: 100% !important; display: block; }
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
