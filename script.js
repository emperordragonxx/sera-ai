document.addEventListener("DOMContentLoaded", () => {

  const chat = document.getElementById("chat");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  // ---------------- VOICE ----------------
  let voices = [];

  function loadVoices() {
    voices = speechSynthesis.getVoices();
  }
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function speakCuteGirl(text) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);

    const girlVoice = voices.find(v =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("zira") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("google")
    );

    if (girlVoice) msg.voice = girlVoice;
    msg.pitch = 1.3;
    msg.rate = 0.95;

    speechSynthesis.speak(msg);
  }

  // ---------------- UI ----------------
  function addMessage(type, text) {
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  // ---------------- AI ----------------
  function aiReply(text) {
    let reply = "";

    text = text.toLowerCase();

    if (text.includes("sales")) {
      reply = "📈 Sales are growing, especially in the evening.";
    } else if (text.includes("predict")) {
      reply = "🔮 I predict around fifteen percent growth next month.";
    } else if (text.includes("risk")) {
      reply = "⚠️ There is a risk of overstocking on weekdays.";
    } else {
      reply = "😊 Ask me about sales, prediction, or risks.";
    }

    addMessage("ai", "💖 Sera: " + reply);
    speakCuteGirl(reply);
  }

  // ---------------- SEND ----------------
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", "You: " + text);
    input.value = "";

    setTimeout(() => aiReply(text), 500);
  }

  // Button click
  sendBtn.addEventListener("click", sendMessage);

  // ENTER key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Mic first interaction
  window.voiceAI = function () {
    speakCuteGirl("Hello! I am Sera AI. How can I help you today?");
  };

});