<script setup>
import { computed } from 'vue'
import { useCPS } from './composables/useCPS'
import { useScreenshot } from './composables/useScreenshot'
import CounterCard from './components/CounterCard.vue'
import ScrollCard from './components/ScrollCard.vue'
import ActionButtons from './components/ActionButtons.vue'
import Footer from './components/Footer.vue'

const { current, max, lastScrollDelta, resetMax } = useCPS()
const { isCapturing, captureSuccess, captureScreen } = useScreenshot()

const scrollDirection = computed(() => {
  if (lastScrollDelta.value > 0) return 'down'
  if (lastScrollDelta.value < 0) return 'up'
  return 'neutral'
})

function handleCapture() {
  captureScreen({
    left: current.left,
    right: current.right,
    scroll: current.scroll,
    total: current.total,
    maxLeft: max.left,
    maxRight: max.right,
    maxScroll: max.scroll,
    maxTotal: max.total
  })
}
</script>

<template>
  <main class="app">
    <div class="counter-grid">
      <CounterCard
        label="Left Click"
        :cps="current.left"
        :max="max.left"
        variant="left"
      />

      <div class="center-section">
        <CounterCard
          label="Total CPS"
          :cps="current.total"
          :max="max.total"
          variant="total"
          size="large"
        />

        <ScrollCard
          :cps="current.scroll"
          :max="max.scroll"
          :speed="current.scrollSpeed"
          :direction="scrollDirection"
        />
      </div>

      <CounterCard
        label="Right Click"
        :cps="current.right"
        :max="max.right"
        variant="right"
      />
    </div>

    <ActionButtons
      :is-capturing="isCapturing"
      :capture-success="captureSuccess"
      @capture="handleCapture"
      @reset="resetMax"
    />

    <Footer />
  </main>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.counter-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  width: 100%;
  align-items: stretch;
}

.center-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 280px;
}

@media (max-width: 900px) {
  .counter-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .center-section {
    grid-column: 1 / -1;
    grid-row: 1;
    flex-direction: row;
    min-width: unset;
  }

  .center-section > :first-child {
    flex: 1.5;
  }

  .center-section > :last-child {
    flex: 1;
  }
}

@media (max-width: 600px) {
  .app {
    padding: 0.75rem;
    gap: 0.75rem;
    justify-content: flex-start;
    padding-top: 2rem;
  }

  .counter-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .center-section {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
