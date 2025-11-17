<script setup>
import { ref, computed, onMounted } from "vue";
import { PrescriptionStorage } from "../../../application/patient/prescription.storage";
import PrescriptionCard from "../components/PrescriptionCard.vue";

const patientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const prescriptions = ref([]);

const totalPrescriptions = computed(() => prescriptions.value.length);
const activeCount = computed(
    () => prescriptions.value.filter((p) => !p.revoked).length
);
const revokedCount = computed(
    () => prescriptions.value.filter((p) => p.revoked).length
);

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
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <p class="eyebrow">Patient space</p>
          <h1 class="title">My Prescriptions</h1>
          <p class="subtitle">
            Track the prescriptions your neurologist has issued for you over
            time.
          </p>
        </div>

        <aside v-if="totalPrescriptions > 0" class="header-stats">
          <div class="stat-main">
            <span class="label">Total</span>
            <span class="value">{{ totalPrescriptions }}</span>
          </div>
          <div class="stat-row">
            <span class="dot dot-active"></span>
            <span class="stat-text">Active</span>
            <span class="stat-number">{{ activeCount }}</span>
          </div>
          <div class="stat-row">
            <span class="dot dot-revoked"></span>
            <span class="stat-text">Revoked</span>
            <span class="stat-number">{{ revokedCount }}</span>
          </div>
        </aside>
      </header>

      <p v-if="prescriptions.length === 0" class="empty-state">
        No prescriptions available for this patient yet.
      </p>

      <section v-else class="timeline">
        <div class="timeline-line"></div>

        <div class="timeline-items">
          <PrescriptionCard
              v-for="(p, index) in prescriptions"
              :key="p.id"
              :prescription="p"
              :index="index + 1"
              class="timeline-item"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
.page {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
  background: #f9fafb;
}

.page::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
      radial-gradient(circle at 0% 0%, rgba(191, 219, 254, 0.7), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(221, 214, 254, 0.7), transparent 55%);
  opacity: 0.7;
  animation: bgFloat 16s ease-in-out infinite alternate;
  pointer-events: none;
}

.page-inner {
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 40px 70px 64px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2.5rem;
  margin-bottom: 32px;
}

.header-left {
  max-width: 560px;
}

.eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 4px;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin: 0 0 6px;
}

.subtitle {
  margin: 0;
  font-size: 0.96rem;
  color: #6b7280;
}

.header-stats {
  min-width: 180px;
  padding: 12px 18px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(209, 213, 219, 0.9);
  box-shadow: 0 18px 40px rgba(148, 163, 184, 0.5);
  backdrop-filter: blur(18px);
  transform: translateY(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.header-stats:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 60px rgba(148, 163, 184, 0.65);
}

.stat-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}

.stat-main .label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #9ca3af;
}

.stat-main .value {
  font-size: 1.9rem;
  font-weight: 800;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  margin-top: 4px;
}

.stat-text {
  flex: 1;
  margin-left: 6px;
  color: #6b7280;
}

.stat-number {
  font-weight: 600;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.dot-active {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
}

.dot-revoked {
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
}
.empty-state {
  margin-top: 40px;
  font-size: 0.98rem;
  color: #9ca3af;
}
.timeline {
  position: relative;
  margin-top: 12px;
  padding-left: 26px;
}

.timeline-line {
  position: absolute;
  top: 6px;
  bottom: 18px;
  left: 10px;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(
      to bottom,
      rgba(148, 163, 184, 0.35),
      rgba(129, 140, 248, 0.5)
  );
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.32s ease forwards;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -22px;
  top: 26px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #4f46e5;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.3);
}

.timeline-item:nth-child(1) {
  animation-delay: 0.03s;
}
.timeline-item:nth-child(2) {
  animation-delay: 0.09s;
}
.timeline-item:nth-child(3) {
  animation-delay: 0.15s;
}
.timeline-item:nth-child(n + 4) {
  animation-delay: 0.2s;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bgFloat {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(-20px, 10px, 0) scale(1.05);
  }
}

/* -------- Responsive ---------- */

@media (max-width: 960px) {
  .page-inner {
    padding: 28px 20px 40px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-stats {
    order: -1;
  }

  .timeline {
    padding-left: 20px;
  }

  .timeline-line {
    left: 6px;
  }

  .timeline-item::before {
    left: -16px;
  }
}
</style>
