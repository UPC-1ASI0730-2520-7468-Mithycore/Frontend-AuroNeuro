import ListAppointmentsNeurologist from "./views/list-appointments-neurologist.vue";
import AppointmentDetailsNeurologist from "./views/appointment-details-neurologist.vue";

export default [
    {
        path: 'appointments',
        component: ListAppointmentsNeurologist,
        name: 'neurologist-appointments'
    },
    {
        path: 'appointments/:appointmentId',
        component: AppointmentDetailsNeurologist,
        name: 'neurologist-appointment-details',
        props: true
    }
];
