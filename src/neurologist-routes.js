import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomeNeurologistRoutes from "./home/presentation/neurologist/home-neurologist-routes.js";
import AppointmentsNeurologistRoutes from "./appointments/presentation/neurologist/appointments-neurologist-routes.js";

export const NeurologistRoutes = [
    {
        path: '/neurologist',
        component: MainLayout,
        children: [
            ...HomeNeurologistRoutes,
            ...AppointmentsNeurologistRoutes
        ],
        meta: { requiresRole: 'neurologist' }
    },
];
