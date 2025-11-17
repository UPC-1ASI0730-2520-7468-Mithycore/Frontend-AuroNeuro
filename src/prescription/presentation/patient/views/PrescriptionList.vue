<script setup>
import { ref, computed, onMounted } from "vue";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage";
import PrescriptionCard from "../components/PrescriptionCard.vue";

const patientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const prescriptions = ref([]);

const totalPrescriptions = computed(() => prescriptions.value.length);

onMounted(async () => {
  try {
    prescriptions.value = await PrescriptionStorage.getPatientPrescriptions(
        patientId
    );
  } catch (e) {
    console.error("Error loading patient prescriptions", e);
  }
});
</script>

<template>
  <div class="page">
    <div class="page-inner">
      <header class="header">
        <div class="header-left">
          <p class="eyebrow">Patient space</p>
          <h1 class="title">My Prescriptions</h1>
          <p class="subtitle">
            Review the prescriptions your neurologist has issued for you.
          </p>
        </div>

        <div v-if="totalPrescriptions > 0" class="header-summary">
          <p class="summary-label">TOTAL</p>
          <p class="summary-number">{{ totalPrescriptions }}</p>
          <p class="summary-caption">active &amp; revoked</p>
        </div>
      </header>

      <p v-if="prescriptions.length === 0" class="empty-state">
        No prescriptions available.
      </p>

      <div v-else class="list">
        <PrescriptionCard
            v-for="(p, index) in prescriptions"
            :key="p.id"
            :prescription="p"
            :index="index + 1"
            class="list-item"
        />
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

.empty-state {
  margin-top: 40px;
  font-size: 0.98rem;
  color: #9ca3af;
}

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

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/*responsive*/

@media (max-width: 960px) {
  .page-inner {
    padding: 28px 20px 40px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-summary {
    text-align: left;
  }
}
</style>
