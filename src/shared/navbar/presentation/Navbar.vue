<script setup>
import {  ref } from "vue";
import { useDevice } from "../../../utils/useDevice";

const isMobile = useDevice();
const isOpenSidebar = ref(true);

const emit = defineEmits(["toggle-sidebar"]);

function handleSidebar() {
  isOpenSidebar.value = !isOpenSidebar.value;
  emit("toggle-sidebar", isOpenSidebar.value);
}
</script>

<template>
  <div class="container-navbar">
    <div class="contain-left">
      <Button icon="pi pi-align-justify" @click="handleSidebar" />
      <h1 class="auro">Auro<span style="color: black">Neuro</span></h1>
    </div>

    <div class="contain-right">
      <button>
        <i class="pi pi-bell" style="color: black;"></i>
      </button>
      <img v-if="!isMobile" src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" class="foto"></img>
      <div v-if="!isMobile">Jhimy romero meza</div>
      <button>
        <i class="pi pi-ellipsis-v" style="color: black;"></i>
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
