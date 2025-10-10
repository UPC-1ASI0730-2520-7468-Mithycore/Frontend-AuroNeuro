<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  isOpenSidebar: Boolean,
});

console.log(props.isOpenSidebar);
</script>

<template>
  <nav
    :class="
      props.isOpenSidebar ? 'sidebar-container-open' : 'sidebar-container-close'
    "
  >
    <div class="contain-foto-sidebar">
      <div class="foto-sidebar"></div>
    </div>
    <div class="buttons-contain">
      <router-link to="/home" class="nav-item" active-class="nav-item-active">
        Home
      </router-link>

      <router-link to="/data" class="nav-item" active-class="nav-item-active">
        Data
      </router-link>
      <router-link to="/to" class="nav-item" active-class="nav-item-active">
        Tu
      </router-link>
      <router-link to="/agenda" class="nav-item" active-class="nav-item-active">
        Agenda
      </router-link>
      <router-link to="/chats" class="nav-item" active-class="nav-item-active">
        Chats
      </router-link>
      <router-link to="/map" class="nav-item" active-class="nav-item-active">
        Map
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-container-open {
  transform: translateX(0);
  background-color: white;
  height: calc(100vh - 5rem);
  transition: transform 0.1s ease-out;
}

.sidebar-container-close {
  transform: translateX(-100%);
  background-color: white;
  height: calc(100vh - 5rem);
  transition: transfirm 0.3s ease-in;
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
  background-color: aqua;
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
  width: 90%;
  text-decoration: none;
  color: black;
  padding: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
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
