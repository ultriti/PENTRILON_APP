import speech_recognition as sr
import pyttsx3
import datetime

# Initialize recognizer and TTS engine
recognizer = sr.Recognizer()
engine = pyttsx3.init()
voices = engine.getProperty('voice')

# Function to convert text to speech
def speak(say):
    engine.say(say)
    engine.runAndWait()


def Wish_me():
    hour = int(datetime.datetime.now().hour)
    if 0 <= hour < 12:
        speak("Good morning!")
    elif 12 <= hour < 18:
        speak("Good afternoon!")
    else:
        speak("Good evening!")