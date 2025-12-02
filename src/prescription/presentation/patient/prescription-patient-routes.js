import PrescriptionList from "./views/PrescriptionList.vue";
import PrescriptionDetail from "./views/PrescriptionDetail.vue";

export default [
    {
        path: "prescription",
        component: PrescriptionList,
    },
    {
        path: "prescription/:id",
        component: PrescriptionDetail,
        props: true,
    },
];
