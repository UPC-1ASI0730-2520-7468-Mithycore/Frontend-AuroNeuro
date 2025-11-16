import axios from "axios";

const API_URL = "http://localhost:5152/api/v1";

export async function fetchNeurologistAppointments(neurologistId) {
    const response = await axios.get(`${API_URL}/neurologists/${neurologistId}/appointments`);
    return response.data;
}

export async function fetchNeurologistAppointmentById(appointmentId) {
    const response = await axios.get(`${API_URL}/appointments/${appointmentId}`);
    return response.data;
}
