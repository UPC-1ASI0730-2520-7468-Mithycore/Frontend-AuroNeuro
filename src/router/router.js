import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/main-layout/presentation/main-layout.vue";
import LoginLayout from "../layout/login-layout/presentation/login-layout.vue";
import RegisterUsers from "../register-users/presentation/register-users.vue";
import OtpAuth from "../shared/phone-auth/presentation/otp-auth.vue";


const routes = [
    {
        path: '/home',
        component: MainLayout,
        children: [
            {
                path: '',
                component: LoginLayout
            }
        ]
    },
    {
        path: '/login',
        component: LoginLayout
    },
    {
        path: '/register',
        component: RegisterUsers
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;