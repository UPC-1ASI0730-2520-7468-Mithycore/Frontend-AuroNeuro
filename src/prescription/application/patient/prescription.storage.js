import {
    fetchPrescriptionsByPatient,
    fetchPrescriptionsByNeurologist,
} from "../../infrastructure/patient/prescription-api";

export const PrescriptionStorage = {
    async getPatientPrescriptions(patientId) {
        return await fetchPrescriptionsByPatient(patientId);
    },

    async getNeurologistPrescriptions(neurologistId) {
        return await fetchPrescriptionsByNeurologist(neurologistId);
    },
};
