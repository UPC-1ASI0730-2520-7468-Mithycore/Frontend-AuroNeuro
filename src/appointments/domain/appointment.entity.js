export class Appointment {
    constructor(data) {
        this.id = data.id;
        this.neurologistId = data.neurologistId;
        this.patientId = data.patientId;
        this.date = data.date;
        this.status = data.status;
        this.notes = data.notes;
    }
}
