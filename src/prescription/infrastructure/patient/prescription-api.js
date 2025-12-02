import { BaseApi } from "../../../shared/infrastructure/base-api.js";
import { Prescription } from "../../domain/patient/model/prescription.entity.js";

const api = new BaseApi().http;

// GET /api/v1/patients/{patientId}/prescriptions
export const fetchPrescriptionsByPatient = async (patientId) => {
    const response = await api.get(`/patients/${patientId}/prescriptions`);
    return response.data.map((p) => new Prescription(p));
};

// GET /api/v1/neurologists/{neurologistId}/prescriptions
export const fetchPrescriptionsByNeurologist = async (neurologistId) => {
    const response = await api.get(`/neurologists/${neurologistId}/prescriptions`);
    return response.data.map((p) => new Prescription(p));
};

// GET /api/v1/prescriptions/{prescriptionId}
export const fetchPrescriptionById = async (prescriptionId) => {
    const response = await api.get(`/prescriptions/${prescriptionId}`);
    return new Prescription(response.data);
};

// POST /api/v1/prescriptions
export const createPrescriptionApi = async (payload) => {
    // payload: { patientId, neurologistId, issuedAt, medicines: [{ name, dosage, frequency }] }
    const response = await api.post(`/prescriptions`, payload);
    return new Prescription(response.data);
};

// PATCH /api/v1/prescriptions/{prescriptionId}
export const updatePrescriptionMedicinesApi = async (prescriptionId, medicines) => {
    const response = await api.patch(`/prescriptions/${prescriptionId}`, {
        medicines,
    });
    return new Prescription(response.data);
};

// DELETE /api/v1/prescriptions/{prescriptionId}
export const deletePrescriptionApi = async (prescriptionId) => {
    await api.delete(`/prescriptions/${prescriptionId}`);
};
