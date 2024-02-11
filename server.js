const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/ask-gpt", async (req, res) => {
  try {
    const { message } = req.body;

    // Make API call to GPT-3
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // 
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from GPT");
    }

    const data = await response.json();
    const botMessage = data.choices[0].text.trim();
    res.json({ message: botMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get response from GPT" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
