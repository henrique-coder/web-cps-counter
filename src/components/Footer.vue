<script setup>
import { ref } from 'vue'

const repoUrl = 'https://github.com/henrique-coder/web-cps-counter'
const isHovered = ref(false)
</script>

<template>
  <footer class="footer">
    <div class="github-wrapper">
      <a
        :href="repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <img src="/icons/github.svg" alt="GitHub" class="github-icon" />
      </a>
      <Transition name="tooltip">
        <span v-if="isHovered" class="tooltip">View on GitHub</span>
      </Transition>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.github-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.github-icon {
  width: 24px;
  height: 24px;
  opacity: 0.5;
  transition: opacity var(--transition);
}

.github-link:hover .github-icon {
  opacity: 0.9;
}

.tooltip {
  position: absolute;
  top: calc(100% + 0.5rem);
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
  transform: translateY(-4px);
}

@media (max-width: 600px) {
  .footer {
    padding: 0.75rem;
  }

  .tooltip {
    display: none;
  }
}
</style>
