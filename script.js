const clickWindows = {
	left: [],
	right: [],
	scroll: []
};

const scrollEvents = [];
const WINDOW_SIZE = 1000;

const maxScores = {
	left: parseFloat(localStorage.getItem('maxLeft') || '0'),
	right: parseFloat(localStorage.getItem('maxRight') || '0'),
	scroll: parseFloat(localStorage.getItem('maxScroll') || '0'),
	total: parseFloat(localStorage.getItem('maxTotal') || '0')
};

function updateMax(type, value) {
	if (value > maxScores[type]) {
		maxScores[type] = value;
		localStorage.setItem(`max${type.charAt(0).toUpperCase() + type.slice(1)}`, value.toString());
		document.getElementById(`${type}-max`).textContent = value.toFixed(1);
	}
}

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
}, {
	passive: true
});

let lastScrollDelta = 0;
document.addEventListener('wheel', (event) => {
	const timestamp = performance.now();
	clickWindows.scroll.push(timestamp);

	scrollEvents.push({
		timestamp: timestamp,
		delta: event.deltaY
	});

	lastScrollDelta = event.deltaY;
}, {
	passive: true
});

document.getElementById('left-max').textContent = maxScores.left.toFixed(1);
document.getElementById('right-max').textContent = maxScores.right.toFixed(1);
document.getElementById('scroll-max').textContent = maxScores.scroll.toFixed(1);
document.getElementById('total-max').textContent = maxScores.total.toFixed(1);

async function captureScreen() {
	try {
		const captureButton = document.getElementById('capture-button');
		captureButton.style.opacity = '0';

		const canvas = await html2canvas(document.body, {
			backgroundColor: '#111111',
			scale: 2,
			logging: false,
			allowTaint: true,
			useCORS: true
		});

		canvas.toBlob(async (blob) => {
			try {
				const data = [new ClipboardItem({
					'image/png': blob
				})];
				await navigator.clipboard.write(data);
				captureButton.style.opacity = '1';
				captureButton.classList.add('success');
				setTimeout(() => {
					captureButton.classList.remove('success');
				}, 2000);
			} catch (err) {
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'cps-record.png';
				a.click();
				URL.revokeObjectURL(url);
				captureButton.style.opacity = '1';
			}
		}, 'image/png');

	} catch (err) {
		console.error('Failed to capture screenshot:', err);
		captureButton.style.opacity = '1';
	}
}

document.getElementById('capture-button').addEventListener('click', captureScreen);

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

	updateMax('left', leftCPS);
	updateMax('right', rightCPS);
	updateMax('scroll', scrollCPS);
	updateMax('total', totalCPS);

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
