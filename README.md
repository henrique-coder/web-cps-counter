<div align="center">
  <img src="public/logo.svg" alt="CPS Counter" width="80" height="80">
  <h1>CPS Counter</h1>
  <p>A modern, fast, and accurate clicks per second counter</p>

  <p>
    <img src="https://img.shields.io/github/created-at/henrique-coder/web-cps-counter?style=flat-square&logoColor=white&labelColor=0a0a0a&color=3b82f6" alt="Created At">
    <img src="https://img.shields.io/github/last-commit/henrique-coder/web-cps-counter?style=flat-square&logoColor=white&labelColor=0a0a0a&color=22c55e" alt="Last Commit">
    <img src="https://img.shields.io/github/license/henrique-coder/web-cps-counter?style=flat-square&logoColor=white&labelColor=0a0a0a&color=ef4444" alt="License">
  </p>
</div>

## Features

- Real-time CPS tracking for left click, right click, and scroll
- Maximum scores saved locally in your browser (localStorage)
- Share your best scores as a beautiful image (Canvas API)
- Fully responsive for all devices
- No external tracking or analytics
- Fast and lightweight (~5KB bundle)

## Tech Stack

- [Astro](https://astro.build/) - Static site generator with zero JavaScript by default
- [TypeScript](https://www.typescriptlang.org/) - Type-safe scripting
- Modern CSS with CSS Variables for theming
- localStorage for persistent score data
- Native Canvas API for image generation

## Project Structure

```
src/
├── components/
│   ├── CPSCounter.astro     # Main CPS tracking logic
│   ├── CounterCard.astro    # Reusable counter display
│   ├── ScrollCard.astro     # Scroll tracking display
│   ├── ActionButtons.astro  # Share and reset buttons
│   └── Footer.astro         # GitHub link with tooltip
├── layouts/
│   └── Layout.astro         # Base HTML layout with global styles
└── pages/
    └── index.astro          # Main entry page
public/
├── logo.svg                 # App logo
├── github_logo.svg          # GitHub icon for footer
├── favicon.ico              # Browser favicon
└── site.webmanifest         # PWA manifest
```

## Getting Started

```bash
git clone https://github.com/henrique-coder/web-cps-counter.git
cd web-cps-counter
npm install
npm run dev
```

## Build

```bash
npm run build     # Generate static files in dist/
npm run preview   # Preview production build locally
```

## How It Works

1. **CPS Calculation**: Uses a 1-second sliding window to track clicks via `performance.now()` timestamps
2. **Score Persistence**: Max scores are stored in localStorage with key `cps-counter-max-scores`
3. **Image Sharing**: Canvas API draws a custom image with scores, copied to clipboard or downloaded
4. **Interactive Exclusion**: Buttons and links are excluded from click counting via `isInteractiveElement()` check

## Contributing

Contributions are welcome! Feel free to [open an issue](https://github.com/henrique-coder/web-cps-counter/issues/new) or submit a pull request.

## License

[GNU General Public License v3.0](LICENSE)
