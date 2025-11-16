<script setup>
import { ref, onUnmounted, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  record: {
    type: Object,
    required: true
  }
});

const canvasRef = ref(null);
let chartInstance = null;

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
];

function buildLabelsAndValues(record) {
  if (!record) return { labels: [], values: [] };

  const labels = [
    "Gait","Balance","Reflex","Cognition","Memory",
    "Speech","Tremor","Strength","Coordination","Sensory"
  ];

  const values = [
    record.gaitScore,
    record.balanceScore,
    record.reflexScore,
    record.cognitionScore,
    record.memoryScore,
    record.speechScore,
    record.tremorScore,
    record.strengthScore,
    record.coordinationScore,
    record.sensoryScore
  ].map(v => Number(v ?? 0));

  return { labels, values };
}

function renderChart(labels, values) {
  chartInstance?.destroy();

  chartInstance = new Chart(canvasRef.value, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Rendimiento Neurológico",
        data: values,
        backgroundColor: COLORS.slice(0, values.length)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 100 } }
    }
  });
}

watch(
    () => props.record,
    (record) => {
      if (!record) return;
      const { labels, values } = buildLabelsAndValues(record);
      renderChart(labels, values);
    },
    { immediate: true }
);

onUnmounted(() => {
  chartInstance?.destroy();
});
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

