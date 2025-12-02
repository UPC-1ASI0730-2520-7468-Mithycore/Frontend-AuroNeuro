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
        loading.value = true;
        error.value = null;

        try {
            // 1. Validar sesión
            const { data: session } = await iamApi.validate(); // GET /validate
            // session -> { userId, role }

            if (!session || !session.userId) {
                throw new Error("Sesión inválida: no se encontró userId");
            }

            let profile = null;

            // 2. Si es neurólogo
            if (session.role === 'Neurologist') {
                const { data } = await iamApi.getNeurologistById(session.userId);
                profile = data;
                console.log("Usuario neurologist cargado:", profile);
            }

            // 3. Si es paciente
            else if (session.role === 'Patient') {
                const { data } = await iamApi.getPatientById(session.userId);
                profile = data;
                console.log("Usuario patient cargado:", profile);
            }

            // 4. Rol no soportado
            else {
                throw new Error("Rol desconocido: " + session.role);
            }

            // Guardar perfil + rol en el store
            user.value = {
                ...profile,
                role: session.role
            };

            return {
                ok: true,
                user: user.value,
                role: session.role
            };

        } catch (e) {
            console.error("Error en validateSession", e);

            user.value = null;

            const status = e?.response?.status;
            if (status === 401) {
                error.value = "Sesión expirada. Inicia sesión nuevamente.";
            } else {
                error.value = "No fue posible validar la sesión.";
            }

            return {
                ok: false,
                error: error.value
            };
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
            const request = await validateSession();

            if (!request.ok) {
                throw new Error("No se pudo validar la sesión después del login");
            }

            // 3) Redirigir según el rol
            const role = request.role;// "Patient" o "neurologist"

            console.log(role);

            if (role === "Patient") {
                await router.push("/patient/dashboard");
            } else if (role === "Neurologist") {
                await router.push("/neurologist/dashboard");
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
            const role = user.value.role;// "Patient" o "neurologist"

            console.log(role);

            if (role === "Patient") {
                await router.push("/patient/dashboard");
            } else if (role === "Neurologist") {
                await router.push("/neurologist/dashboard");
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
        signUp,
        loading
    }
})