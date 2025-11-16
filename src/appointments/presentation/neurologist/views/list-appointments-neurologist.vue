<template>
  <div class="p-4">
    <h2>Citas del Neurólogo</h2>

    <DataTable :value="appointments" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="date" header="Fecha"></Column>
      <Column field="status" header="Estado"></Column>
      <Column header="Ver">
        <template #body="row">
          <router-link :to="`/neurologist/appointments/${row.data.id}`">
            Ver detalles
          </router-link>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useNeurologistAppointments } from "../../../application/neurologist/appointments.storage.js";

const { appointments, loadAppointments } = useNeurologistAppointments();

onMounted(() => {
  loadAppointments(1); // Cambiar cuando tengas auth real
});
</script>
