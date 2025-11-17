<script setup>
import { ref, onMounted } from "vue";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage";

const prescriptions = ref([]);
const neurologistId = 1; // temporal

onMounted(async () => {
  try {
    prescriptions.value = await PrescriptionStorage.getNeurologistPrescriptions(neurologistId);
  } catch (e) {
    console.error("Error loading neurologist prescriptions", e);
  }
});
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Prescriptions Created</h1>

    <p v-if="prescriptions.length === 0" class="text-gray-500">
      No prescriptions created yet.
    </p>

    <div
        v-for="p in prescriptions"
        :key="p.id"
        class="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition mb-4"
    >
      <h2 class="font-semibold text-lg">{{ p.title }}</h2>
      <p class="text-sm text-gray-600">Date: {{ p.date }}</p>

      <ul class="mt-2 text-gray-800">
        <li
            v-for="(m, i) in p.medicineItems"
            :key="i"
        >
          - {{ m.medicineName }} ({{ m.dosage }})
        </li>
      </ul>
    </div>
  </div>
</template>

