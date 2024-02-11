document.addEventListener("DOMContentLoaded", function () {
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  sendBtn.addEventListener("click", function () {
    sendMessage();
  });

  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
      appendUserMessage(message);
      userInput.value = "";
      fetchMessageFromGPT(message);
    }
  }

  function appendUserMessage(message) {
    const userBubble = document.createElement("div");
    userBubble.classList.add("chat-bubble", "user");
    userBubble.innerHTML = `<span>${message}</span>`;
    chatWindow.appendChild(userBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  async function fetchMessageFromGPT(message) {
    try {
      const response = await fetch("/ask-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from GPT");
      }

      const data = await response.json();
      const botMessage = data.message;
      appendBotMessage(botMessage);
    } catch (error) {
      console.error("Error:", error);
      appendBotMessage("Sorry, something went wrong. Please try again later.");
    }
  }

  function appendBotMessage(message) {
    const botBubble = document.createElement("div");
    botBubble.classList.add("chat-bubble", "bot");
    botBubble.innerHTML = `<span class="bot-text">${message}</span>`;
    chatWindow.appendChild(botBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
