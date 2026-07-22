if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../gamesw.js");
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;

  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const result = await deferredPrompt.userChoice;

  console.log(result.outcome);

  deferredPrompt = null;

  installBtn.hidden = true;
});
