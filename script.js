const clickWindows = {
    left: [],
    right: []
};

const WINDOW_SIZE = 1000;

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
    const rightCPS = calculateCPS(clickWindows.right);
    const totalCPS = leftCPS + rightCPS;

    document.getElementById('left-counter').innerText = leftCPS.toFixed(1) + ' CPS';
    document.getElementById('right-counter').innerText = rightCPS.toFixed(1) + ' CPS';
    document.getElementById('total-counter').innerText = totalCPS.toFixed(1) + ' CPS';

    requestAnimationFrame(updateDisplay);
}

requestAnimationFrame(updateDisplay);
