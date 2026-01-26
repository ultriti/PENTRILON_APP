import subprocess
import webbrowser
import threading
import pyttsx3
from AppOpener import open ,give_appnames


engine = pyttsx3.init()
voices = engine.getProperty('voice')

# Function to convert text to speech
def speak(say):
    engine.say(say)
    engine.runAndWait()

def open_settings(query_3):
    print(give_appnames())

    if "settings" in query_3.lower():
        # subprocess.Popen("settings.exe", shell=True)
        open(f"{query_3}")
        return "Settings has been opened,sir"
    return "settings command not matched"

open_settings("settings")

# speak("hello world")