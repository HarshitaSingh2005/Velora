// Select all buttons
const buttons = document.querySelectorAll(".recommend-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", async () => {
    const coffee = btn.parentElement.dataset.coffee;
    const recommendationDiv = document.getElementById("recommendation");

    recommendationDiv.innerText = "Loading recommendation...";

    try {
      const response = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coffee })
      });

      const data = await response.json();
      recommendationDiv.innerText = `AI Suggestion for ${coffee}: ${data.recommendation}`;
    } catch (err) {
      console.error(err);
      recommendationDiv.innerText = "Error getting recommendation!";
    }
  });
});
