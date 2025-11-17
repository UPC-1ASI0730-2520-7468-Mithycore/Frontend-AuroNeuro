import MainLayout from "./shared/presentation/components/main-layout.vue";
import HomePatientRoutes from "./home/presentation/patient/home-patient-routes.js";
import DataRoutesPatient from "./data/presentation/patient/data-routes-patient.js";
import MapRoutes from "./location/presentation/map-routes.js";

export const PatientRoutes = [
    {path: '/patient', component: MainLayout, children: HomePatientRoutes, meta: {requiresRole: 'patient'}},
    {path: '/patient', component: MainLayout, children: DataRoutesPatient, meta: {requiresRole: 'patient'}},
    {path: '/patient', component: MainLayout, children: MapRoutes, meta: {requiresRole: 'patient'}}
]