import axios from "axios";

const baseUrl =import.meta.env.VITE_API_URL;

export class BaseApi {
    #http

    constructor() {
        this.#http = axios.create({baseURL: baseUrl})
    }

    get http() {
        return this.#http;
    }
}