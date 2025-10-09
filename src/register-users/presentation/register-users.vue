<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isMovile = ref(window.innerWidth < 900)

function handleResize () {
  isMovile.value = window.innerWidth < 900
}

onMounted(() => {
  window.addEventListener("resize", handleResize)
})

onUnmounted(()=> {
  window.removeEventListener("resize", handleResize)
})

</script>

<template>
  <div class="layout-container">
    
      <img v-if="isMovile" src="https://firebasestorage.googleapis.com/v0/b/inventario-react-b0e39.appspot.com/o/AuraNeuro.png?alt=media&token=512da5b9-be57-4bdd-988a-d7a92a8ba73f"/>
    <div class="layout-contain">
      <h2>Register</h2>
      <p>Register and manage your health</p>
      <div class="buttons-options">
        <button class="button-google">
          <img src="../../assets/logo-google.svg" />
          Continue with Google
        </button>
      <button class="button-phone">Login with cell phone number</button>
      <router-link to="/login" class="link-register"> Login </router-link>
      </div>
      <p class="policies">By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.</p>
    </div>
    <img v-if="!isMovile" src="https://firebasestorage.googleapis.com/v0/b/inventario-react-b0e39.appspot.com/o/image%209.png?alt=media&token=48f62288-de65-4def-bf8f-5f62cbbef276"/>
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

.layout-contain-form {
  background-color: white;
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

.button-google {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

.button-phone {
  background-color: #7145D8;
  color: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

.policies {
  margin-top: auto;
}

.link-register {
  text-align: center;
  margin-top: 2rem;
  color: black;
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
