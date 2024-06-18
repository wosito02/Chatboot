const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [];

async function query(data) {
  const response = await fetch(
    "https://www.stack-inference.com/run_deployed_flow?flow_id=65cb00de5fe58a1b9e96cf2a&org=46e433c1-aefd-4b55-bdcf-791f11e09a60",
    {
      headers: {
        Authorization: "Bearer b81a513a-0e33-4bed-a78b-8352786cfc6f",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "img/bot-conversacional.png";
const PERSON_IMG = "img/user-conversacional.png";
const BOT_NAME = "DatBass";
const PERSON_NAME = "Usuario";

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value.trim();
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(msgText); // Pasa el mensaje del usuario a botResponse
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(userMsg) {
  // Realiza la llamada a la API con el mensaje del usuario
  query({ "in-0": userMsg, user_id: "<USER or Conversation ID>" })
    .then((response) => {
      // Extrae la respuesta de la API
      const botMsg = response["out-0"];

      // Agrega la respuesta del bot al chat
      if (botMsg !== userMsg) {
        // Verifica que la respuesta no sea igual al mensaje del usuario
        appendMessage(BOT_NAME, BOT_IMG, "left", botMsg);
      }
    })
    .catch((error) => {
      console.error("Error al llamar a la API:", error);
    });
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Mensajes de tiempo actualizado
function updateMessageTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  // Agrega ceros delante de los números menores a 10
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var timeString = hours + ":" + minutes;
  document.getElementById("current-time").textContent = timeString;
}

// Llama a la función para actualizar la hora inicialmente
updateMessageTime();

// Actualiza la hora cada minuto
setInterval(updateMessageTime, 60000);