const dino = document.querySelector(".dino");
const background = document.querySelector("div");

let isGameOver = false;
let pulando = false;
let position = 0;

function espaçoPressionado(event) {
  if (event.keyCode === 32) {
    if (!pulando) {
      pular();
    }
  }
}

function pular() {
  pulando = true;

  let intervaloSubindo = setInterval(() => {
    if (position >= 150) {
      clearInterval(intervaloSubindo);

      let intervaloDescendo = setInterval(() => {
        if (position <= 0) {
          clearInterval(intervaloDescendo);
          pulando = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function criandoCactus() {
  const cactus = document.createElement("div");
  let positionCactus = 1000;
  let tempoAleatorio = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = positionCactus + "px";

  let intervaloCactus = setInterval(() => {
    if (positionCactus < -60) {
      // Saiu da tela
      clearInterval(intervaloCactus);
      background.removeChild(cactus);
    } else if (positionCactus > 0 && positionCactus < 60 && position < 60) {
      // Game Over
      clearInterval(intervaloCactus);
      isGameOver = true;
      document.body.innerHTML = '<h1 class = "game-over"> Fim de Jogo</h1>';
    } else {
      positionCactus -= 10;
      cactus.style.left = positionCactus + "px";
    }
  }, 20);
  setTimeout(criandoCactus, tempoAleatorio);
}

criandoCactus();

document.addEventListener("keyup", espaçoPressionado);
