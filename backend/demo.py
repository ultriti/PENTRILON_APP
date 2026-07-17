# import subprocess
# import webbrowser
# import threading
# import pyttsx3
# from AppOpener import open ,give_appnames
from google import genai

# engine = pyttsx3.init()
# voices = engine.getProperty('voice')

# Function to convert text to speech
# def speak(say):
#     engine.say(say)
#     engine.runAndWait()

# def open_settings(query_3):
#     print(give_appnames())

#     if "settings" in query_3.lower():
#         # subprocess.Popen("settings.exe", shell=True)
#         open(f"{query_3}")
#         return "Settings has been opened,sir"
#     return "settings command not matched"

# open_settings("settings")


import os

os.environ["GEMINI_API_KEY"] = "AIzaSyATULBEhaRvkXx5sAsYTaMl1Wv0-KSFTHc"

def ApiTest():
    client = genai.Client()
    response = client.models.generate_content(model="gemini-2.5-flash", contents="what are you")
    print(response.text)

ApiTest()



# speak("hello world")
ApiTest()