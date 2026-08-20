if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Hide button by default
installBtn.hidden = true;

// Show only when install is available
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

// Hide after installation
window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
  deferredPrompt = null;
});

// Hide when running as an installed app
if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  installBtn.hidden = true;
}

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    installBtn.hidden = true;
  }

  deferredPrompt = null;
});
