// utils/speech.js
// export function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);

//   // timing / prosody
//   utterance.rate = 0.8;     // 0.1–10 (speed)
//   utterance.pitch = 0.6;    // 0–2
//   utterance.volume = 1;   // 0–1

//   // choose a specific voice
//   const voices = window.speechSynthesis.getVoices();
//   // const target = voices.find(v => v.lang === "en-US" && v.name.includes("Microsoft Guy Online (Natural)"));
//   // const target = voices.find(v => v.lang === "en-US" && v.name.includes("Microsoft David - English (United States)"));
//   // const target = voices.find(v => v.lang === "en-US" && v.name.includes("Microsoft Mark - English (United States)"));
//   const target = voices.find(v => v.lang === "en-US" && v.name.includes("Microsoft Ravi - English (India)"));
//   if (target) utterance.voice = target;

//   window.speechSynthesis.speak(utterance);
//   return true
// }
// Always attach the event listener first
// function loadVoices() {
//   const voices = window.speechSynthesis.getVoices();
//   console.log('voices:', voices);
// }

// // Some browsers (like Chrome) require this event
// window.speechSynthesis.onvoiceschanged = loadVoices;

// // Call once in case voices are already available
// loadVoices();

// Util.speech.js
export function speak_Info(text, onEnd) {
  const utterance = new SpeechSynthesisUtterance(text);

  // timing / prosody
  utterance.rate = 0.9;   // speed
  utterance.pitch = 0.1;  // pitch
  utterance.volume = 1;   // volume

  function setVoiceAndSpeak() {
    const voices = window.speechSynthesis.getVoices();
    console.log('voices:', voices);

    // Example: pick Microsoft Ravi (India) if available
    const target = voices.find(v => 
      v.lang === "en-IN" && v.name.includes("David")
    ) || voices.find(v => 
      v.lang === "en-US" && v.name.includes("Mark")
    );

    if (target) {
      utterance.voice = target;
      console.log("Using voice:", target.name);
    } else {
      console.warn("Target voice not found, using default.");
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  // If voices are already loaded, speak immediately
  if (window.speechSynthesis.getVoices().length) {
    setVoiceAndSpeak();
  } else {
    // Otherwise wait for voiceschanged event
    window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  }

  return true;
}

// 🔴 Stop speaking immediately
export function stopSpeaking() {
  window.speechSynthesis.cancel();
}



export function speak(text, onEnd) {
  const utterance = new SpeechSynthesisUtterance(text);

  // timing / prosody
  utterance.rate = 1;
  utterance.pitch = 0.5;
  utterance.volume = 1;

  // choose a specific voice
  const voices = window.speechSynthesis.getVoices();
  const target = voices.find(
    v => v.lang === "en-US" && v.name.includes("Microsoft Mark - English (India)")
  );
  if (target) utterance.voice = target;

  // trigger callback when finished
  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}





// female voice
// export function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);

//   utterance.rate = .8;
//   utterance.pitch = 1.3;
//   utterance.volume = 1.0;

//   const voices = window.speechSynthesis.getVoices();

//   // Pick a female voice by exact name
//   const target = voices.find(v => v.name === "Microsoft Zira - English (United States)");
//   if (target) {
//     utterance.voice = target;
//   }

//   window.speechSynthesis.speak(utterance);
// }

// List all voices with their names and languages
// window.speechSynthesis.onvoiceschanged = () => {
//   console.log(window.speechSynthesis.getVoices());
// };


