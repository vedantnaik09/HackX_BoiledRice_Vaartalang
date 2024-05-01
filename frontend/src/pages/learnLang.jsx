import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../assets/Home/home.css";
import "../pages/style/learnLang.css";
import sendBtn from "../assets/send.png";
import Mic from "../assets/microphone.png";

const LearnLang = () => {
  const [lang, setLang] = useState("Hindi"); // Default language set to Hindi
  const [userInput, setUserInput] = useState(""); // User input
  const [messages, setMessages] = useState([]); // Array to store messages
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Set default language to Hindi when component mounts
    localStorage.setItem("selectedLanguage", "Hindi");
  }, []);

  const handleChange = (e) => {
    setLang(e.target.value);
    localStorage.setItem("selectedLanguage", e.target.value);
  };

  const handleSubmitText = async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/learn_lang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: userInput,
          lang: localStorage.getItem("selectedLanguage"),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Transcript sent successfully");
        console.log(data);
        const newText = { text: data.message, sender: "ai" };
        setMessages([
          ...messages,
          { text: userInput, sender: "user" },
          newText,
        ]);
        console.log({ messages }); // Merge new AI replies with existing messages
        setUserInput(""); // Clear user input after sending
        speak(data.message); // Call speak function for the new AI message
      } else {
        throw new Error("Failed to send transcript");
      }
    } catch (err) {
      console.error("Error sending transcript:", err);
    }
  };

  const toggleRecording = () => {
    console.log(isRecording);
    if (!isRecording) {
      if (recognition) {
        recognition.start();
      }
      setIsRecording(true);
    } else {
      if (recognition) {
        recognition.stop();
      }
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      const recognitionInstance = new window.webkitSpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;

      recognitionInstance.lang = lang;

      recognitionInstance.onresult = (e) => {
        setUserInput((prevText) => prevText + e.results[0][0].transcript + " ");
        recognitionInstance.stop();
      };

      recognitionInstance.onerror = (e) => {
        console.log("error", e);
        recognitionInstance.stop();
      };

      recognitionInstance.onend = (e) => {
        console.log("ended", e);
        if (isRecording) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [lang, isRecording]);

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <Navbar />
      <div className=" flex flex-col">

        <div className="flex justify-between w-[85%] max-md:w-[90%]  mx-auto">

          <div className="big-heading text-white text-8xl max-lg:text-7xl  ">
            <h1 className="gradient-text max-md:text-6xl">Learning</h1>
            <h1 className="gradient-text max-md:text-6xl">{lang ? lang : "..."}</h1>
          </div>

          <div className="dropdown">
            <label htmlFor="language" className="text-white text-2xl max-md:text-xl">
              Select Language:{" "}
            </label>
            <select
              id="language"
              className="rounded-2xl  pl-14 pr-14 text-gray-600 max-md:block mx-auto max-md:mt-2"
              value={lang}
              onChange={handleChange}
            >
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

        </div>

        <div className="bottom-0 absolute w-full">
          <div className="ai flex max-md:h-12 justify-center">
            <div className="inp bg-white rounded-2xl mr-2 flex items-center justify-between w-[75%]">
              <input
                type="text"
                placeholder="Enter your text here"
                className="ml-4 w-full "
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="chatbtns w-fit flex justify-end pr-3 max-md:w-24">
                <button onClick={toggleRecording} className="mic max-md:w-12">
                  <img src={Mic} alt="" width="17px" />
                </button>
                <button onClick={handleSubmitText} className="text max-md:w-12">
                  <img src={sendBtn} alt="" width="17px" />
                </button>
              </div>
            </div>
            <div className="low flex justify-center text-white text-2xl">
              <div className="btns w-fit border p-3 rounded-2xl cursor-pointer flex">
                <button className="flex items-center justify-between max-md:text-xl">
                  Start Now
                </button>
              </div>
            </div>
          </div>
          <div className="learner text-white p-5 mx-auto w-[85%] text-center my-3 text-3xl">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "user-message" : "ai-message"
                }
              >
                {message.text}
              </div>
            ))}
            {/* {messages[0].sender === "ai" && (
                  <button onClick={() => handleSpeakQuestion(messages[0].text)}>Speak</button>
                )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnLang;
