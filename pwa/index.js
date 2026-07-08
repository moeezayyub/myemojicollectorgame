if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../gamesw.js");
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Hide button by default
installBtn.hidden = true;

// Hide if app is already running as an installed PWA
if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  installBtn.hidden = true;
}

// Show install button only when install prompt is available
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;
  installBtn.hidden = false;
});

// Install button click
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  console.log(outcome);

  deferredPrompt = null;
  installBtn.hidden = true;
});

// Hide after successful installation
window.addEventListener("appinstalled", () => {
  console.log("PWA installed");

  deferredPrompt = null;
  installBtn.hidden = true;
});