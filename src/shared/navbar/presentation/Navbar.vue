<script setup>
import { Menu } from "lucide-vue-next";
import { Bell } from "lucide-vue-next";
import { EllipsisVertical } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";

const isMobile = ref(window.innerWidth < 768);
const isOpenSidebar = ref(true);

const emit = defineEmits(["toggle-sidebar"]);

function handleSidebar() {
  isOpenSidebar.value = !isOpenSidebar.value;
  emit("toggle-sidebar", isOpenSidebar.value);
}

function handleResize() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="container-navbar">
    <div class="contain-left">
      <button>
        <Menu @click="handleSidebar" />
      </button>
      <h1 class="auro">Auro<span style="color: black">Neuro</span></h1>
    </div>

    <div class="contain-right">
      <button><Bell /></button>
      <div v-if="!isMobile" class="foto"></div>
      <div v-if="!isMobile">Jhimy romero meza</div>
      <button>
        <EllipsisVertical />
      </button>
    </div>
  </div>
</template>

<style scoped>
.container-navbar {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  border-bottom: 1px solid rgb(210, 209, 209);
}

.auro {
  font-weight: bold;
  color: rgb(23, 155, 83);
}

.contain-left {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
  margin-left: 1rem;
}

.contain-right {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
  margin-right: 1rem;
}

.foto {
  background-color: aqua;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
</style>
