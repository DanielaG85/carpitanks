// Fecha objetivo (19 de junio a las 00:00)
const fechaObjetivo = new Date("June 25, 2025 00:00:00").getTime();


const contador = document.getElementById("contador");

const intervalo = setInterval(() => {
  const ahora = new Date().getTime();
  const tiempoRestante = fechaObjetivo - ahora;

  if (tiempoRestante <= 0) {
    clearInterval(intervalo);
    contador.innerHTML = "¡La demo ya está disponible!";
    return;
  }

  const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  contador.innerHTML = `⏳ ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);
