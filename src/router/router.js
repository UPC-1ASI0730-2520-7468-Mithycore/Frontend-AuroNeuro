import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "../layout/main-layout/presentation/main-layout.vue";
import LoginLayout from "../layout/login-layout/presentation/login-layout.vue";
import RegisterUsers from "../register-users/presentation/register-users.vue";
import WelcomeUser from "../shared/welcome-user/presentation/welcome-user.vue";
import Map from "../shared/map/presentation/map.vue";
import PhoneAuth from "../shared/phone-auth/presentation/phone-auth.vue"
import UserAuth from "../shared/phone-auth/presentation/user-auth.vue"
import OtpAuth from "../shared/phone-auth/presentation/otp-auth.vue"

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/home',
                component: WelcomeUser
            },
            {
                path: 'map',
                component: Map
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
    },
    {
        path: "/phone-auth",
        component: PhoneAuth
    },
    {
        path: "/otp-auth",
        component: OtpAuth
    },
    {
        path: "/user-auth",
        component: UserAuth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;