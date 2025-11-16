<script setup>
import { ref, watch } from "vue";
import Chart from "chart.js/auto";

// 📌 1. Recibimos el objeto desde el padre
const props = defineProps({
  record: {
    type: Object,
    required: true,
  }
});

const canvasRef = ref(null);
let chartInstance = null;

// 📌 2. Función que crea labels y valores
function getLabelsAndValues(record) {
  if (!record) return { labels: [], values: [] };

  return {
    labels: Object.keys(record),
    values: Object.values(record).map(v => Number(v ?? 0))
  };
}

// 📌 3. Renderizar el gráfico
function renderChart() {
  if (!canvasRef.value || !props.record) return;

  const { labels, values } = getLabelsAndValues(props.record);

  // 🔄 si existe un gráfico anterior, destruirlo
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(canvasRef.value, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "Rendimiento Neurológico",
        data: values
      }]
    },
    options: { responsive: true }
  });
}

// 📌 4. Observar cambios en la prop
watch(() => props.record, renderChart, { immediate: true });
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
