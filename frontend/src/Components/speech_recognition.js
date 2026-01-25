// utils/speechRecognition.js
let recognition = null;
let isListening = false;

export function initSpeechRecognition(lang = "en-US") {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
    return null;
  }

  recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = true;      // keep listening until stopped
  recognition.interimResults = true;  // show partial results

  recognition.onend = () => {
    // Reset flag when recognition naturally ends
    isListening = false;
    console.log("Speech recognition ended");
  };

  return recognition;
}

export function startSpeechRecognition(onResult, onError) {
  console.log("start speech rec requested");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech recognition not supported.");
    return;
  }

  // If already running, stop and wait before restarting
  if (isListening) {
    console.warn("Already running, stopping first...");
    stopSpeechRecognition();

    setTimeout(() => {
      startSpeechRecognition(onResult, onError); // retry after delay
    }, 300); // 300ms delay
    return;
  }

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onend = () => {
      isListening = false;
      console.log("Speech recognition ended");
    };
  }

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
    isListening = false;
    console.log("Speech recognition error:", event.error);
  };

  try {
    recognition.start();
    isListening = true;
    console.log("Speech recognition started");
  } catch (err) {
    console.error("Recognition start failed:", err);
    isListening = false;
  }
}



// export function startSpeechRecognition(onResult, onError) {
//   console.log('start speech rec stated ======================================================');
  
//   if (!recognition) {
//     recognition = initSpeechRecognition();
//   }

//   if (isListening) {
//     console.warn("Speech recognition already running");
//     return;
//   }

//   recognition.onresult = (event) => {
//     const transcript = event.results[event.results.length - 1][0].transcript;
//     if (onResult) onResult(transcript);
//   };

//   recognition.onerror = (event) => {
//     if (onError) onError(event.error);
//     isListening = false; // reset on error
//   };

//   recognition.start();
//   isListening = true;
//   console.log("Speech recognition started");
// }

export function isSpeechRecognitionRunning() {
  return isListening;
}


export function stopSpeechRecognition() {
  if (recognition && isListening) {
    recognition.stop();
    isListening = false;
    console.log("Speech recognition stopped");
  }
}
