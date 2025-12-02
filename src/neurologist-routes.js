import HomeNeurologistRoutes from "./home/presentation/neurologist/home-neurologist-routes.js";
import MainLayout from "./shared/presentation/components/main-layout.vue";
import PrescriptionNeurologistRoutes from "./prescription/presentation/neurologist/prescription-neurologist-routes.js";

export const NeurologistRoutes = [
    {
        path: "/neurologist",
        component: MainLayout,
        children: [
            ...HomeNeurologistRoutes,
            ...PrescriptionNeurologistRoutes,
        ],
        meta: { requiresRole: "neurologist" },
    },
];
