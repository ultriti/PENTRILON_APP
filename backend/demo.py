import subprocess
import webbrowser
import threading
import pyttsx3
from AppOpener import open ,give_appnames

def open_settings(query_3):
    print(give_appnames())

    if "settings" in query_3.lower():
        # subprocess.Popen("settings.exe", shell=True)
        open(f"{query_3}")
        return "Settings has been opened,sir"
    return "settings command not matched"

open_settings("settings")