const clickWindows = {
    left: [],
    right: [],
    scroll: []
};

const scrollEvents = [];
const WINDOW_SIZE = 1000;

function calculateCPS(buttonClicks) {
    const now = performance.now();
    while (buttonClicks.length > 0 && now - buttonClicks[0] > WINDOW_SIZE) {
        buttonClicks.shift();
    }
    return buttonClicks.length;
}

function calculateScrollSpeed() {
    const now = performance.now();
    while (scrollEvents.length > 0 && now - scrollEvents[0].timestamp > 100) {
        scrollEvents.shift();
    }

    if (scrollEvents.length < 2) return 0;

    const totalDelta = scrollEvents.reduce((sum, event) => sum + Math.abs(event.delta), 0);
    return Math.round(totalDelta * (1000 / 100));
}

document.addEventListener('mousedown', (event) => {
    const timestamp = performance.now();
    if (event.button === 0) {
        clickWindows.left.push(timestamp);
    } else if (event.button === 2) {
        clickWindows.right.push(timestamp);
    } else if (event.button === 1) {
        clickWindows.scroll.push(timestamp);
    }
}, { passive: true });

let lastScrollDelta = 0;
document.addEventListener('wheel', (event) => {
    const timestamp = performance.now();
    clickWindows.scroll.push(timestamp);

    scrollEvents.push({
        timestamp: timestamp,
        delta: event.deltaY
    });

    lastScrollDelta = event.deltaY;
}, { passive: true });

function updateDisplay() {
    const leftCPS = calculateCPS(clickWindows.left);
    const rightCPS = calculateCPS(clickWindows.right);
    const scrollCPS = calculateCPS(clickWindows.scroll);
    const totalCPS = leftCPS + rightCPS;
    const scrollSpeed = calculateScrollSpeed();

    document.getElementById('left-counter').innerText = leftCPS.toFixed(1) + ' CPS';
    document.getElementById('right-counter').innerText = rightCPS.toFixed(1) + ' CPS';
    document.getElementById('total-counter').innerText = totalCPS.toFixed(1) + ' CPS';
    document.getElementById('scroll-counter').innerText = scrollCPS.toFixed(1) + ' CPS';
    document.getElementById('scroll-speed').innerText = scrollSpeed + ' px/s';

    const directionElement = document.getElementById('scroll-direction');
    if (lastScrollDelta > 0) {
        directionElement.innerText = '↓';
        directionElement.style.color = '#ff4a4a';
    } else if (lastScrollDelta < 0) {
        directionElement.innerText = '↑';
        directionElement.style.color = '#4aff4a';
    } else {
        directionElement.innerText = '―';
        directionElement.style.color = '#666666';
    }

    requestAnimationFrame(updateDisplay);
}

requestAnimationFrame(updateDisplay);
