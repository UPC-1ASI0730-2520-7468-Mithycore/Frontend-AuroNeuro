<script setup>
const props = defineProps({
  prescription: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
    <h2 class="font-semibold text-lg">{{ prescription.title }}</h2>
    <p class="text-sm text-gray-600">Date: {{ prescription.date }}</p>

    <ul class="mt-2 text-gray-800">
      <li
          v-for="(m, i) in prescription.medicineItems"
          :key="i"
      >
        - {{ m.medicineName }} ({{ m.dosage }})
      </li>
    </ul>
  </div>
</template>
