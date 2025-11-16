import { ref } from "vue";
import {
    fetchPatientAppointments,
    fetchPatientAppointmentById
} from "../../infrastructure/patient/appointments-api.js";

const appointments = ref([]);
const appointment = ref(null);


const PATIENT_ID = 1;

export function usePatientAppointments() {
    //state
    const appointment = ref([])


    //Actions
    function getAppointmentById(id) {
        homeApi.getAppointmentById(id).then(response => {
            const result = response.data;
            console.log(result);
            appointment.value = result;
        })
    }

    return {
        appointment,
        getAppointmentById
    }
}
