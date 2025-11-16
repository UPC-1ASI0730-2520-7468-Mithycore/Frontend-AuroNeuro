export class MedicineItem {
    constructor({ name, dosage, frequency }) {
        this.medicineName = name;
        this.dosage = dosage;
        this.frequency = frequency;
    }
}

export class Prescription {
    constructor({
                    id,
                    patientId,
                    neurologistId,
                    issuedAt,
                    signatureHash,
                    revoked,
                    medicines = [],
                }) {
        this.id = id;
        this.patientId = patientId;
        this.neurologistId = neurologistId;
        this.signatureHash = signatureHash;
        this.revoked = revoked;

        this.title = `Prescription ${id}`;
        this.date = issuedAt?.split("T")[0] ?? "";
        this.medicineItems = medicines.map((m) => new MedicineItem(m));
    }
}
