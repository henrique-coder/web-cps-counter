<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  cps: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'normal' }
})

const formattedCPS = computed(() => props.cps.toFixed(1))
const formattedMax = computed(() => props.max.toFixed(1))
</script>

<template>
  <div class="counter-card" :class="[`variant-${variant}`, `size-${size}`]">
    <div class="cps-value">
      <span class="number">{{ formattedCPS }}</span>
      <span class="unit">CPS</span>
    </div>
    <div class="label">{{ label }}</div>
    <div class="max-value">
      <span class="max-label">MAX</span>
      <span class="max-number">{{ formattedMax }}</span>
    </div>
  </div>
</template>

<style scoped>
.counter-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all var(--transition);
  min-height: 160px;
}

.counter-card:active {
  background: var(--bg-hover);
  transform: scale(0.98);
}

.cps-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.number {
  font-size: 3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  line-height: 1;
}

.unit {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.max-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.max-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--accent-red);
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.max-number {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-red);
  font-variant-numeric: tabular-nums;
}

.size-large .number { font-size: 4rem; }
.size-large { min-height: 180px; }
.variant-total { background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%); }

@media (max-width: 600px) {
  .counter-card { padding: 1.25rem; min-height: 140px; }
  .number { font-size: 2.5rem; }
  .size-large .number { font-size: 3rem; }
  .size-large { min-height: 160px; }
}
</style>
