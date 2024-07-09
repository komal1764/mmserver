const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());

const messages = [
  "It takes courage to grow up and become who you really are.",
  "Your self-worth is determined by you. You don't have to depend on someone telling you who you are.",
  "Opportunity is missed by most people because it is dressed in overalls and looks like work.",
  "Setting goals is the first step in turning the invisible into the visible.",
  "A witty woman is a treasure; a witty beauty is a power.",
  "The most difficult thing is the decision to act; the rest is merely tenacity.",
  "Education is the most powerful weapon which you can use to change the world."
];

app.get("/messages", (req, res) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  res.json({ msg: messages[randomIndex] });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
