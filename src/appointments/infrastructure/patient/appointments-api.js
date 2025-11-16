import axios from "axios";

const API_URL = "http://localhost:5152/api/v1";

export async function fetchPatientAppointments(patientId) {
    const response = await axios.get(`${API_URL}/patients/${patientId}/appointments`);
    return response.data;
}

export async function fetchPatientAppointmentById(appointmentId) {
    const response = await axios.get(`${API_URL}/appointments/${appointmentId}`);
    return response.data;
}
