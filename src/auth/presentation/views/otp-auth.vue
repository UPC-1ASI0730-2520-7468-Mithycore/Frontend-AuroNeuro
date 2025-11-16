<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

import { ref } from 'vue';
const router = useRouter()
const value = ref(null);

function goBack() {
  if (window.history.length > 1) {
    router.back()
  }
}

</script>

<template>
  <form class="container-form">
    <button type="button" style="cursor: pointer;" @click="goBack">
      <i class="pi pi-arrow-left" style="color: black; text-align: left; width: 100%;"></i>
    </button>
    <h2>Enter cell phone number</h2>
    <p>You must enter your cell phone number to continue.</p>

    <div class="input-otp">
        <InputOtp v-model="value" />
    </div>
    <p>By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.</p>
  <router-link to="/user-auth" class="button-next">Send</router-link>

  </form>
</template>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  gap: 1rem;
  margin: 5rem auto auto;
  padding: 0.5rem;
}

.input-number input{
  height: 3rem;
  border-radius: 0.5rem;
}

.button-next {
  text-decoration: none;
  text-align: center;
  background-color: #7145D8;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.state-location {
  background-color: rgb(220, 218, 218);
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
}

.input-otp {
  margin: auto;
}
</style>
