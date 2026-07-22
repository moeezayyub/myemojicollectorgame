if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../gamesw.js");
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

function isRunningStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: window-controls-overlay)").matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith("android-app://")
  );
}

// Hide button initially
installBtn.hidden = true;

// Hide immediately if already running as installed app
if (isRunningStandalone()) {
  installBtn.hidden = true;
} else {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
}

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  deferredPrompt = null;
  installBtn.hidden = true;

  console.log("Install result:", outcome);
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installBtn.hidden = true;
  console.log("App Installed");
});
