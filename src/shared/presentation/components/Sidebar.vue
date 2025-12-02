<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useIamApi } from "../../../iam/application/iam.storage.js";

const store = useIamApi();

const props = defineProps({
  isOpenSidebar: Boolean,
});

const route = useRoute();

// Ruta base según rol
const homeLink = computed(() => {
  // Primero intento con el rol del usuario, si no, con meta
  const role =
      (store.user?.role || route.meta.requiresRole || "").toString().toLowerCase();

  if (role === "patient") return "/patient";
  if (role === "neurologist") return "/neurologist";
  return "/"; // fallback
});

// Iniciales a partir de store.user.fullName
const initials = computed(() => {
  const fullName = store.user?.fullName ?? "";
  if (!fullName) return "N";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
});
</script>

<template>
  <nav
      :class="
      props.isOpenSidebar ? 'sidebar-container-open' : 'sidebar-container-close'
    "
  >
    <!-- Avatar + nombre -->
    <div class="contain-foto-sidebar">
      <div class="avatar-circle">
        <span>{{ initials }}</span>
      </div>
      <div v-if="store.user" class="user-info">
        <p class="user-name">{{ store.user.fullName }}</p>
        <p class="user-role">
          {{ (store.user.role || 'Neurologist') }}
        </p>
      </div>
    </div>

    <!-- Links -->
    <div class="buttons-contain">
      <router-link
          :to="`${homeLink}/dashboard`"
          class="nav-item"
          active-class="nav-item-active"
      >
        <i class="pi pi-home" style="margin-right: 0.5rem;"></i>
        Panel
      </router-link>

      <router-link
          :to="`${homeLink}/data`"
          class="nav-item"
          active-class="nav-item-active"
      >
        <i class="pi pi-server" style="margin-right: 0.5rem;"></i>
        Data
      </router-link>

      <router-link
          :to="`${homeLink}/profile`"
          class="nav-item"
          active-class="nav-item-active"
      >
        <i class="pi pi-user" style="margin-right: 0.5rem;"></i>
        Tú
      </router-link>

      <router-link
          :to="`${homeLink}/prescription`"
          class="nav-item"
          active-class="nav-item-active"
      >
        <i class="pi pi-book" style="margin-right: 0.5rem;"></i>
        Prescriptions
      </router-link>

      <router-link
          :to="`${homeLink}/appointments`"
        class="nav-item"
      active-class="nav-item-active"
      >
      <i class="pi pi-comments" style="margin-right: 0.5rem;"></i>
      Appointments
      </router-link>

      <router-link
          :to="`${homeLink}/map`"
          class="nav-item"
          active-class="nav-item-active"
      >
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
  top: 5rem;
  width: 100%;
  transform: translateX(-100%);
  background-color: white;
  height: calc(100vh - 5rem);
  /* typo corregido: transfirm -> transform */
  transition: transform 0.3s ease-in;
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
  padding-top: 1rem;
  box-sizing: border-box;
}

/* Avatar circular con iniciales */
.avatar-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.4rem;
}

.user-info {
  margin-top: 0.5rem;
  text-align: center;
}

.user-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.user-role {
  margin: 0.1rem 0 0;
  font-size: 0.8rem;
  color: #6b7280;
}

/* Botones */
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
  padding: 0.9rem 1rem;
  text-align: left;
  display: flex;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  gap: 0.5rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Cuando está activo (ruta actual) */
.nav-item-active {
  background-color: #e5e7eb;
}

.nav-item:hover {
  background-color: #e5e7eb;
}
</style>
