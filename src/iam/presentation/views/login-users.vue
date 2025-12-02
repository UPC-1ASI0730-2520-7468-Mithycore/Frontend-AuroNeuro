<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import {useIamApi} from "../../application/sign-in.storage.js";

// estado del formulario
const form = reactive({
  username: "",
  password: "",
  role: ""
});

const store = useIamApi();

// detectar mobile solo para la imagen
const isMobile = ref(window.innerWidth < 900);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 900;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

// aquí llamas a tu API de login
const handleSubmit = () => {
  console.log("Datos a enviar:", {
    username: form.username,
    password: form.password,
    role: form.role
  });

  store.signIn(form);
  console.log(store.user);


  // ejemplo:
  // await api.post("/auth/login", form)
};
</script>

<template>
  <div class="layout-container">
    <img
        v-if="isMobile"
        src="https://firebasestorage.googleapis.com/v0/b/inventario-react-b0e39.appspot.com/o/AuraNeuro.png?alt=media&token=512da5b9-be57-4bdd-988a-d7a92a8ba73f"
    />

    <div class="layout-contain">
      <h2>Login</h2>
      <p>Come in and drive your health</p>

      <form class="buttons-options" @submit.prevent="handleSubmit">
        <label>
          User Name
          <input
              v-model="form.username"
              type="text"
              required
              autocomplete="username"
          />
        </label>

        <label>
          Password
          <input
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
          />
        </label>

        <label>
          Role
          <select v-model="form.role" required>
            <option disabled value="">Select a role</option>
            <option value="neurologist">Neurologist</option>
            <option value="patient">Patient</option>
          </select>
        </label>

        <button type="submit">Ingresar</button>

        <router-link to="/iam/register" class="link-register">
          Register
        </router-link>
      </form>

      <p class="policies">
        By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.
      </p>
    </div>

    <img
        v-if="!isMobile"
        src="https://firebasestorage.googleapis.com/v0/b/inventario-react-b0e39.appspot.com/o/image%209.png?alt=media&token=48f62288-de65-4def-bf8f-5f62cbbef276"
    />
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

.layout-contain {
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  background-color: white;
  max-width: 95%;
  min-height: 35rem;
  padding: 1rem;
  box-sizing: border-box;
}

.layout-contain h2 {
  text-align: center;
}

.buttons-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Inputs y select más bonitos */
.buttons-options input,
.buttons-options select {
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #7145d8;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  opacity: 0.9;
}

.policies {
  margin-top: auto;
}

.link-register {
  text-align: center;
  margin-top: 1rem;
  color: black;
  text-decoration: none;
}

.link-register:hover {
  color: blue;
}

@media (min-width: 900px) {
  .layout-container {
    flex-direction: row;
  }
  .layout-contain {
    max-width: 30rem;
    padding: 2rem;
  }
}
</style>
