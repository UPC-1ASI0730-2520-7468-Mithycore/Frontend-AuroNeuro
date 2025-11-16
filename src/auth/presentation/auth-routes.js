import LoginUsers from "./views/login-users.vue";
import RegisterUsers from "./views/register-users.vue";
import PhoneAuth from "./views/phone-auth.vue";
import OtpAuth from "./views/otp-auth.vue";
import UserAuth from "./views/user-auth.vue";

const authRoutes = [
    { path: 'login', component: LoginUsers},
    { path: 'register', component: RegisterUsers},
    { path: "phone-auth", component: PhoneAuth},
    { path: "otp-auth", component: OtpAuth},
    { path: "user-auth", component: UserAuth}
]

export default authRoutes;
