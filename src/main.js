import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import PrimeVue from "primevue/config";

// Estilos globales de PrimeVue
import Aura from '@primeuix/themes/material';  
import "primeflex/primeflex.css"; // Opcional, si usas las utilidades flex
import "primeicons/primeicons.css";

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .use(router)
    .mount("#app");
