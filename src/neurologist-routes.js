import HomeNeurologistRoutes from "./dashboard/presentation/neurologist/home-neurologist-routes.js";
import MainLayout from "./shared/presentation/components/main-layout.vue";
import PrescriptionNeurologistRoutes from "./prescription/presentation/neurologist/prescription-neurologist-routes.js";
import ProfileNeurologistRoutes from "./profile/presentation/neurologist/profile-neurologist.js";
import AppointmentRoutes from "./appointments/presentation/neurologist/appointment-routes.js";
import EvaluationsRoutesNeurologist
    from "./neurological-evaluations/presentation/neurologist/evaluations-routes-neurologist.js";

export const NeurologistRoutes = [
    {
        path: "/neurologist",
        component: MainLayout,
        children: [
            ...HomeNeurologistRoutes,
            ...PrescriptionNeurologistRoutes,
            ...ProfileNeurologistRoutes,
            ...AppointmentRoutes,
            ...EvaluationsRoutesNeurologist
        ],
        meta: { requiresRole: "Neurologist" },
    },
];
