import ListAppointmentsPatient from "./views/list-appointments-patient.vue";
import AppointmentDetailsPatient from "./views/appointment-details-patient.vue";

export default [
    {
        path: 'appointments',
        component: ListAppointmentsPatient,
        name: 'patient-appointments'
    },
    {
        path: 'appointments/:appointmentId',
        component: AppointmentDetailsPatient,
        name: 'patient-appointment-details',
        props: true
    }
];
