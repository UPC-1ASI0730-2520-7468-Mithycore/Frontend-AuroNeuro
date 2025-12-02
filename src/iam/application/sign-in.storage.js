import {IamApi} from "../infrastructure/iam-api.js";
import {defineStore} from "pinia";
import {ref} from "vue"
import { useRouter} from "vue-router";

const iamApi = new IamApi();

export const useIamApi = defineStore('iam', () => {
    //state
    const user = ref(null)
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();
    //Actions

    async function validateSession() {
        try {
            loading.value = true;
            error.value = null;

            const res = await iamApi.validate(); // GET /validate
            user.value = res.data;              // { userId, role }
            console.log(user.value)
            return true;
        } catch (e) {
            console.error("Error en validateSession", e);
            user.value = null;
            error.value = "Sesión no válida";
            return false;
        } finally {
            loading.value = false;
        }
    }

    // 2) Login con username/password/role
    async function signIn(resource) {
        try {
            loading.value = true;
            error.value = null;

            // 1) hace login → backend setea la cookie AuthToken
            await iamApi.postSignIn(resource);

            // 2) ahora pedimos los datos del usuario (userId + role)
            const ok = await validateSession();

            if (!ok) {
                throw new Error("No se pudo validar la sesión después del login");
            }

            // 3) Redirigir según el rol
            const role = user.value.role;// "Patient" o "Neurologist"

            console.log(role);

            if (role === "Patient") {
                await router.push("/patient/home");
            } else if (role === "Neurologist") {
                await router.push("/neurologist/home");
            }

            return true;
        } catch (e) {
            console.error("Error en signIn", e);
            error.value = "Credenciales inválidas o error de servidor";
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function signUp(resource) {
        try {
            loading.value = true;
            error.value = null;

            // 1) hace login → backend setea la cookie AuthToken
            await iamApi.postSignUp(resource);

            // 2) ahora pedimos los datos del usuario (userId + role)
            const ok = await validateSession();

            if (!ok) {
                throw new Error("No se pudo validar la sesión después del login");
            }

            // 3) Redirigir según el rol
            const role = user.value.role;// "Patient" o "Neurologist"

            console.log(role);

            if (role === "Patient") {
                await router.push("/patient/home");
            } else if (role === "Neurologist") {
                await router.push("/neurologist/home");
            }

            return true;
        } catch (e) {
            console.error("Error en signIn", e);
            error.value = "Credenciales inválidas o error de servidor";
            return false;
        } finally {
            loading.value = false;
        }
    }


    return {
        user,
        signIn,
        validateSession,
        signUp
    }
})