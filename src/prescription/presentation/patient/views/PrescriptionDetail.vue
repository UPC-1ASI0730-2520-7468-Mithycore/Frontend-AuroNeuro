<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage.js";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const errorMessage = ref("");
const prescription = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const id = route.params.id;
    prescription.value = await PrescriptionStorage.getById(id);
  } catch (e) {
    console.error(e);
    errorMessage.value = "Error loading prescription.";
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <button class="mb-4 text-sm text-gray-500" @click="goBack">
      ← Back
    </button>

    <p v-if="loading">Loading...</p>
    <p v-else-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </p>

    <div v-else-if="prescription" class="bg-white rounded-xl shadow p-6">
      <h1 class="text-2xl font-bold mb-2">
        {{ prescription.title }}
      </h1>
      <p class="text-gray-500 text-sm mb-4">
        Issued on: {{ prescription.date }}
      </p>

      <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          :class="prescription.revoked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
      >
        {{ prescription.revoked ? "Revoked" : "Active" }}
      </span>

      <h2 class="mt-6 mb-2 font-semibold">Medicines</h2>
      <ul class="list-disc pl-5 text-sm text-gray-800">
        <li v-for="(m, i) in prescription.medicineItems" :key="i">
          {{ m.medicineName }} — {{ m.dosage }}
        </li>
      </ul>
    </div>
  </div>
</template>
