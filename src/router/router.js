import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/main-layout/presentation/main-layout.vue";
import LoginLayout from "../layout/login-layout/presentation/login-layout.vue";


const routes = [
    {
        path: '/',
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;