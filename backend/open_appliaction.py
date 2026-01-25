from AppOpener import open
# from application_automation import automation
# # Open multiple applications
# open("notepad, calculator, settings")
import subprocess

import pyttsx3
import webbrowser

engine = pyttsx3.init()
voices = engine.getProperty('voice')

# Function to convert text to speech
def speak(say):
    engine.say(say)
    engine.runAndWait()

# def open_app(query_3):
#             a = str(query_3).replace('open',"")
#             a1 = str(a).replace('application',"")
#             a2 = str(a1).replace('app',"")
#             a3 = str(a2).replace('ultriti',"")
#             a4 = str(a3).replace('ultron',"")

#             print(f"opening {a4} sir")
#             speak(f"opening {a4} sir")
#             open(f"{a4}")
#             print(f"{a4} has been opened sir")
#             speak(f"{a4} has been opened sir")


def open_apps_fun(query_3):
        if 'application' in query_3:
            query_3 = str(query_3).replace("open","")
            query_3 = str(query_3).replace("application","")
            query_3 = str(query_3).replace("open","")
            query_3 = str(query_3).replace("you","")
            
            print("query_3: ---------",query_3)

            print(f"opening {query_3} sir")
            open(f"{query_3}")
            print(f"{query_3} has been opened sir")
        
        else:
            print(f"I am not able to find {query_3}")


def open_settings(query_3):
        if 'open settings' in query_3:
             open_apps_fun(query_3)
             return "Settings has been opened,sir"
        else:
            print("I am not able to find settings")
            return "I am not able to Open settings"
        


def open_calculator(query_3):
        if 'open calculator' in query_3:
            open("calculator")
            return "calculator has been opened,sir"
        
        else:
            print("I am not able to find calculator")
            return "I am not able to find calculator"

def open_notepad(query_3):
        if 'open notepad' in query_3:
            subprocess.Popen(["notepad.exe"])
            # open("notepad")
            return "notepad has been opened sir"
        else:
            print("I am not able to find notepad")

def open_chrome(query_3):
        if 'open chrome' in query_3:
            webbrowser.open("chrome")
            return "Chrome has been opened sir"
        
        else:
            print("I am not able to find chrome")
            return "I am not able to find chrome"

def open_vscode(query_3):
        print("------------->",query_3)
        if 'vs code application' in query_3 or 'visual studio code' in query_3:
            open("visual studio code")
            return "visual studio has been opened sir"
        
        else:
            print("I am not able to find visual studio code")
            return "i am not able to open visual studio code"

def open_paint(query_3):
        if 'open paint' in query_3:
            open("paint")
            return "paint app has been opened sir"
        
        else:
            print("I am not able to find paint")
            return "I am not able to find paint app"


def open_mail(query_3):
        if 'open mail' in query_3:
            open("mail")
            return "mail has been opened sir"
        
        else:
            print("I am not able to find email")
            return "I am not able to find email"

def open_edge(query_3):
        if 'open microsoft edge' in query_3:
            open("microsoft edge")
            return "microsoft edge has been opened sir"
        
        else:
            print("I am not able to find edge")
            return "I am not able to find edge"
      
def open_music_player(query_3):
      if 'open music player' in query_3:
            open("media player")
      else:
            print("I am not able to find music player")

def open_video_player(query_3):
      if 'open video player' in query_3:
            open("media player")
      else:
            print("I am not able to find video player")

def open_image_viewer(query_3):
        if 'open photo' in query_3:
            open("photos")
        else:
            print("I am not able to find image viewer")

def open_excel_viewer(query_3):
        if 'open excel' in query_3:
            open("excel")
        else:
            print("I am not able to find excel viewer")

def open_word_viewer(query_3):
        if 'open word' in query_3:
            open("word")
        else:
            print("I am not able to find word viewer")

def open_ppt_viewer(query_3):
        if 'powerpoint application' in query_3:
            open("powerpoint")
        else:
            print("I am not able to find powerpoint viewer")

def open_camera_viewer(query_3):
        if 'open camera' in query_3:
            open("camera")
        else:
            print("I am not able to find camera viewer")


def open_spotify(query_3):
        if 'open spotify' in query_3:
            open("spotify")
        else:
            print("I am not able to find camera viewer")

def open_netflix(query_3):
        if 'open netflix' in query_3:
            open("netflix")
        else:
            print("I am not able to find netflix")



# def send_whatsapp(query,message):
#         if 'send whatsapp message' in query:
#             try:
#                 automation.whatsapp_send_msg(str(message))
#                 print("WhatsApp message sent successfully!")
#                 return
#             except Exception as e:
#                 print(f"Error sending WhatsApp message: {str(e)}")
                
                
#             else:
#                 print("I am not able to find whatsapp")


def open_whatsapp(query):
    try:
        if 'open whatsapp' in query:
                open("whatsapp")
        else:
            print("I am not able to find whatsapp viewer")

    except Exception as e:
         print(f"Error opening WhatsApp: {str(e)}")