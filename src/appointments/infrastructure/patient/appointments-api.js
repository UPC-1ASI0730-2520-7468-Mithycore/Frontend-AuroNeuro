import {BaseApi} from "../../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../../shared/infrastructure/base-endpoint.js";

export class HomeApi extends BaseApi{
    #appointmentEndpoint

    constructor() {
        super();
        this.#appointmentEndpoint = new BaseEndpoint(this,"/appointment")
    }

    getAppointmentById(id) {
        return this.#appointmentEndpoint.getById(id);
    }
}