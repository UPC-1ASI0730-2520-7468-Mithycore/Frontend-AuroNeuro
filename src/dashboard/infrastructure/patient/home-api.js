import {BaseApi} from "../../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../../shared/infrastructure/base-endpoint.js";

const neuroAssessmentEndpointPath = import.meta.env.VITE_NEURO_ASSESSMENT_ENDPOINT;

export class HomeApi extends BaseApi{
    #neuroAssessmentEndpoint

    constructor() {
        super();
        this.#neuroAssessmentEndpoint = new BaseEndpoint(this, neuroAssessmentEndpointPath)
    }

    getNeuroAssessmentById(id) {
        return this.http.get(`/neuro-assessment/patient/${id}`, {
            withCredentials: true
        })
    }

    createNeuroAssessment(resource) {
        return this.http.post('/neuro-assessment', resource, {
            withCredentials: true
        })
    }

    addNeurologistIdToPatient(id, resource) {
        return this.http.post(`/patients/${id}/neurologists`, resource, {
            withCredentials: true
        })
    }
}