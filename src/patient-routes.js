import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomePatientRoutes from "./dashboard/presentation/patient/home-patient-routes.js";
import PrescriptionPatientRoutes from "./prescription/presentation/patient/prescription-patient-routes.js";

import DataRoutesPatient from "./neurological-evaluations/presentation/patient/evaluations-routes-patient.js";
import MapRoutes from "./location/presentation/map-routes.js";

export const PatientRoutes = [
    {
        path: "/patient",
        component: MainLayout,
        meta: { requiresRole: "Patient"},
        children: [
            ...HomePatientRoutes,
            ...DataRoutesPatient,
            ...MapRoutes,
            ...PrescriptionPatientRoutes
        ]
    }
]
