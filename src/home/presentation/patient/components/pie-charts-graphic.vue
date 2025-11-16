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

      chart?.destroy();

      chart = new Chart(canvasRef.value, {
        type: "pie",
        data: {
          labels: Object.keys(record),
          datasets: [
            {
              data: Object.values(record),
              backgroundColor: [
                "rgba(255,99,132,0.5)",
                "rgba(255,159,64,0.5)",
                "rgba(255,205,86,0.5)",
                "rgba(75,192,192,0.5)",
                "rgba(54,162,235,0.5)",
                "rgba(153,102,255,0.5)",
                "rgba(201,203,207,0.5)"
              ]
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
