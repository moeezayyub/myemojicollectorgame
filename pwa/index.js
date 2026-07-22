if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../gamesw.js");
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Hide the button by default
installBtn.hidden = true;

// If the app is already running as an installed PWA, keep it hidden.
if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  installBtn.hidden = true;
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  // Don't show the button if already running as an installed app.
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  ) {
    return;
  }

  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;
  console.log(outcome);

  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installBtn.hidden = true;
  console.log("App installed");
});
