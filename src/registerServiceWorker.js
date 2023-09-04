/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered(registration) {
      console.log("Service worker has been registered.");
      // Comprueba si hay una nueva versión disponible en el servidor.
      registration.update();
    },
    updated(registration) {
      console.log("New content is available; please refresh.");
      // Activa la nueva versión del service worker.
      registration.waiting.postMessage({ action: "skipWaiting" });
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });

  // Escucha mensajes del service worker y fuerza la recarga cuando sea necesario.
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.action === "skipWaiting") {
      window.location.reload(true);
    }
  });
}
