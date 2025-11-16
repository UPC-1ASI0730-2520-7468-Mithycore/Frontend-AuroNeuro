<script setup>
import { ref, watch, onUnmounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  record: Object
});

const canvasRef = ref(null);
let chart;

watch(
    () => props.record,
    (record) => {
      if (!record) return;

      const labels = Object.keys(record);
      const values = Object.values(record);

      chart?.destroy();
      chart = new Chart(canvasRef.value, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Rendimiento Neurológico",
              data: values,
              fill: false
            }
          ]
        }
      });
    },
    { immediate: true }
);

onUnmounted(() => chart?.destroy());
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
