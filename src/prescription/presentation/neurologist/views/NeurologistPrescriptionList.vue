<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage.js";

const router = useRouter();

const neurologistId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const prescriptions = ref([]);
const loading = ref(true);
const error = ref(null);

const totalPrescriptions = computed(() => prescriptions.value.length);

onMounted(async () => {
  try {
    prescriptions.value = await PrescriptionStorage.getNeurologistPrescriptions(
        neurologistId
    );
  } catch (e) {
    console.error("Error loading neurologist prescriptions", e);
    error.value = "Unable to load prescriptions.";
  } finally {
    loading.value = false;
  }
});

const goToNew = () => {
  router.push({ name: "NeurologistPrescriptionNew" });
};

const goToEdit = (id) => {
  router.push({ name: "NeurologistPrescriptionEdit", params: { id } });
};
</script>

<template>
  <div class="page">
    <div class="page-inner">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <p class="eyebrow">Neurologist space</p>
          <h1 class="title">Prescriptions created</h1>
          <p class="subtitle">
            Review and manage the prescriptions you have issued for your patients.
          </p>
        </div>

        <div class="header-right">
          <div v-if="totalPrescriptions > 0" class="header-summary">
            <p class="summary-label">TOTAL</p>
            <p class="summary-number">{{ totalPrescriptions }}</p>
            <p class="summary-caption">issued prescriptions</p>
          </div>

          <button class="primary-btn" @click="goToNew">
            + New prescription
          </button>
        </div>
      </header>

      <!-- States -->
      <p v-if="loading" class="state-text">Loading prescriptions…</p>

      <p v-else-if="error" class="state-text state-error">
        {{ error }}
      </p>

      <p v-else-if="prescriptions.length === 0" class="state-text">
        You haven't created any prescription yet.
      </p>

      <!-- List -->
      <div v-else class="list">
        <article
            v-for="(p, index) in prescriptions"
            :key="p.id"
            class="card list-item"
        >
          <div class="card-header">
            <div>
              <p class="card-eyebrow">Prescription {{ index + 1 }}</p>
              <h2 class="card-title">
                {{ p.patientName ?? "Patient prescription" }}
              </h2>
              <p class="card-meta">
                Issued on:
                <span class="card-meta-strong">
                  {{ p.date }}
                </span>
              </p>
            </div>

            <button class="ghost-btn" @click="goToEdit(p.id)">
              Edit
            </button>
          </div>

          <div class="card-body">
            <p class="meds-label">Medicines</p>
            <ul class="meds-list">
              <li
                  v-for="(m, i) in p.medicineItems"
                  :key="i"
                  class="meds-item"
              >
                <span class="meds-dot"></span>
                <div class="meds-text">
                  <span class="meds-name">{{ m.medicineName }}</span>
                  <span class="meds-dosage">{{ m.dosage }}</span>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>
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
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 72px 56px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.5rem;
  margin-bottom: 30px;
}

.header-left {
  max-width: 520px;
}

.header-right {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 4px;
}

.title {
  font-size: 2.3rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin: 0 0 4px;
}

.subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #6b7280;
}

.header-summary {
  text-align: right;
  padding: 0.7rem 1.1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(209, 213, 219, 0.9);
  box-shadow: 0 18px 35px rgba(148, 163, 184, 0.25);
  min-width: 120px;
}

.summary-label {
  margin: 0;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #9ca3af;
}

.summary-number {
  margin: 2px 0 0;
  font-size: 1.9rem;
  font-weight: 800;
}

.summary-caption {
  margin: 0;
  font-size: 0.78rem;
  color: #6b7280;
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
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
}

.primary-btn:hover {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 16px 30px rgba(79, 70, 229, 0.4);
}

.state-text {
  margin-top: 40px;
  font-size: 0.98rem;
  color: #9ca3af;
}

.state-error {
  color: #dc2626;
}

/* Cards */

.list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}

.list-item {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeInUp 0.35s ease forwards;
}

.list-item:nth-child(1) {
  animation-delay: 0.03s;
}
.list-item:nth-child(2) {
  animation-delay: 0.1s;
}
.list-item:nth-child(3) {
  animation-delay: 0.18s;
}
.list-item:nth-child(n + 4) {
  animation-delay: 0.22s;
}

.card {
  background: #ffffff;
  border-radius: 1.1rem;
  padding: 16px 18px 14px;
  border: 1px solid rgba(209, 213, 219, 0.9);
  box-shadow: 0 18px 35px rgba(148, 163, 184, 0.23);
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 10px;
}

.card-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9ca3af;
  margin: 0 0 2px;
}

.card-title {
  margin: 0;
  font-size: 1.03rem;
  font-weight: 700;
}

.card-meta {
  margin: 4px 0 0;
  font-size: 0.82rem;
  color: #6b7280;
}

.card-meta-strong {
  font-weight: 600;
  color: #4b5563;
}

.ghost-btn {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  padding: 0.3rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #4f46e5;
  cursor: pointer;
  white-space: nowrap;
}

.card-body {
  margin-top: 4px;
}

.meds-label {
  margin: 0 0 4px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ca3af;
}

.meds-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.meds-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
}

.meds-item + .meds-item {
  margin-top: 2px;
}

.meds-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #4f46e5;
  margin-top: 6px;
}

.meds-text {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.meds-name {
  font-weight: 600;
}

.meds-dosage {
  color: #6b7280;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */

@media (max-width: 960px) {
  .page-inner {
    padding: 28px 20px 40px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .header-summary {
    text-align: left;
  }
}
</style>
