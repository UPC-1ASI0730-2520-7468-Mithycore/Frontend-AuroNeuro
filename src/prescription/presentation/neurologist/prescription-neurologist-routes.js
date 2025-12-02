import NeurologistPrescriptionList
    from "./views/NeurologistPrescriptionList.vue";
import NeurologistPrescriptionForm
    from "./views/NeurologistPrescriptionForm.vue";

export default [
    {
        path: "prescriptions",
        name: "NeurologistPrescriptionList",
        component: NeurologistPrescriptionList,
    },
    {
        path: "prescriptions/new",
        name: "NeurologistPrescriptionNew",
        component: NeurologistPrescriptionForm,
    },
    {
        path: "prescriptions/:id/edit",
        name: "NeurologistPrescriptionEdit",
        component: NeurologistPrescriptionForm,
        props: true,
    },
];
