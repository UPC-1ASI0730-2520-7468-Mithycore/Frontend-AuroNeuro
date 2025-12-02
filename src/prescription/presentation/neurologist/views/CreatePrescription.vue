<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage";

const router = useRouter();
const neurologistId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
const patientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const loading = ref(false);
const error = ref("");
const success = ref("");

const form = ref({
  medicineName: "",
  dosage: "",
  frequency: "",
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await PrescriptionStorage.createPrescription({
      patientId,
      neurologistId,
      medicines: [
        {
          name: form.value.medicineName,
          dosage: form.value.dosage,
          frequency: form.value.frequency,
        },
      ],
    });

    success.value = "Prescription created successfully.";
    setTimeout(() => {
      router.push({ path: "/neurologist/prescriptions" });
    }, 800);
  } catch (e) {
    console.error(e);
    error.value = "Error creating prescription.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-8 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Create Prescription</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-xl shadow">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Medicine name
          </label>
          <input
              v-model="form.medicineName"
              type="text"
              class="w-full border rounded-lg px-3 py-2 text-sm"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <input
              v-model="form.dosage"
              type="text"
              class="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. 1 pill every 8h"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <input
              v-model="form.frequency"
              type="text"
              class="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. 3 times a day"
              required
          />
        </div>
      </div>

      <div class="flex items-center gap-3 mt-4">
        <button
            type="submit"
            class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            :disabled="loading"
        >
          {{ loading ? "Saving..." : "Create prescription" }}
        </button>

        <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm border border-gray-300"
            @click="router.back()"
        >
          Cancel
        </button>
      </div>

      <p v-if="error" class="text-sm text-red-500 mt-2">{{ error }}</p>
      <p v-if="success" class="text-sm text-green-600 mt-2">{{ success }}</p>
    </form>
  </div>
</template>
