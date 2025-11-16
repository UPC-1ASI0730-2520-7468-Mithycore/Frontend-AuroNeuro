import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomePatientRoutes from "./home/presentation/patient/home-patient-routes.js";
import PrescriptionPatientRoutes from "./prescription/presentation/patient/prescription-patient-routes.js";

export const PatientRoutes = [
    {
        path: "/patient",
        component: MainLayout,
        children: [
            ...HomePatientRoutes,
            ...PrescriptionPatientRoutes,
        ],
        meta: { requiresRole: "patient" },
    },
];
