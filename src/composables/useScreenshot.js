import { ref } from "vue";

export function useScreenshot() {
  const isCapturing = ref(false);
  const captureSuccess = ref(false);

  async function captureScreen(scores) {
    if (isCapturing.value) return;
    isCapturing.value = true;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scale = 2;
      const width = 600;
      const height = 360;

      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f0f0f");
      gradient.addColorStop(1, "#0a0a0a");

      const radius = 24;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.font = "600 24px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("CPS Counter", width / 2, 48);

      const accentGradient = ctx.createLinearGradient(
        width / 2 - 60,
        80,
        width / 2 + 60,
        140,
      );
      accentGradient.addColorStop(0, "#3b82f6");
      accentGradient.addColorStop(1, "#60a5fa");

      ctx.font = "700 56px Inter, system-ui, sans-serif";
      ctx.fillStyle = accentGradient;
      ctx.fillText(scores.maxTotal.toFixed(1), width / 2, 115);

      ctx.font = "500 12px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#666666";
      ctx.fillText("BEST TOTAL CPS", width / 2, 140);

      const boxY = 175;
      const boxHeight = 100;
      const boxWidth = 160;
      const gap = 24;
      const startX = (width - (boxWidth * 3 + gap * 2)) / 2;

      const boxes = [
        { label: "LEFT CLICK", value: scores.maxLeft, color: "#22c55e" },
        { label: "SCROLL", value: scores.maxScroll, color: "#3b82f6" },
        { label: "RIGHT CLICK", value: scores.maxRight, color: "#ef4444" },
      ];

      boxes.forEach((box, i) => {
        const x = startX + i * (boxWidth + gap);

        ctx.beginPath();
        const r = 16;
        ctx.moveTo(x + r, boxY);
        ctx.lineTo(x + boxWidth - r, boxY);
        ctx.quadraticCurveTo(x + boxWidth, boxY, x + boxWidth, boxY + r);
        ctx.lineTo(x + boxWidth, boxY + boxHeight - r);
        ctx.quadraticCurveTo(
          x + boxWidth,
          boxY + boxHeight,
          x + boxWidth - r,
          boxY + boxHeight,
        );
        ctx.lineTo(x + r, boxY + boxHeight);
        ctx.quadraticCurveTo(x, boxY + boxHeight, x, boxY + boxHeight - r);
        ctx.lineTo(x, boxY + r);
        ctx.quadraticCurveTo(x, boxY, x + r, boxY);
        ctx.closePath();
        ctx.fillStyle = "#161616";
        ctx.fill();

        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "700 32px Inter, system-ui, sans-serif";
        ctx.fillStyle = box.color;
        ctx.textAlign = "center";
        ctx.fillText(box.value.toFixed(1), x + boxWidth / 2, boxY + 45);

        ctx.font = "500 11px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText(box.label, x + boxWidth / 2, boxY + 70);

        ctx.font = "500 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#444444";
        ctx.fillText("BEST", x + boxWidth / 2, boxY + 88);
      });

      ctx.font = "500 11px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#444444";
      ctx.textAlign = "center";
      ctx.fillText(
        "github.com/henrique-coder/web-cps-counter",
        width / 2,
        height - 20,
      );

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        captureSuccess.value = true;
      } catch {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cps-record-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        captureSuccess.value = true;
      }

      setTimeout(() => {
        captureSuccess.value = false;
      }, 2000);
    } catch {
      captureSuccess.value = false;
    } finally {
      isCapturing.value = false;
    }
  }

  return {
    isCapturing,
    captureSuccess,
    captureScreen,
  };
}
