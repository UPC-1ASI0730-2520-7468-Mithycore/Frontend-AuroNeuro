
export class Prescription {
    constructor(raw) {
        this.id = raw.id ?? null;
        this.patientId = raw.patientId ?? null;
        this.neurologistId = raw.neurologistId ?? null;
        this.issuedAt = raw.issuedAt ?? null;
        this.signatureHash = raw.signatureHash ?? "";
        this.revoked = raw.revoked ?? false;


        this.title = raw.title ?? `Prescription ${this.id ?? ""}`.trim();

        if (this.issuedAt) {
            const date = new Date(this.issuedAt);
            if (!isNaN(date.getTime())) {
                this.date = date.toISOString().slice(0, 10);
            } else {
                this.date = this.issuedAt;
            }
        } else {
            this.date = "";
        }

        // Lista de medicinas adaptada a lo que tu vista espera:
        // prescription.medicineItems -> [{ medicineName, dosage }]
        this.medicineItems = Array.isArray(raw.medicines)
            ? raw.medicines.map((m) => ({
                medicineName: m.name ?? "Unknown",
                // juntamos dosis + frecuencia en una sola línea (como en tu diseño)
                dosage: [m.dosage, m.frequency].filter(Boolean).join(" • "),
            }))
            : [];
    }
}

