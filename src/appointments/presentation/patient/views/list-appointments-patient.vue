<template>
  <div class="p-5">

    <h2 class="text-xl font-bold mb-4">
      <i class="pi pi-calendar mr-2"></i>
      Mis Citas
    </h2>

    <!-- Loading -->
    <div v-if="store.loading">
      <Skeleton width="100%" height="3rem" class="mb-3" />
      <Skeleton width="100%" height="3rem" class="mb-3" />
      <Skeleton width="100%" height="3rem" />
    </div>

    <!-- Empty -->
    <div v-else-if="store.appointments.length === 0" class="text-gray-500">
      No tienes citas registradas.
    </div>

    <!-- Appointments -->
    <div v-else>
      <h1 class="font-bold text-lg mb-4">
        Detalle de la cita
      </h1>

      <div v-for="a in store.appointments" :key="a.id" class="mb-4 p-3 border rounded">
        <p><strong>Notas:</strong> {{ store.notes }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePatientAppointments } from "../../../application/patient/appointments.storage.js";

const router = useRouter();
const store = usePatientAppointments();

onMounted(() => {
  store.getAppointmentById(1);
});

function goToDetails(id) {
  router.push(`/patient/appointments/${id}`);
}
</script>
