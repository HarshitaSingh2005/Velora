const sendBtn = document.getElementById("send-btn");
const userMessage = document.getElementById("user-message");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", async () => {
  const message = userMessage.value.trim();
  if (!message) return;

  // Display user message
  const userDiv = document.createElement("div");
  userDiv.style.textAlign = "right";
  userDiv.style.margin = "5px 0";
  userDiv.innerHTML = `<strong>You:</strong> ${message}`;
  chatBox.appendChild(userDiv);

  userMessage.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Display loading
  const loadingDiv = document.createElement("div");
  loadingDiv.innerHTML = "<em>AI is typing...</em>";
  chatBox.appendChild(loadingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coffee: message }) // sending user message to backend
    });

    const data = await response.json();
    loadingDiv.remove();

    const aiDiv = document.createElement("div");
    aiDiv.style.textAlign = "left";
    aiDiv.style.margin = "5px 0";
    aiDiv.innerHTML = `<strong>AI:</strong> ${data.recommendation}`;
    chatBox.appendChild(aiDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error(err);
    loadingDiv.innerText = "Error connecting to AI.";
  }
});
