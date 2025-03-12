const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/Chat");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithGemini = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: "Message and userId are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    // Save chat to database
    const chat = new Chat({
      user: userId,
      messages: [
        { role: "user", content: message },
        { role: "assistant", content: reply },
      ],
    });

    await chat.save();

    res.json({ reply });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Error processing request" });
  }
};

module.exports = { chatWithGemini };
