<script setup>
import { ref } from 'vue'

defineProps({
  isCapturing: {
    type: Boolean,
    default: false
  },
  captureSuccess: {
    type: Boolean,
    default: false
  }
})

defineEmits(['capture', 'reset'])

const captureHover = ref(false)
const resetHover = ref(false)
</script>

<template>
  <div class="action-buttons">
    <div class="btn-wrapper">
      <button
        class="action-btn capture-btn"
        :class="{ success: captureSuccess, capturing: isCapturing }"
        @click="$emit('capture')"
        @mouseenter="captureHover = true"
        @mouseleave="captureHover = false"
        :disabled="isCapturing"
      >
        <svg v-if="!captureSuccess" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
      <Transition name="tooltip">
        <span v-if="captureHover" class="tooltip">Share</span>
      </Transition>
    </div>

    <div class="btn-wrapper">
      <button
        class="action-btn reset-btn"
        @click="$emit('reset')"
        @mouseenter="resetHover = true"
        @mouseleave="resetHover = false"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
      </button>
      <Transition name="tooltip">
        <span v-if="resetHover" class="tooltip">Reset</span>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.action-buttons {
  position: fixed;
  bottom: 1.25rem;
  left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 100;
}

.btn-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.tooltip {
  position: absolute;
  left: calc(100% + 0.75rem);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--shadow);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  box-shadow: var(--shadow);
}

.action-btn:hover {
  background: var(--bg-hover);
  transform: scale(1.05);
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.capture-btn.success {
  background: var(--accent-green);
  border-color: var(--accent-green);
}

.capture-btn.capturing {
  animation: pulse 0.5s ease-in-out infinite;
}

.reset-btn:hover {
  color: var(--accent-red);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 600px) {
  .action-buttons {
    bottom: 1rem;
    left: 1rem;
    flex-direction: row;
  }

  .action-btn {
    width: 40px;
    height: 40px;
  }

  .tooltip {
    display: none;
  }
}
</style>
