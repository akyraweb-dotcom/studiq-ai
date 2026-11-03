const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    app: "STUDIQ",
    message: "STUDIQ server is running!"
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "STUDIQ",
    tagline: "Smart Student Intelligence",
    features: [
      "Photo to Video",
      "Text to Video",
      "AI Teacher",
      "Doubt Solver",
      "Telugu and English"
    ]
  });
});

app.post("/api/lesson", (req, res) => {
  const {
    topic,
    studentClass,
    language,
    duration,
    mode,
    style
  } = req.body || {};

  if (
    !topic ||
    !studentClass ||
    !language ||
    !duration
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all lesson details."
    });
  }

  if (String(topic).length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Topic is too long."
    });
  }

  res.json({
    success: true,
    message: "Your STUDIQ lesson request was received!",
    lesson: {
      topic,
      studentClass,
      language,
      duration,
      mode: mode || "text",
      style: style || "automatic",
      status: "pending"
    }
  });
});

app.listen(PORT, () => {
  console.log(`STUDIQ running on port ${PORT}`);
});
