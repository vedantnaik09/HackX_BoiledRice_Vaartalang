// controller.js
require("dotenv").config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(req, res) {
  try {
    const prompt = req.query.prompt || " ";
    if (prompt) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(prompt);
      const response = await result.response;
      const text = response.text();
      res.status(200).json({ message: text });
      console.log(text);
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function runMultiModal(req, res) {
  try {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "What's different between these pictures?";

    const imageParts = [
      fileToGenerativePart("./image/got.jpeg", "image/jpeg"),
      fileToGenerativePart("./image/pj.jpeg", "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({ message: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function runChat(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "Hey can you act like a chatbot for a blockchain based software, that only answers to blockchain related questions?",
        },
        {
          role: "model",
          parts: "Okay Understood!",
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = req.query.msg;
    if (msg) {
      const result = await model.generateContentStream(msg);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      res.status(200).json({ message: text });
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function runEmbedding(req, res) {
  try {
    const text = req.query.text;
    if (req.query.text) {
      const model = genAI.getGenerativeModel({ model: "embedding-001" });
      const result = await model.embedContent(text);
      const embedding = result.embedding;
      console.log(embedding.values);
      res.status(200).json({ message: text });
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function runTextParameters(req, res) {
  try {
    let flag = true;
    const generationConfig = {
      stopSequences: [req.query.stopSequences],
      maxOutputTokens: req.query.maxOutputTokens,
      temperature: req.query.temperature,
      topP: req.query.topP,
      topK: req.query.topK,
    };
    const keys = Object.keys(generationConfig);
    // Iterate through all keys
    for (let key of keys) {
      // Check if the value corresponding to the key is missing or falsy
      if (!generationConfig[key]) {
        flag = false; // If any value is missing, return false
      }
    }
    if (flag === false) {
      res.status(400).json({ error: "Missing model parameters" });
    }
    const prompt = req.query.text;
    if (prompt && flag) {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig,
      });
      const result = await model.generateContentStream(prompt);
      const response = await result.response;
      const text = response.text();
      res.status(200).json({ message: text });
      console.log(text);
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function audioInputToEnglish(req, res) {
  try {
    let prompt = req.body.transcript || "";

    // Check if there is any transcript
    if (prompt.trim() !== "") {
      // Combine all the speaker's lines
      prompt = prompt
        .split("\n")
        .map((line) => line.trim())
        .join(" ");

      // Add instruction for translation
      prompt += " Translate the conversation to English";

      console.log(prompt);

      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(prompt);
      const response = await result.response;

      // Check if response is valid before accessing its properties
      if (response && response.text) {
        const text = await response.text(); // await here
        res.status(200).json({ message: text });
        console.log(text);
      } else {
        res.status(500).json({ error: "Invalid response" });
        console.log("Invalid response");
      }
    } else {
      res.status(400).json({ error: "No transcript provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

async function audioInputToHindi(req, res) {
  try {
    let prompt = req.body.transcript || "";
    if (prompt.trim() !== "") {
      // Combine all the speaker's lines
      prompt = prompt
        .split("\n")
        .map((line) => line.trim())
        .join(" ");

      // Add instruction for translation
      prompt += " Translate the conversation to Hindi";

      console.log(prompt);

      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(prompt);
      const response = await result.response;

      // Check if response is valid before accessing its properties
      if (response && response.text) {
        const text = await response.text(); // await here
        res.status(200).json({ message: text });
        console.log(text);
      } else {
        res.status(500).json({ error: "Invalid response" });
        console.log("Invalid response");
      }
    } else {
      res.status(400).json({ error: "No transcript provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

async function audioInputToSpanish(req, res) {
  try {
    let prompt = req.body.transcript || "";
    if (prompt.trim() !== "") {
      // Combine all the speaker's lines
      prompt = prompt
        .split("\n")
        .map((line) => line.trim())
        .join(" ");

      // Add instruction for translation
      prompt += " Translate the conversation to Spanish";

      console.log(prompt);

      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(prompt);
      const response = await result.response;

      // Check if response is valid before accessing its properties
      if (response && response.text) {
        const text = await response.text(); // await here
        res.status(200).json({ message: text });
        console.log(text);
      } else {
        res.status(500).json({ error: "Invalid response" });
        console.log("Invalid response");
      }
    } else {
      res.status(400).json({ error: "No transcript provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

async function audioInputToMany(req, res) {
  try {
    const lang = req.body.lang;
    const prompt =
      " '"(req.body.transcript || " ") +
      `' Translate the given transcript to ${lang}`;
    console.log(prompt);
    if (prompt) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      if (prompt) {
        const result = await model.generateContentStream(prompt);
        const response = await result.response;
        // Log the response to see what it contains
        console.log(response);

        // Check if response is valid before accessing its properties
        if (response && response.text) {
          const text = response.text();
          res.status(200).json({ message: text });
          console.log(text);
        } else {
          res.status(500).json({ error: "Invalid response" });
          console.log("Invalid response");
        }
      }
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

async function learnLang(req, res) {
  let promptCount = 0;
  try {
    const lang = req.body.lang;
    let prompt = req.body.transcript || " ";
    console.log(prompt);

    if (prompt) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      if (prompt) {
        const result = await model.generateContentStream(
          prompt + ((promptCount <= 1) ?
            `\nI want to learn ${lang},`
            : ` `)
        );
        promptCount++;
        const response = await result.response;
        // Log the response to see what it contains
        console.log(response);

        // Check if response is valid before accessing its properties
        if (response && response.text) {
          const text = response.text().replace(/[^a-zA-Z\s]/g, '').replace(/[\[\(].*?[\]\)]/g, '');
          res.status(200).json({ message: text });
          console.log(text);
        } else {
          res.status(500).json({ error: "Invalid response" });
          console.log("Invalid response");
        }
      }
    } else {
      res.status(400).json({ error: "No prompt provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}


module.exports = {
  run,
  runMultiModal,
  runChat,
  runEmbedding,
  runTextParameters,
  audioInputToEnglish,
  audioInputToHindi,
  audioInputToSpanish,
  audioInputToMany,
  learnLang,
};
