import {defineStore} from "pinia";
import {ref} from "vue";
import {HomeApi} from "../../infrastructure/patient/home-api.js";

const homeApi = new HomeApi();

export const useHomeStorage = defineStore('home', () => {
    //state
    const neuroAssessment = ref([])


    //Actions
    function getNeuroAssessmentById(id) {
        homeApi.getNeuroAssessmentById(id).then(response => {
            const result = response.data;
            console.log(result);
            neuroAssessment.value = result;
        })
    }

    return {
        neuroAssessment,
        getNeuroAssessmentById
    }

})