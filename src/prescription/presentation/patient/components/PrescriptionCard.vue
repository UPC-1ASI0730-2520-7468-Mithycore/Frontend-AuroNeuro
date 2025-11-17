<template>
  <article class="card">
    <div class="card-inner">
      <header class="card-header">
        <div class="title-group">
          <div class="pill-icon">💊</div>
          <div>
            <h2 class="card-title">{{ prescription.title }}</h2>
            <p class="card-date">
              Date:
              <span>{{ prescription.date }}</span>
            </p>
          </div>
        </div>

        <span
            class="status"
            :class="{ 'status--revoked': prescription.revoked }"
        >
          {{ prescription.revoked ? "Revoked" : "Active" }}
        </span>
      </header>

      <hr class="divider" />

      <section class="card-body">
        <p class="section-label">Medicines</p>
        <ul class="med-list">
          <li
              v-for="m in prescription.medicineItems"
              :key="m.medicineName"
              class="med-item"
          >
            <span class="med-dot"></span>
            <div class="med-text">
              <span class="med-name">{{ m.medicineName }}</span>
              <span class="med-dosage">{{ m.dosage }}</span>
            </div>
          </li>
        </ul>
      </section>

      <footer class="card-footer">
        <span class="index">#{{ index }}</span>
      </footer>
    </div>
  </article>
</template>

<script setup>
defineProps({
  prescription: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.card {
  position: relative;
  border-radius: 18px;
  padding: 2px; /* para el borde degradado */
  background: linear-gradient(135deg, #e0e7ff, #fce7f3);
  box-shadow: 0 22px 45px rgba(148, 163, 184, 0.35);
}

.card-inner {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 22px 14px;
  box-shadow: 0 0 0 1px rgba(229, 231, 235, 0.75);
  transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;
}

.card:hover .card-inner {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(129, 140, 248, 0.5);
  background: rgba(255, 255, 255, 0.98);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.pill-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 20%, #f97316, #facc15);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  font-size: 1.25rem;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 2px;
}

.card-date {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
}

.card-date span {
  font-weight: 500;
}

.status {
  font-size: 0.78rem;
  padding: 4px 12px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #166534;
  border: 1px solid #bbf7d0;
  font-weight: 600;
}

.status--revoked {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.divider {
  border: none;
  border-top: 1px dashed #e5e7eb;
  margin: 10px 0 8px;
}

.card-body {
  font-size: 0.9rem;
}

.section-label {
  font-size: 0.86rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: #4b5563;
}

.med-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.med-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.med-dot {
  margin-top: 5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.22);
}

.med-text {
  display: flex;
  flex-direction: column;
}

.med-name {
  font-weight: 600;
}

.med-dosage {
  font-size: 0.82rem;
  color: #6b7280;
}

.card-footer {
  margin-top: 10px;
  border-top: 1px dashed #e5e7eb;
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
}

.index {
  font-size: 0.78rem;
  color: #9ca3af;
}


@media (max-width: 768px) {
  .card-inner {
    padding: 14px 16px 12px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .status {
    margin-top: 4px;
  }
}
</style>
