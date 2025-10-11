import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import PrimeVue from "primevue/config";

// Estilos globales de PrimeVue
import Material from '@primeuix/themes/material';  

import 'mapbox-gl/dist/mapbox-gl.css'
import "primeflex/primeflex.css"; 
import "primeicons/primeicons.css";
import { Button, InputOtp } from "primevue";

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Material,
            options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    
        }
    })
    .component("Button", Button)
    .component("InputOtp", InputOtp)
    .use(router)
    .mount("#app");
