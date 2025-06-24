import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHAQQWPzLac1QcgMpJyMCMfVpU68YeC4c",
  authDomain: "carpitanks-landing.firebaseapp.com",
  projectId: "carpitanks-landing",
  storageBucket: "carpitanks-landing.firebasestorage.app",
  messagingSenderId: "787792996150",
  appId: "1:787792996150:web:1099f16127dec21fe8b597"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Capturar elementos
const form = document.querySelector("#formulario-contacto");
const mensajeEnvio = document.getElementById("mensaje-envio");
const botonEnviar = form.querySelector("input[type='submit']");

let enviando = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (enviando) return;

  enviando = true;
  botonEnviar.disabled = true;
  botonEnviar.value = "Enviando...";

  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const mensaje = form.mensaje.value.trim();

  try {
    await addDoc(collection(db, "mensajes"), {
      nombre,
      correo,
      mensaje,
      timestamp: new Date()
    });

    mensajeEnvio.textContent = "¡Gracias por tu mensaje! 🐾";
    mensajeEnvio.className = "mensaje-envio mensaje-exito";
    form.reset();
  } catch (error) {
    mensajeEnvio.textContent = "Ocurrió un error al enviar el mensaje. Intentalo de nuevo.";
    mensajeEnvio.className = "mensaje-envio mensaje-error";
    console.error("Error:", error);
  } finally {
    enviando = false;
    botonEnviar.disabled = false;
    botonEnviar.value = "Enviar";

    setTimeout(() => {
      mensajeEnvio.textContent = "";
      mensajeEnvio.className = "mensaje-envio";
    }, 5000);
  }
});

//Función para las cards
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalExtra = document.getElementById("modal-extra");
const closeModal = document.getElementById("close-modal");

function mostrarDetallePersonaje(nombre, descripcion, imagenSrc, extraTexto) {
  modalTitle.textContent = nombre;
  modalDesc.innerHTML = descripcion
  .replace(/\|\|\|\|/g, "<br><br>") // primero el doble salto
  .replace(/\|\|/g, "<br>");        // luego los simples
  modalImage.src = imagenSrc;
  modalExtra.textContent = extraTexto;
  modal.style.display = "flex";
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ejemplo con una card
document.querySelectorAll(".card-personaje").forEach(card => {
  card.addEventListener("click", () => {
    const nombre = card.getAttribute("data-nombre");
    const descripcion = card.getAttribute("data-descripcion");
    const imagen = card.getAttribute("data-imagen");
    const extra = card.getAttribute("data-extra");

    mostrarDetallePersonaje(nombre, descripcion, imagen, extra);
  });
});





















// // Fecha objetivo (19 de junio a las 00:00)
// const fechaObjetivo = new Date("June 25, 2025 00:00:00").getTime();


// const contador = document.getElementById("contador");

// const intervalo = setInterval(() => {
//   const ahora = new Date().getTime();
//   const tiempoRestante = fechaObjetivo - ahora;

//   if (tiempoRestante <= 0) {
//     clearInterval(intervalo);
//     contador.innerHTML = "¡La demo ya está disponible!";
//     return;
//   }

//   const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
//   const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
//   const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

//   contador.innerHTML = `⏳ ${dias}d ${horas}h ${minutos}m ${segundos}s`;
// }, 1000);
