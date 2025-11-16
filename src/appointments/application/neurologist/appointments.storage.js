import { ref } from "vue";
import { fetchNeurologistAppointments, fetchNeurologistAppointmentById } from "../../infrastructure/neurologist/appointments-api.js";

const appointments = ref([]);
const appointment = ref(null);

export function useNeurologistAppointments() {

    async function loadAppointments(neurologistId) {
        appointments.value = await fetchNeurologistAppointments(neurologistId);
    }

    async function loadAppointment(appointmentId) {
        appointment.value = await fetchNeurologistAppointmentById(appointmentId);
    }

    return {
        appointments,
        appointment,
        loadAppointments,
        loadAppointment
    };
}
