<script setup>
import Sidebar from "../../../shared/sidebar/presentation/Sidebar.vue";
import Navbar from "../../../shared/navbar/presentation/Navbar.vue"
import { ref } from "vue";
import { RouterView } from "vue-router";

const isOpenSidebar = ref(true);

function handleToggleSidebar(value) {
  isOpenSidebar.value = value;
}
</script>

<template>
  <Navbar @toggle-sidebar="handleToggleSidebar" />
  <Sidebar :isOpenSidebar="isOpenSidebar" />
  <main
    class="main-content"
    :class="isOpenSidebar ? 'main-open' : 'main-close'"
  >
    <RouterView />
  </main>
</template>

<style scoped>

.main-content {
  padding: 1rem;
}

@media (min-width: 768px) {
  .main-content {
    transition: margin-left 0.3s ease-in;
    padding: 1rem;
  }
  .main-open {
    margin-left: 15rem;
  }

  .main-close {
    margin-left: 0;
  }
}
</style>
