<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  isOpenSidebar: Boolean,
});

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const homeLink = computed(() => {
  const role = route.meta.requiresRole

  if (role === 'patient') return '/patient'
  if (role === 'neurologist') return '/neurologist'

})

</script>

<template>
  <nav
    :class="
      props.isOpenSidebar ? 'sidebar-container-open' : 'sidebar-container-close'
    "
  >
    <div class="contain-foto-sidebar">
      <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" class="foto-sidebar"></img>
    </div>
    <div class="buttons-contain">
      <router-link :to='`${homeLink}/home`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-home"></i>
        Home
      </router-link>
      <router-link :to='`${homeLink}/data`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-server" style="margin-right: 0.5rem;"></i>
        Data
      </router-link>
      <router-link :to='`${homeLink}/tu`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-user" style="margin-right: 0.5rem;"></i>
        Tu
      </router-link>
      <router-link :to='`${homeLink}/agenda`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-book" style="margin-right: 0.5rem;"></i>
        Agenda
      </router-link>
      <router-link :to='`${homeLink}/prescription`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-book" style="margin-right: 0.5rem;"></i>
        prescription
      </router-link>
      <router-link :to='`${homeLink}/appointments`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-comments" style="margin-right: 0.5rem;"></i>
        appointments
      </router-link>
      <router-link :to='`${homeLink}/map`' class="nav-item" active-class="nav-item-active">
        <i class="pi pi-map-marker" style="margin-right: 0.5rem;"></i>
        Map
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-container-open {
  position: fixed;
  top: 5rem;
  width: 100%;
  transform: translateX(0);
  background-color: white;
  height: calc(100vh - 5rem);
  transition: transform 0.1s ease-out;
  z-index: 50;
}

.sidebar-container-close {
  position: fixed;
  transform: translateX(-100%);
  background-color: white;
  height: calc(100vh - 5rem);
  transition: transfirm 0.3s ease-in;
  z-index: 50;
}

@media (min-width: 768px) {
  .sidebar-container-open {
    position: fixed;
    transform: translateX(0);
    transition: transform 0.3s ease-in;
    width: 15rem;
    height: calc(100vh - 5rem);
    border-right: 1px solid rgb(210, 209, 209);
  }
  .sidebar-container-close {
    position: fixed;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
    width: 15rem;
    height: calc(100vh - 5rem);
    border-right: 1px solid rgb(210, 209, 209);
  }
}

.contain-foto-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
}

.foto-sidebar {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}

.buttons-contain {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.nav-item {
  align-items: center;
  width: 90%;
  text-decoration: none;
  color: black;
  padding: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-sizing: border-box;
  border-radius: 0.5rem;
}

/* Cuando está activo (ruta actual) */
.nav-item-active {
  background-color: rgb(227, 226, 226);
}

.nav-item:hover {
  background-color: rgb(227, 226, 226);
}
</style>
