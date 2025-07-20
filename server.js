const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const translate = require("@vitalets/google-translate-api");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const persianToFingilish = (text) => {
  const map = {
    "ا": "a", "آ": "aa", "ب": "b", "پ": "p", "ت": "t", "ث": "s", "ج": "j",
    "چ": "ch", "ح": "h", "خ": "kh", "د": "d", "ذ": "z", "ر": "r", "ز": "z",
    "ژ": "zh", "س": "s", "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z",
    "ع": "a", "غ": "gh", "ف": "f", "ق": "gh", "ک": "k", "گ": "g", "ل": "l",
    "م": "m", "ن": "n", "و": "v", "ه": "h", "ی": "y", "ء": "", "ٔ": "", "‌": " ",
  };

  return text
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .replace(/ +/g, " ");
};

app.post("/translate", async (req, res) => {
  try {
    const englishText = req.body.text;
    const result = await translate(englishText, { to: "fa" });
    const persian = result.text;
    const fingilish = persianToFingilish(persian);
    res.json({ persian, fingilish });
  } catch (e) {
    res.status(500).json({ error: "Translation failed", details: e.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
