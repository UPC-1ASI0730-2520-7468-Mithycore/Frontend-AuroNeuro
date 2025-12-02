import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

export class IamApi extends BaseApi{
    #SignInPath

    constructor() {
        super();
        this.#SignInPath = new BaseEndpoint(this, '/authentication/sign-in')
    }

    postSignIn(resource) {
        return this.http.post('/authentication/sign-in',resource, {
            withCredentials: true
        })
    }

    validate() {
        return this.http.get('/authentication/validate', {
            withCredentials: true
        })
    }

    postSignUp(resource) {
        return this.http.post('/authentication/sign-up', resource, {
            withCredentials: true
        })
    }

    getNeurologistById(id) {
        return this.http.get(`/neurologists/${id}`, {
            withCredentials: true
        })
    }

    getPatientById(id) {
        return this.http.get(`/patients/${id}`, {
            withCredentials: true
        })
    }


}