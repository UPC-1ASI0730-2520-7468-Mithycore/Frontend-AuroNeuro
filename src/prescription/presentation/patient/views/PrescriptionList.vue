<script setup>
import { ref, onMounted } from "vue";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage.js";
import PrescriptionCard from "../components/PrescriptionCard.vue";


const patientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const prescriptions = ref([]);

onMounted(async () => {
  try {
    prescriptions.value = await PrescriptionStorage.getPatientPrescriptions(patientId);
  } catch (e) {
    console.error("Error loading patient prescriptions", e);
  }
});
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">My Prescriptions</h1>

    <p v-if="prescriptions.length === 0" class="text-gray-500">
      No prescriptions available.
    </p>

    <PrescriptionCard
        v-for="p in prescriptions"
        :key="p.id"
        :prescription="p"
        class="mb-6"
    />
  </div>
</template>
