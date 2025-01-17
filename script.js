const clickWindows = {
    left: [],
    right: []
};

const WINDOW_SIZE = 1000;
const UPDATE_RATE = 16;

function calculateCPS(buttonClicks) {
    const now = performance.now();
    while (buttonClicks.length > 0 && now - buttonClicks[0] > WINDOW_SIZE) {
        buttonClicks.shift();
    }
    return buttonClicks.length;
}

document.addEventListener('mousedown', (event) => {
    const timestamp = performance.now();
    if (event.button === 0) {
        clickWindows.left.push(timestamp);
    } else if (event.button === 2) {
        clickWindows.right.push(timestamp);
    }
}, { passive: true });

function updateDisplay() {
    const leftCPS = calculateCPS(clickWindows.left);
    const totalCPS = Math.max(leftCPS, 0);

    document.getElementById('cps-counter').innerText = totalCPS.toFixed(1) + ' CPS';
    requestAnimationFrame(updateDisplay);
}

requestAnimationFrame(updateDisplay);
