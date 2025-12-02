<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isMovile = ref(window.innerWidth < 900);

function handleResize() {
  isMovile.value = window.innerWidth < 900;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="layout-container">

    <!-- Imagen para móvil -->
    <img
        v-if="isMovile"
        src="https://firebasestorage.googleapis.com/v0/b/inventario-react-b0e39.appspot.com/o/AuraNeuro.png?alt=media&token=512da5b9-be57-4bdd-988a-d7a92a8ba73f"
    />

    <div class="layout-box">
      <h2>Register</h2>
      <p>Register and manage your health</p>

      <div class="buttons">
        <router-link to="/iam/register-patient" class="btn-option google">
          Patient
        </router-link>

        <router-link to="/iam/register-neurologist" class="btn-option purple">
          Neurologist
        </router-link>
      </div>

      <router-link to="/iam/login" class="link-login">
        Login
      </router-link>

      <p class="policies">
        By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.
      </p>
    </div>

    <!-- Imagen para desktop -->
    <img
        v-if="!isMovile"
        class="img-desktop"
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
  padding: 1rem;
  box-sizing: border-box;
}

.layout-box {
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 26rem;
  min-height: 34rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-option {
  padding: 1rem;
  text-align: center;
  border-radius: 0.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.google {
  background: white;
  border: 2px solid #ddd;
  color: black;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.google:hover {
  background: #f4f4f4;
}

.purple {
  background: #7145D8;
  color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
}

.purple:hover {
  background: #5b35b2;
}

.link-login {
  margin-top: 2rem;
  color: black;
  font-weight: 500;
}

.link-login:hover {
  color: #7145D8;
}

.policies {
  margin-top: auto;
  font-size: 0.85rem;
  text-align: center;
}


@media (min-width: 900px) {
  .layout-container {
    flex-direction: row;
  }
}
</style>
