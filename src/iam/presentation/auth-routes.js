import LoginUsers from "./views/login-users.vue";
import RegisterUsers from "./views/register-users.vue";
import PhoneAuth from "./views/phone-auth.vue";
import OtpAuth from "./views/otp-auth.vue";
import UserAuth from "./views/user-auth.vue";
import RegisterPatient from "./views/register-patient.vue";
import RegisterNeurologist from "./views/register-neurologist.vue";

const authRoutes = [
    { path: 'login', component: LoginUsers},
    { path: 'register', component: RegisterUsers},
    { path: "phone-iam", component: PhoneAuth},
    { path: "otp-iam", component: OtpAuth},
    { path: "user-iam", component: UserAuth},
    { path: "register-patient", component: RegisterPatient},
    { path: "register-neurologist", component: RegisterNeurologist}
]

export default authRoutes;
