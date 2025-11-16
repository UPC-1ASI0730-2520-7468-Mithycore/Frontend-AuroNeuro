import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomePatientRoutes from "./home/presentation/patient/home-patient-routes.js";

export const PatientRoutes = [
    {path: '/patient', component: MainLayout, children: HomePatientRoutes, meta: {requiresRole: 'patient'}},
]