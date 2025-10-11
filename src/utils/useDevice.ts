import { onMounted, onUnmounted, ref } from "vue";

export const isMovile = ref(window.innerWidth < 768)

function handleResize() {
    isMovile.value = window.innerWidth < 768;
}

onMounted(() => {
    addEventListener('resize', handleResize)
})

onUnmounted(() => {
    removeEventListener('resize', handleResize)
})

export function useDevice() {
    return { isMovile };
}
