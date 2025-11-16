<template>
  <div class="p-5">

    <h2 class="text-xl font-bold mb-4">
      <i class="pi pi-calendar mr-2"></i>
      Mis Citas
    </h2>

    <!-- Loading -->
    <div v-if="loading">
      <Skeleton width="100%" height="3rem" class="mb-3" />
      <Skeleton width="100%" height="3rem" class="mb-3" />
      <Skeleton width="100%" height="3rem" />
    </div>

    <!-- Empty -->
    <div v-else-if="appointments.length === 0" class="text-gray-500">
      No tienes citas registradas.
    </div>

    <!-- Appointments -->
    <div v-else class="grid gap-3">
      <Card v-for="a in appointments" :key="a.id" class="shadow-sm border-round cursor-pointer"
            @click="goToDetails(a.id)">
        <template #title>
          {{ a.date }}
        </template>

        <template #content>
          <p><strong>Estado:</strong> {{ a.status }}</p>
        </template>
      </Card>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePatientAppointments } from "../../../application/patient/appointments.storage.js";

const router = useRouter();
const { appointments, loadAppointments, loading } = usePatientAppointments();

onMounted(() => {
  loadAppointments();
});

function goToDetails(id) {
  router.push(`/patient/appointments/${id}`);
}
</script>
