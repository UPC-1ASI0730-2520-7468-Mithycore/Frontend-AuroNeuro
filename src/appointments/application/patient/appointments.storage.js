import { ref } from "vue";
import {
    fetchPatientAppointments,
    fetchPatientAppointmentById
} from "../../infrastructure/patient/appointments-api.js";

const appointments = ref([]);
const appointment = ref(null);

// 🔥 ID temporal quemado (hasta que tengas login funcionando)
const PATIENT_ID = 1;

export function usePatientAppointments() {
    async function loadAppointments() {
        appointments.value = await fetchPatientAppointments(PATIENT_ID);
    }

    async function loadAppointment(appointmentId) {
        appointment.value = await fetchPatientAppointmentById(appointmentId);
    }

    return {
        appointments,
        appointment,
        loadAppointments,
        loadAppointment
    };
}
