import {createRouter, createWebHistory} from "vue-router";
import authRoutes from "./iam/presentation/auth-routes.js";
import {PatientRoutes} from "./patient-routes.js";
import {NeurologistRoutes} from "./neurologist-routes.js";
import {useIamApi} from "./iam/application/sign-in.storage.js";

const routes = [
    ...NeurologistRoutes,
    ...PatientRoutes,
    { path: '/', redirect: '/iam/login'},
    { path: '/iam',  children: authRoutes},

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

//router.beforeEach(async (to, from, next) => {
//    const iamStore = useIamApi();
//    if(!to.meta.requiresRole){
//        return next();
//    }

//    const ok = await iamStore.validateSession();
//    if(!ok){
//        return next("/iam/login");
//    }

//   const userRole = iamStore.user.role;
//   const requiredRole = to.meta.requiresRole;

//    if(userRole === requiredRole){
//       return next();
//    }

//    return next("iam/login")


//})

export default router;