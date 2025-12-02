// src/application/auth/loginWithGoogle.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.js";

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user) return null;

    const nombreCompleto = user.displayName || "";
    const email = user.email || "";
    const foto = user.photoURL || "";

    // separar nombre y apellido de forma simple
    const partes = nombreCompleto.split(" ");
    const nombre = partes[0] || "";
    const apellido = partes.slice(1).join(" ") || "";

    return {
        nombre,
        apellido,
        nombreCompleto,
        email,
        foto,
    };
}
