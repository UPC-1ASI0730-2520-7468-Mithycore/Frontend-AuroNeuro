<script setup>
import DoughnutGraphic from "./doughnut-graphic.vue";
import RadarChartsGraphic from "./radar-charts-graphic.vue";
import {computed, onMounted} from "vue";
import {useHomeStorage} from "../../../application/patient/home.storage.js";
import PieChartsGraphic from "./pie-charts-graphic.vue";
import LineChartsGraphic from "./line-charts-graphic.vue";

const store = useHomeStorage();
const record = computed(() => store.neuroAssessment[0]);

onMounted(() => {
  store.getNeuroAssessmentById(1);

})
</script>

<template>
  <div class="chart-box">
    <radar-charts-graphic :record="record"/>
  </div>
  <div class="chart-box">
    <doughnut-graphic :record="record"/>
  </div>
  <div class="chart-box">
    <pie-charts-graphic :record="record"/>
  </div>
  <div class="chart-box">
    <line-charts-graphic :record="record"/>
  </div>

</template>

<style scoped>

.chart-box {
  width: 300px;
  height: 300px;
}
</style>