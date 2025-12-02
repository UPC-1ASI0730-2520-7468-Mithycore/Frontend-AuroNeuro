<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {useIamApi} from "../../application/iam.storage.js";

const router = useRouter();
const store = useIamApi()

const form = reactive({
  username: "",
  password: "",
  role: "neurologist",
  firstName: "",
  lastName: "",
  licenseNumber: "",
  email: "",
  phone: "",
  street: "",
  number: "",
  city: "",
  postalCode: "",
  country: "",
  specialties: "",
});

const errors = reactive({});

function validate() {
  Object.keys(errors).forEach(k => delete errors[k]);

  if (!form.username) errors.username = "Username is required";
  if (!form.password) errors.password = "Password is required";

  if (!form.firstName) errors.firstName = "First name is required";
  if (!form.lastName) errors.lastName = "Last name is required";
  if (!form.licenseNumber) errors.licenseNumber = "License number is required";

  if (!form.email) errors.email = "Email is required";
  if (!form.phone) errors.phone = "Phone is required";

  if (!form.street) errors.street = "Street is required";
  if (!form.number) errors.number = "Number is required";
  if (!form.city) errors.city = "City is required";
  if (!form.postalCode) errors.postalCode = "Postal code is required";
  if (!form.country) errors.country = "Country is required";

  if (!form.specialties) errors.specialties = "Specialties is required";

  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  const payload = {
    username: form.username,
    password: form.password,
    role: "neurologist",
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phoneNumber: form.phone,
    birthDate: "2025-12-01T17:03:52.012Z",
    street: form.street,
    number: form.number,
    city: form.city,
    country: form.country,
    licenseNumber: form.licenseNumber,
    postalCode: form.postalCode,
    specialties: form.specialties,
  };

  console.log("Payload neurologist para API:", payload);

  // TODO: llamada real a tu API
  // await api.post("/neurologists", payload)
  await store.signUp(payload)
  console.log(store.user)
}
</script>

<template>
  <div class="page-container">
    <div class="card">
      <h2 class="title">Register as Neurologist</h2>
      <p class="subtitle">
        Join AuraNeuro and manage your patients with powerful tools.
      </p>

      <form class="form" @submit.prevent="handleSubmit">
        <!-- UserId (si lo usas manualmente, puedes mostrarlo) -->
        <div class="field" v-if="false">
          <label>User Id</label>
          <input v-model="form.userId" type="number" placeholder="User id" />
        </div>

        <!-- Username / Password / Role -->
        <div class="grid-3-top">
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

        <!-- Nombre / Apellido -->
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

        <!-- License / Email -->
        <div class="grid-2">
          <div class="field">
            <label>License number</label>
            <input
                v-model="form.licenseNumber"
                type="text"
                placeholder="CMP-XXXXX"
            />
            <p v-if="errors.licenseNumber" class="error">{{ errors.licenseNumber }}</p>
          </div>

          <div class="field">
            <label>Email</label>
            <input
                v-model="form.email"
                type="email"
                placeholder="you@clinic.com"
            />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Phone -->
        <div class="field">
          <label>Phone</label>
          <input
              v-model="form.phone"
              type="tel"
              placeholder="+51 999 999 999"
          />
          <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
        </div>

        <!-- Dirección -->
        <div class="grid-3">
          <div class="field">
            <label>Street</label>
            <input
                v-model="form.street"
                type="text"
                placeholder="Street"
            />
            <p v-if="errors.street" class="error">{{ errors.street }}</p>
          </div>

          <div class="field">
            <label>Number</label>
            <input
                v-model="form.number"
                type="text"
                placeholder="123"
            />
            <p v-if="errors.number" class="error">{{ errors.number }}</p>
          </div>

          <div class="field">
            <label>Postal code</label>
            <input
                v-model="form.postalCode"
                type="text"
                placeholder="15001"
            />
            <p v-if="errors.postalCode" class="error">{{ errors.postalCode }}</p>
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>City</label>
            <input
                v-model="form.city"
                type="text"
                placeholder="Lima"
            />
            <p v-if="errors.city" class="error">{{ errors.city }}</p>
          </div>

          <div class="field">
            <label>Country</label>
            <input
                v-model="form.country"
                type="text"
                placeholder="Peru"
            />
            <p v-if="errors.country" class="error">{{ errors.country }}</p>
          </div>
        </div>

        <!-- Especialidades -->
        <div class="field">
          <label>Specialties</label>
          <textarea
              v-model="form.specialties"
              rows="3"
              placeholder="Example: Epilepsy, Neurophysiology, Sleep disorders..."
          />
          <p v-if="errors.specialties" class="error">{{ errors.specialties }}</p>
        </div>

        <button type="submit" class="btn-submit">
          Create neurologist account
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
  max-width: 780px;
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

input,
select,
textarea {
  padding: 0.75rem 0.85rem;
  border-radius: 0.7rem;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
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

.grid-3-top {
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 860px) {
  .grid-3 {
    grid-template-columns: 2fr 1fr 1fr;
  }

  .grid-3-top {
    grid-template-columns: 2fr 2fr 1fr;
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
