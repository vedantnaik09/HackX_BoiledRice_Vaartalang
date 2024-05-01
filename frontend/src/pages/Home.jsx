// Home.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Mic from "../assets/microphone.png";
import Stop from "../assets/stop-button.png"
import '../assets/Home/home.css'
const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const handleChange = (e) => {
    console.log(e.target.value);
    localStorage.setItem("selectedLanguage", e.target.value);
    setSelectedLanguage(e.target.value);
  };
  const synthesis = window.speechSynthesis;
  let recognition;

  const toggleListening = () => {
    if (isListening) {
      console.log("Stopping listening...");
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognition = new window.webkitSpeechRecognition();
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Speech recognition started");
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          setTranscript(event.results[i][0].transcript);
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript); // Set final transcript instead of empty string
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
        // Ensure selectedLanguage is retrieved from state
        sendTranscript(selectedLanguage);
      };
      

      recognition.start();
    }
  };
  const sendTranscript = async (selectedLanguage) => {
    console.log(selectedLanguage); // Ensure selectedLanguage is not null
    try {
      const response = await fetch(
        `http://localhost:8001/api/translate_input_to_${selectedLanguage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: transcript }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Transcript sent successfully");
        console.log(data.message);
        speak(data.message);
      } else {
        throw new Error("Failed to send transcript");
      }
    } catch (err) {
      console.error("Error sending transcript:", err);
    }
  };
  function speak(text){
    console.log(text);
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <Navbar />
      <div className="w-3/4 container mx-auto border-2 border-[rgba(255,255,255,0.3)] h-[40rem] flex flex-col items-center justify-between">
        <div className="upper w-3/4">
          <div className="promo bg-[#1D101A] w-3/4 text-white mx-auto h-fit pl-2 pr-2 mt-3">
            <div className="carousel-container">
              <div className="text-carousel">
                <div className="text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Itaque quis fuga ex. Accusamus ipsa cumque officia
                  necessitatibus sed nobis deserunt?
                </div>
              </div>
            </div>
          </div>

          <div className="heading mt-4">
            <h1 className="animate-gradient-text text-5xl">
                  Multilingual <br />
            </h1>
            <h1 className="animate-gradient-text text-5xl">
               anything to anything solution.
            </h1>
          </div>
        </div>
        <div className="lower flex flex-col items-center pb-10">
          <div className="txt">
            <h1 className="text-white text-3xl">How can I help you?</h1>
          </div>
          <div className={`line ${isClicked ? "animate" : ""} mt-4`}>
            <div className={`highlight ${isClicked ? "shiny" : ""}`}></div>
          </div>
          <button
            href="#"
            className="icons border rounded-full p-4 mt-4 bg-transparent"
            onClick={toggleListening}
            style={{border:"2px solid white"}}
          >
            {isListening ? <img src={Stop} alt="" style={{ filter: "invert(1)" }} /> : <img src={Mic} alt="" style={{ filter: "invert(1)" }} />}
            <div>
              {/* <img src={Mic} alt="" style={{ filter: "invert(1)" }} /> */}
            </div>
          </button>
          {/* <button onClick={sendTranscript} disabled={!transcript}>
            Send Transcript
          </button> */}
          <div className="text-white">
            <h2 className="text-center">Select your preferred language:</h2>
            <label className="ml-2 mr-2">
              <input
                type="radio"
                value="english"
                checked={selectedLanguage === "english"}
                onChange={(e)=>{handleChange(e)}}
                className="ml-2 mr-2"
              />
              English
            </label>
            <label className="ml-2 mr-2">
              <input
                type="radio"
                value="hindi"
                checked={selectedLanguage === "hindi"}
                onChange={(e)=>{handleChange(e)}}
                className="ml-2 mr-2"
              />
              Hindi
            </label>
            <label className="ml-2 mr-2">
              <input
                type="radio"
                value="spanish"
                checked={selectedLanguage === "spanish"}
                onChange={(e)=>{handleChange(e)}}
                className="ml-2 mr-2"
              />
              Spanish
            </label>
          </div>
          <p>{transcript}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
