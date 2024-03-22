let clicks = 0;
let startTime = Date.now();

document.addEventListener('mousedown', () => {
	clicks++;
});

setInterval(() => {
	const elapsedTime = (Date.now() - startTime) / 1000;
	const cps = clicks / elapsedTime;
	document.getElementById('cps-counter').innerText = cps.toFixed(1) + ' CPS';
}, 100);

setInterval(() => {
	if ((Date.now() - startTime) / 1000 > 2) {
		clicks = 0;
		startTime = Date.now();
	}
}, 2000);
