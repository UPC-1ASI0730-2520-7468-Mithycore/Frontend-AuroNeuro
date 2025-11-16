<template>
  <div class="p-5">

    <Button
        icon="pi pi-arrow-left"
        label="Volver"
        class="mb-4 p-button-sm p-button-text"
        @click="$router.back()"
    />

    <Card class="shadow-sm border-round">
      <template #title>
        <i class="pi pi-calendar mr-2"></i>
        Detalles de la Cita
      </template>

      <template #content>
        <div v-if="appointment">
          <p><strong>ID:</strong> {{ appointment.id }}</p>
          <p><strong>Fecha:</strong> {{ appointment.date }}</p>
          <p><strong>Estado:</strong> {{ appointment.status }}</p>
          <p><strong>Notas:</strong> {{ appointment.notes }}</p>
        </div>

        <div v-else class="text-center">
          <Skeleton width="100%" height="2rem" class="mb-3" />
          <Skeleton width="100%" height="2rem" class="mb-3" />
          <Skeleton width="100%" height="2rem" />
        </div>
      </template>
    </Card>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { usePatientAppointments } from "../../../application/patient/appointments.storage.js";

const route = useRoute();
const { appointment, loadAppointment } = usePatientAppointments();

onMounted(() => {
  loadAppointment(route.params.appointmentId);
});
</script>
