<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {useIamApi} from "../../application/sign-in.storage.js";

const router = useRouter();
const store = useIamApi();
const form = reactive({
  username: "",
  password: "",
  role: "patient",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  street: "",
  city: "",
  country: "",
});

const errors = reactive({});

function validate() {
  Object.keys(errors).forEach(k => delete errors[k]);

  if (!form.username) errors.username = "Username is required";
  if (!form.password) errors.password = "Password is required";
  if (!form.firstName) errors.firstName = "First name is required";
  if (!form.lastName) errors.lastName = "Last name is required";
  if (!form.email) errors.email = "Email is required";
  if (!form.phoneNumber) errors.phoneNumber = "Phone is required";
  if (!form.birthDate) errors.birthDate = "Birth date is required";

  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  // Aquí preparas el objeto EXACTO para tu backend (CreatePatientCommand)
  const payload = {
    username: form.username,
    password: form.password,
    role: "patient",
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phoneNumber: form.phoneNumber,
    birthDate: new Date(form.birthDate),
    street: form.street || null,
    number: "empty",
    city: form.city || null,
    country: form.country || null,
    licenseNumber: "empty",
    postalCode: "empty",
    specialties: "empty"
  };

  console.log("Payload para API:", payload);

  // TODO: Llamada real a tu API
  // await api.post("/patients", payload)
  await store.signUp(payload);
  // Por ahora, solo redirigimos a login
}
</script>

<template>
  <div class="page-container">
    <div class="card">
      <h2 class="title">Register as Patient</h2>
      <p class="subtitle">Create your AuraNeuro account and manage your health.</p>

      <form class="form" @submit.prevent="handleSubmit">
        <!-- UserId (opcional, lo puedes ocultar o quitar si lo manejas backend) -->
        <div class="field" v-if="false">
          <label>User Id</label>
          <input v-model="form.userId" type="number" placeholder="User id" />
        </div>

        <!-- Username & Password -->
        <div class="grid-2">
          <div class="field">
            <label>Username</label>
            <input
                v-model="form.username"
                type="text"
                placeholder="Choose a username"
            />
            <p v-if="errors.username" class="error">{{ errors.username }}</p>
          </div>

          <div class="field">
            <label>Password</label>
            <input
                v-model="form.password"
                type="password"
                placeholder="Create a password"
            />
            <p v-if="errors.password" class="error">{{ errors.password }}</p>
          </div>
        </div>

        <!-- First / Last Name -->
        <div class="grid-2">
          <div class="field">
            <label>First name</label>
            <input
                v-model="form.firstName"
                type="text"
                placeholder="John"
            />
            <p v-if="errors.firstName" class="error">{{ errors.firstName }}</p>
          </div>

          <div class="field">
            <label>Last name</label>
            <input
                v-model="form.lastName"
                type="text"
                placeholder="Doe"
            />
            <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>
          </div>
        </div>

        <!-- Email / Phone -->
        <div class="grid-2">
          <div class="field">
            <label>Email</label>
            <input
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
            />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label>Phone number</label>
            <input
                v-model="form.phoneNumber"
                type="tel"
                placeholder="+51 999 999 999"
            />
            <p v-if="errors.phoneNumber" class="error">{{ errors.phoneNumber }}</p>
          </div>
        </div>

        <!-- Birthdate -->
        <div class="field">
          <label>Birth date</label>
          <input
              v-model="form.birthDate"
              type="date"
          />
          <p v-if="errors.birthDate" class="error">{{ errors.birthDate }}</p>
        </div>

        <!-- Address -->
        <div class="grid-3">
          <div class="field">
            <label>Street (optional)</label>
            <input
                v-model="form.street"
                type="text"
                placeholder="Street and number"
            />
          </div>

          <div class="field">
            <label>City (optional)</label>
            <input
                v-model="form.city"
                type="text"
                placeholder="Lima"
            />
          </div>

          <div class="field">
            <label>Country (optional)</label>
            <input
                v-model="form.country"
                type="text"
                placeholder="Peru"
            />
          </div>
        </div>

        <button type="submit" class="btn-submit">
          Create patient account
        </button>

        <router-link to="/iam/login" class="link-login">
          Already have an account? Login
        </router-link>
      </form>

      <p class="policies">
        By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.
      </p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at top, #2b2445, #000000);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.card {
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  text-align: center;
  font-size: 0.95rem;
  color: #555;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

input {
  padding: 0.75rem 0.85rem;
  border-radius: 0.7rem;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
}

input:focus {
  border-color: #7145d8;
  box-shadow: 0 0 0 3px rgba(113, 69, 216, 0.18);
  transform: translateY(-1px);
}

.error {
  font-size: 0.75rem;
  color: #d93025;
}

.grid-2 {
  display: grid;
  gap: 1rem;
}

.grid-3 {
  display: grid;
  gap: 1rem;
}

@media (min-width: 700px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 840px) {
  .grid-3 {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.btn-submit {
  margin-top: 0.5rem;
  padding: 0.9rem;
  border-radius: 0.9rem;
  border: none;
  background: linear-gradient(135deg, #7145d8, #9c5bff);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(90, 54, 185, 0.5);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(90, 54, 185, 0.7);
}

.btn-submit:active {
  transform: translateY(0px);
  box-shadow: 0 8px 18px rgba(90, 54, 185, 0.5);
}

.link-login {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-align: center;
  color: #333;
}

.link-login:hover {
  color: #7145d8;
}

.policies {
  font-size: 0.75rem;
  text-align: center;
  color: #777;
}
</style>
