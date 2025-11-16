import LayoutHomeNeurologist from "./views/layout-home-neurologist.vue";
import MapComponent from "../../../location/presentation/components/map.vue"

const HomeNeurologistRoutes= [
    {path: 'home', component: LayoutHomeNeurologist},
    {path: 'map', component: MapComponent}
];

export default HomeNeurologistRoutes;