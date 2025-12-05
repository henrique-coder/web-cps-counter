<script setup>
import { computed } from 'vue'

const props = defineProps({
  cps: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  direction: { type: String, default: 'neutral' }
})

const formattedCPS = computed(() => props.cps.toFixed(1))
const formattedMax = computed(() => props.max.toFixed(1))
const directionIcon = computed(() => ({ up: '↑', down: '↓' }[props.direction] || '―'))
</script>

<template>
  <div class="scroll-card">
    <div class="scroll-main">
      <div class="cps-value">
        <span class="number">{{ formattedCPS }}</span>
        <span class="unit">CPS</span>
      </div>
      <div class="scroll-direction" :class="direction">{{ directionIcon }}</div>
    </div>
    <div class="scroll-speed">{{ speed }} px/s</div>
    <div class="label">Scroll</div>
    <div class="max-value">
      <span class="max-label">MAX</span>
      <span class="max-number">{{ formattedMax }}</span>
    </div>
  </div>
</template>

<style scoped>
.scroll-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  transition: all var(--transition);
}

.scroll-main { display: flex; align-items: center; gap: 1rem; }
.cps-value { display: flex; align-items: baseline; gap: 0.375rem; }
.number { font-size: 2rem; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; line-height: 1; }
.unit { font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
.scroll-direction { font-size: 1.5rem; font-weight: 600; transition: color var(--transition); }
.scroll-direction.up { color: var(--accent-green); }
.scroll-direction.down { color: var(--accent-red); }
.scroll-direction.neutral { color: var(--text-muted); }
.scroll-speed { font-size: 0.875rem; font-weight: 500; color: var(--accent-blue); font-variant-numeric: tabular-nums; }
.label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
.max-value { display: flex; align-items: center; gap: 0.5rem; }
.max-label { font-size: 0.625rem; font-weight: 600; color: var(--accent-red); letter-spacing: 0.1em; opacity: 0.8; }
.max-number { font-size: 0.75rem; font-weight: 600; color: var(--accent-red); font-variant-numeric: tabular-nums; }

@media (max-width: 600px) {
  .scroll-card { padding: 1rem; }
  .number { font-size: 1.75rem; }
}
</style>
