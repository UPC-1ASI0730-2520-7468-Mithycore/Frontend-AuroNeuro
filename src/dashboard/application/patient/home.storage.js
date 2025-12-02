import {defineStore} from "pinia";
import {ref} from "vue";
import {HomeApi} from "../../infrastructure/patient/home-api.js";

const homeApi = new HomeApi();

export const useHomeStorage = defineStore('home', () => {
    //state
    const neuroAssessment = ref([])


    //Actions
    function getNeuroAssessmentById(id) {
        console.log(id)
        homeApi.getNeuroAssessmentById(id).then(response => {
            const result = response.data;
            console.log(result);
            neuroAssessment.value = result;
        })
    }

    async function createNeuroAssessment(resource) {
        const result = await homeApi.createNeuroAssessment(resource)
        console.log(result.data);

    }

    async function assignNeurologistToPatient(id, resource) {
        const result = await homeApi.addNeurologistIdToPatient(id, resource);
        console.log(result.data)
    }

    return {
        neuroAssessment,
        getNeuroAssessmentById,
        createNeuroAssessment,
        assignNeurologistToPatient
    }

})