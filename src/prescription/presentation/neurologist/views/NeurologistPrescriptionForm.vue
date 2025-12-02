<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage.js";

const route = useRoute();
const router = useRouter();

const prescriptionId = route.params.id;
const isEditMode = computed(() => !!prescriptionId);

const neurologistId = ref("3fa85f64-5717-4562-b3fc-2c963f66afa6");
const patientId = ref("3fa85f64-5717-4562-b3fc-2c963f66afa6");

const medicines = ref([{ name: "", dosage: "", frequency: "" }]);

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

onMounted(async () => {
  if (!isEditMode.value) return;

  try {
    loading.value = true;
    const prescription = await PrescriptionStorage.getById(prescriptionId);

    patientId.value = prescription.patientId;
    neurologistId.value = prescription.neurologistId;

    medicines.value =
        prescription.medicineItems.length > 0
            ? prescription.medicineItems.map((m) => ({
              name: m.medicineName,
              // dividimos "dosage • frequency"
              dosage: m.dosage.split("•")[0]?.trim() ?? "",
              frequency: m.dosage.split("•")[1]?.trim() ?? "",
            }))
            : [{ name: "", dosage: "", frequency: "" }];
  } catch (e) {
    console.error(e);
    errorMessage.value = "Error loading prescription.";
  } finally {
    loading.value = false;
  }
});

const addMedicine = () => {
  medicines.value.push({ name: "", dosage: "", frequency: "" });
};

const removeMedicine = (index) => {
  medicines.value.splice(index, 1);
  if (medicines.value.length === 0) addMedicine();
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    if (isEditMode.value) {
      await PrescriptionStorage.updateMedicines(prescriptionId, medicines.value);
      successMessage.value = "Prescription updated successfully.";
    } else {
      await PrescriptionStorage.create({
        patientId: patientId.value,
        neurologistId: neurologistId.value,
        medicines: medicines.value,
      });
      successMessage.value = "Prescription created successfully.";
    }

    setTimeout(() => {
      router.push({ name: "NeurologistPrescriptionList" });
    }, 700);
  } catch (e) {
    console.error(e);
    errorMessage.value = "Error saving prescription.";
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  if (!isEditMode.value) return;
  const confirmed = window.confirm("Delete this prescription?");
  if (!confirmed) return;

  try {
    loading.value = true;
    await PrescriptionStorage.delete(prescriptionId);
    router.push({ name: "NeurologistPrescriptionList" });
  } catch (e) {
    console.error(e);
    errorMessage.value = "Error deleting prescription.";
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push({ name: "NeurologistPrescriptionList" });
};
</script>

<template>
  <div class="page">
    <div class="page-inner">
      <button class="back-link" @click="goBack">
        ← Back to prescriptions
      </button>

      <h1 class="form-title">
        {{ isEditMode ? "Edit prescription" : "Create new prescription" }}
      </h1>
      <p class="form-subtitle">
        Define the patient, neurologist and medicines included in this prescription.
      </p>

      <form class="form" @submit.prevent="handleSubmit">
        <section class="card">
          <h2 class="section-title">General information</h2>

          <div class="grid-2">
            <div>
              <label class="field-label">Patient Id</label>
              <input
                  v-model="patientId"
                  type="text"
                  class="field-input"
                  :disabled="isEditMode"
              />
            </div>

            <div>
              <label class="field-label">Neurologist Id</label>
              <input
                  v-model="neurologistId"
                  type="text"
                  class="field-input"
                  disabled
              />
            </div>
          </div>
        </section>

        <section class="card">
          <div class="section-header">
            <h2 class="section-title">Medicines</h2>
            <button type="button" class="link-btn" @click="addMedicine">
              + Add medicine
            </button>
          </div>

          <div
              v-for="(m, index) in medicines"
              :key="index"
              class="med-row"
          >
            <div class="grid-3">
              <div>
                <label class="field-label">Name</label>
                <input
                    v-model="m.name"
                    type="text"
                    class="field-input"
                />
              </div>

              <div>
                <label class="field-label">Dosage</label>
                <input
                    v-model="m.dosage"
                    type="text"
                    class="field-input"
                    placeholder="e.g. 1 pill"
                />
              </div>

              <div>
                <label class="field-label">Frequency</label>
                <input
                    v-model="m.frequency"
                    type="text"
                    class="field-input"
                    placeholder="e.g. every 8 hours"
                />
              </div>
            </div>

            <button
                type="button"
                class="remove-btn"
                @click="removeMedicine(index)"
            >
              Remove
            </button>
          </div>
        </section>

        <div class="actions">
          <button
              type="submit"
              class="primary-btn"
              :disabled="loading"
          >
            {{ loading ? "Saving..." : "Save prescription" }}
          </button>

          <button
              v-if="isEditMode"
              type="button"
              class="danger-btn"
              :disabled="loading"
              @click="handleDelete"
          >
            Delete
          </button>

          <p v-if="errorMessage" class="msg msg-error">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="msg msg-success">
            {{ successMessage }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  min-height: 100%;
  background:
      radial-gradient(circle at 0% 0%, rgba(191, 219, 254, 0.45), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(221, 214, 254, 0.55), transparent 55%),
      #f9fafb;
}

.page-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 40px 48px;
}

.back-link {
  border: none;
  background: transparent;
  font-size: 0.88rem;
  color: #6b7280;
  cursor: pointer;
  margin-bottom: 8px;
}

.form-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 4px;
}

.form-subtitle {
  margin: 0 0 20px;
  font-size: 0.95rem;
  color: #6b7280;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 18px 18px 16px;
  border: 1px solid rgba(209, 213, 219, 0.9);
  box-shadow: 0 18px 35px rgba(148, 163, 184, 0.23);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 3px;
}

.field-input {
  width: 100%;
  border-radius: 0.6rem;
  border: 1px solid #d1d5db;
  padding: 0.45rem 0.65rem;
  font-size: 0.9rem;
}

.med-row {
  border-top: 1px dashed #e5e7eb;
  padding-top: 10px;
  margin-top: 10px;
}

.med-row:first-of-type {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.link-btn {
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4f46e5;
  cursor: pointer;
}

.remove-btn {
  margin-top: 6px;
  border: none;
  background: transparent;
  font-size: 0.8rem;
  color: #ef4444;
  cursor: pointer;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.primary-btn {
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.4rem;
  background: #4f46e5;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(79, 70, 229, 0.35);
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: default;
  box-shadow: none;
}

.danger-btn {
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  background: #ef4444;
  color: #fff;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}

.msg {
  font-size: 0.85rem;
}

.msg-error {
  color: #dc2626;
}

.msg-success {
  color: #059669;
}

/* Responsive */

@media (max-width: 900px) {
  .page-inner {
    padding: 24px 18px 40px;
  }
}
</style>
