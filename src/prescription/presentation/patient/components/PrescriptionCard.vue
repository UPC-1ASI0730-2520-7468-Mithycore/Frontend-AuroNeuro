<template>
  <article class="card">
    <div class="glow"></div>

    <div class="card-inner">
      <header class="card-header">
        <div class="title-group">
          <div class="pill-icon">💊</div>
          <div>
            <h2 class="card-title">{{ prescription.title }}</h2>
            <p class="card-subtitle">
              Prescription <span>#{{ index }}</span>
            </p>
          </div>
        </div>

        <div class="meta">
          <div class="date">
            <span class="date-label">Issued on</span>
            <span class="date-value">{{ prescription.date }}</span>
          </div>

          <span
              class="status"
              :class="{ 'status--revoked': prescription.revoked }"
          >
            {{ prescription.revoked ? "Revoked" : "Active" }}
          </span>
        </div>
      </header>

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
  border-radius: 20px;
  overflow: hidden;
}
.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 0% 0%,
      rgba(129, 140, 248, 0.45),
      transparent 55%
  );
  opacity: 0;
  transition: opacity 0.22s ease;
  pointer-events: none;
}

.card-inner {
  position: relative;
  border-radius: 18px;
  padding: 18px 24px 18px;
  background:
      linear-gradient(
          135deg,
          rgba(248, 250, 252, 0.94),
          rgba(255, 255, 255, 0.98)
      ),
      radial-gradient(circle at 100% 0%, rgba(254, 242, 242, 0.5), transparent 55%);
  border: 1px solid rgba(229, 231, 235, 0.9);
  box-shadow: 0 12px 26px rgba(148, 163, 184, 0.4);
  transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
}

.card:hover .card-inner {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(129, 140, 248, 0.6);
  border-color: rgba(129, 140, 248, 0.7);
}

.card:hover .glow {
  opacity: 1;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.pill-icon {
  width: 40px;
  height: 40px;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(
      from 210deg,
      #f97316,
      #facc15,
      #fb7185,
      #f97316
  );
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.65);
  font-size: 1.25rem;
  transform: translateY(0);
  transition: transform 0.22s ease;
}

.card:hover .pill-icon {
  transform: translateY(-1px) rotate(-3deg);
}

.card-title {
  font-size: 1.08rem;
  font-weight: 700;
  margin: 0 0 2px;
}

.card-subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #9ca3af;
}

.card-subtitle span {
  font-weight: 600;
}
.meta {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.date {
  text-align: right;
  font-size: 0.78rem;
}

.date-label {
  display: block;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.date-value {
  font-weight: 600;
  color: #374151;
}

.status {
  font-size: 0.8rem;
  padding: 4px 13px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #166534;
  border: 1px solid #bbf7d0;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.status::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.75) 40%,
      transparent 80%
  );
  transform: translateX(-120%);
  opacity: 0;
}

.card:hover .status::after {
  opacity: 1;
  transform: translateX(120%);
  transition: transform 0.6s ease-out, opacity 0.1s ease;
}

.status--revoked {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.card-body {
  margin-top: 14px;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: #4b5563;
}

.med-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.med-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.med-dot {
  margin-top: 6px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #4f46e5;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.3);
}

.med-text {
  display: flex;
  flex-direction: column;
}

.med-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.med-dosage {
  font-size: 0.82rem;
  color: #6b7280;
}
/*responsive*/

@media (max-width: 768px) {
  .card-inner {
    padding: 14px 16px 14px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .meta {
    width: 100%;
    justify-content: space-between;
  }

  .date {
    text-align: left;
  }
}
</style>

