import { BaseApi } from "../../../shared/infrastructure/base-api.js";
import { Prescription } from "../../domain/patient/model/prescription.entity";

const api = new BaseApi().http;

export const fetchPrescriptionsByPatient = async (patientId) => {
    const response = await api.get(`/patients/${patientId}/prescriptions`);
    return response.data.map((p) => new Prescription(p));
};

export const fetchPrescriptionsByNeurologist = async (neurologistId) => {
    const response = await api.get(`/neurologists/${neurologistId}/prescriptions`);
    return response.data.map((p) => new Prescription(p));
};
