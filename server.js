// Import packages
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Velora Coffee AI server is running!");
});

// AI Recommendation route
app.post("/recommend", async (req, res) => {
  const { coffee } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful coffee recommendation assistant." },
        { role: "user", content: `Give a recommendation for ${coffee} and a snack pairing.` }
      ],
      max_tokens: 100,
    });

    res.json({ recommendation: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to OpenAI API");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
