import {createRouter, createWebHistory} from "vue-router";
import authRoutes from "./auth/presentation/auth-routes.js";
import {PatientRoutes} from "./patient-routes.js";
import {NeurologistRoutes} from "./neurologist-routes.js";

const routes = [
    ...NeurologistRoutes,
    ...PatientRoutes,
    { path: '/auth',  children: authRoutes},

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresRole){
        if('patient' === to.meta.requiresRole){
            return next();
        }

        return next('/auth/login');
    }
    next();
})

export default router;