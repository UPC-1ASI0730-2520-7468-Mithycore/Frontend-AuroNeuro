import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "../layout/main-layout/presentation/main-layout.vue";
import LoginLayout from "../layout/login-layout/presentation/login-layout.vue";
import RegisterUsers from "../register-users/presentation/register-users.vue";
import WelcomeUser from "../shared/welcome-user/presentation/welcome-user.vue";

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: WelcomeUser
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
    history: createWebHashHistory(),
    routes
})

export default router;