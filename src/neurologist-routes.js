import HomeNeurologistRoutes from "./home/presentation/neurologist/home-neurologist-routes.js";
import MainLayout from "./shared/presentation/components/main-layout.vue";

export const NeurologistRoutes = [
    {path: '/neurologist', component: MainLayout, children: HomeNeurologistRoutes, meta: {requiresRole: 'neurologist'}},
]