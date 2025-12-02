import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomePatientRoutes from "./dashboard/presentation/patient/home-patient-routes.js";
import PrescriptionPatientRoutes from "./prescription/presentation/patient/prescription-patient-routes.js";

import DataRoutesPatient from "./neurological-evaluations/presentation/patient/evaluations-routes-patient.js";
import MapRoutes from "./location/presentation/neurologist/map-routes-neurologist.js";
import AppointmentRoutesPatient from "./appointments/presentation/patient/appointments-routes-patient.js";
import ProfileRoutesPatient from "./profile/presentation/patient/profile-routes-patient.js";
import MapRoutesPatient from "./location/presentation/patient/map-routes-patient.js";

export const PatientRoutes = [
    {
        path: "/patient",
        component: MainLayout,
        meta: { requiresRole: "Patient"},
        children: [
            ...HomePatientRoutes,
            ...DataRoutesPatient,
            ...MapRoutesPatient,
            ...PrescriptionPatientRoutes,
            ...AppointmentRoutesPatient,
            ...ProfileRoutesPatient
        ]
    }
]
