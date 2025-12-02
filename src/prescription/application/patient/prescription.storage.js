import {
    fetchPrescriptionsByPatient,
    fetchPrescriptionsByNeurologist,
    fetchPrescriptionById,
    createPrescriptionApi,
    updatePrescriptionMedicinesApi,
    deletePrescriptionApi,
} from "../../infrastructure/patient/prescription-api.js";

export class PrescriptionStorage {
    static async getPatientPrescriptions(patientId) {
        return fetchPrescriptionsByPatient(patientId);
    }

    static async getNeurologistPrescriptions(neurologistId) {
        return fetchPrescriptionsByNeurologist(neurologistId);
    }

    static async getById(prescriptionId) {
        return fetchPrescriptionById(prescriptionId);
    }

    static async create({ patientId, neurologistId, medicines }) {
        const issuedAt = new Date().toISOString();

        const payload = {
            patientId,
            neurologistId,
            issuedAt,
            medicines: medicines.map((m) => ({
                name: m.name,
                dosage: m.dosage,
                frequency: m.frequency,
            })),
        };

        return createPrescriptionApi(payload);
    }

    static async updateMedicines(prescriptionId, medicines) {
        const normalized = medicines.map((m) => ({
            name: m.name,
            dosage: m.dosage,
            frequency: m.frequency,
        }));

        return updatePrescriptionMedicinesApi(prescriptionId, normalized);
    }

    static async delete(prescriptionId) {
        return deletePrescriptionApi(prescriptionId);
    }
}
