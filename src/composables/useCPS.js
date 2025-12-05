import { ref, reactive, onMounted, onUnmounted } from "vue";

const WINDOW_SIZE = 1000;
const STORAGE_KEY = "cps-counter-max-scores";

export function useCPS() {
  const clickWindows = reactive({
    left: [],
    right: [],
    scroll: [],
  });

  const scrollEvents = reactive([]);
  const lastScrollDelta = ref(0);

  const current = reactive({
    left: 0,
    right: 0,
    scroll: 0,
    total: 0,
    scrollSpeed: 0,
  });

  const max = reactive(loadMaxScores());

  function loadMaxScores() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { left: 0, right: 0, scroll: 0, total: 0 };
  }

  function saveMaxScores() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(max));
    } catch {}
  }

  function updateMax(type, value) {
    if (value > max[type]) {
      max[type] = parseFloat(value.toFixed(1));
      saveMaxScores();
    }
  }

  function calculateCPS(clicks) {
    const now = performance.now();
    while (clicks.length > 0 && now - clicks[0] > WINDOW_SIZE) {
      clicks.shift();
    }
    return clicks.length;
  }

  function calculateScrollSpeed() {
    const now = performance.now();
    while (scrollEvents.length > 0 && now - scrollEvents[0].timestamp > 100) {
      scrollEvents.shift();
    }
    if (scrollEvents.length < 2) return 0;
    const totalDelta = scrollEvents.reduce(
      (sum, event) => sum + Math.abs(event.delta),
      0,
    );
    return Math.round(totalDelta * (1000 / 100));
  }

  function isInteractiveElement(element) {
    if (!element) return false;
    const tag = element.tagName?.toLowerCase();
    if (tag === "button" || tag === "a") return true;
    if (element.closest("button, a, .action-buttons, .footer")) return true;
    return false;
  }

  function handleMouseDown(event) {
    if (isInteractiveElement(event.target)) return;
    const timestamp = performance.now();
    if (event.button === 0) {
      clickWindows.left.push(timestamp);
    } else if (event.button === 2) {
      clickWindows.right.push(timestamp);
    } else if (event.button === 1) {
      clickWindows.scroll.push(timestamp);
    }
  }

  function handleWheel(event) {
    const timestamp = performance.now();
    clickWindows.scroll.push(timestamp);
    scrollEvents.push({ timestamp, delta: event.deltaY });
    lastScrollDelta.value = event.deltaY;
  }

  let animationId = null;

  function updateDisplay() {
    current.left = calculateCPS(clickWindows.left);
    current.right = calculateCPS(clickWindows.right);
    current.scroll = calculateCPS(clickWindows.scroll);
    current.total = current.left + current.right;
    current.scrollSpeed = calculateScrollSpeed();

    updateMax("left", current.left);
    updateMax("right", current.right);
    updateMax("scroll", current.scroll);
    updateMax("total", current.total);

    animationId = requestAnimationFrame(updateDisplay);
  }

  function resetMax() {
    max.left = 0;
    max.right = 0;
    max.scroll = 0;
    max.total = 0;
    saveMaxScores();
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("wheel", handleWheel, { passive: true });
    animationId = requestAnimationFrame(updateDisplay);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("wheel", handleWheel);
    if (animationId) cancelAnimationFrame(animationId);
  });

  return {
    current,
    max,
    lastScrollDelta,
    resetMax,
  };
}
