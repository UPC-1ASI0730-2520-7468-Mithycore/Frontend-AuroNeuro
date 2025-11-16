<template>
  <div class="p-4">
    <h2>Detalles de la Cita</h2>

    <div v-if="appointment">
      <p><b>ID:</b> {{ appointment.id }}</p>
      <p><b>Fecha:</b> {{ appointment.date }}</p>
      <p><b>Estado:</b> {{ appointment.status }}</p>
      <p><b>Notas:</b> {{ appointment.notes }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNeurologistAppointments } from "../../../application/neurologist/appointments.storage.js";

const route = useRoute();
const { appointment, loadAppointment } = useNeurologistAppointments();

onMounted(() => {
  loadAppointment(route.params.appointmentId);
});
</script>
