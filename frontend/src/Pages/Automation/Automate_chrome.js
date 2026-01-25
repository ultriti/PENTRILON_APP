import axios from "axios";
import { speak } from "../../Components/Util.speech";
import {
  startSpeechRecognition,
  stopSpeechRecognition,
} from "../../Components/speech_recognition.js";

import { isSpeechRecognitionRunning } from "../../Components/speech_recognition.js";




// search bar automation
const Search_Bar_auto = async () => {

  if (isSpeechRecognitionRunning()) {
    console.log("Speech recognition is active");
  } else {
    console.log("Not listening");
  }


  console.log("-------------------------> automation edge <--------------", isSpeechRecognitionRunning());


  // speak("What do you want to search?");

  return new Promise(async (resolve, reject) => {


    let spoken = false;
    speak("What do you want to search?");
    console.log("--------------------------------------------------------------------------------------------");
    console.log("Prompted user for search...");

    const data = { da: "fucku" };

    const sendAudio = async (maxRetries = 3) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const A2Text = await axios.post("http://127.0.0.1:8000/GetAudio_To_Text", data, { withCredentials: true });

        if (A2Text.status === 200) {
          if (String(A2Text.data.message) !== "none") {
            console.log("Recognized:", A2Text.data.message);

            const payload = {
              da: A2Text,
              Query: A2Text.data.message
            };

            const response = await axios.post("http://127.0.0.1:8000/Automate_browser", payload, { withCredentials: true });
            console.log(response.data.message);
            
            speak(response.data.message)
            return response.data;

          } else {
            console.log(`Attempt ${attempt}: got 'none', retrying...`);
          }
        }
      }
      throw new Error("Max retries reached without valid recognition");
    };
    sendAudio()

  });

};

export default Search_Bar_auto;
