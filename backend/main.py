from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    jsonify,
)
import json
import subprocess


from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
import os
import speech_recognition as sr
import pyttsx3

import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras

from open_appliaction import (
    open_notepad, open_calculator, open_settings, open_chrome, open_vscode, open_edge
)

from Model_Interaction import (
    House_PricePrediction_model,
    Leaf_Disease_Prediction_model,
    Object_Detection_model,
)

from get_battery_info import fullybattery
from App_interact import AI_interaction
import open_appliaction
from APP_Automation import Edge_search_automation, Search_Wikipedia

# import
from wishme import Wish_me

import requests

import speech_recognition as sr
import socket
import json
import sounddevice as sd
from vosk import Model, KaldiRecognizer
import zipfile


# ------------------------------------ app --------------------------------------------

app = Flask(__name__)

# Allow requests from Electron frontend (file://) and dev server (localhost:8080)
CORS(app, supports_credentials=True, origins=["http://localhost:8080", "file://"])

r = sr.Recognizer()
engine = pyttsx3.init()
voices = engine.getProperty("voice")


model = r"E:\main projects\Pentrilon-desktop\backend\models\vosk-model-small-en-us-0.15"

# model = Model(
#     r"E:\main projects\Pentrilon-desktop\backend\models\vosk-model-small-en-us-0.15"
# )

import requests
import zipfile
import os
from flask import Response


# ----------------------------------------
import os, requests, zipfile
from flask import Response

import os
import re


# ---------------------------------> check/get  in dir of model present
def get_model_dir():
    # Use C:\Pentrilon as the base
    base_dir = r"C:\Pentrilon"
    target_dir = os.path.join(base_dir, "models")
    os.makedirs(target_dir, exist_ok=True)  # ensure folder exists
    return target_dir


# -----------------------------------> checking of big model
@app.route("/CheckBigModel", methods=["GET"])
def check_big_model():
    print("-----------------------")
    try:

        base_dir = os.path.join(os.path.dirname(__file__), "models")
        target_dir = get_model_dir()
        high_acc_model = os.path.join(target_dir, "vosk-model-en-us-0.22")

        small_model = os.path.join(base_dir, "vosk-model-small-en-us-0.15")

        print("high_acc_model", high_acc_model)
        print("os.path.isdir(high_acc_model)", os.path.isdir(high_acc_model))

        target_dir = get_model_dir()
        model_folder = os.path.join(target_dir, "vosk-model-en-us-0.22")

        print("model_folder", model_folder)
        print("os.path.isdir(model_folder)", os.path.isdir(model_folder))

        if os.path.isdir(model_folder):
            return jsonify({"installed": True, "message": "Already installed"}), 200
        else:
            return jsonify({"installed": False, "message": "Not installed"}), 200

    except Exception as e:
        print("error", e)
        return (
            jsonify({"installed": False, "message": f"Some error occurred: {str(e)}"}),
            500,
        )


# -----------------------------------> download bit modelroute
@app.route("/DownloadBigModel", methods=["GET"])
def DownloadBigModel():
    base_dir = r"C:\Pentrilon"
    target_dir = os.path.join(base_dir, "models")
    os.makedirs(target_dir, exist_ok=True)

    zip_path = os.path.join(target_dir, "vosk-model-en-us-0.22.zip")
    model_folder = os.path.join(target_dir, "vosk-model-en-us-0.22")
    url = "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip"

    def generate():
        try:
            with requests.get(url, stream=True) as r:
                r.raise_for_status()
                total = int(r.headers.get("content-length", 0))
                downloaded = 0
                with open(zip_path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                            downloaded += len(chunk)
                            percent = int(downloaded * 100 / total)
                            print(f"Downloaded {percent}%")  # backend console
                            yield f"data: {percent}\n\n"

            print("Extracting...")
            yield "data: Extracting...\n\n"
            with zipfile.ZipFile(zip_path, "r") as zip_ref:
                zip_ref.extractall(target_dir)
            os.remove(zip_path)
            print("Installed successfully")
            yield "data: Successfully installed Small Model\n\n"

        except Exception as e:
            print("Error:", e)
            yield f"data: Error: {str(e)}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def Load_model_rec_off():
    global model
    print("model loading ...........")

    # project-local path
    base_dir = os.path.join(os.path.dirname(__file__), "models")
    target_dir = get_model_dir()
    high_acc_model = os.path.join(target_dir, "vosk-model-en-us-0.22")

    small_model = os.path.join(base_dir, "vosk-model-small-en-us-0.15")

    print("high_acc_model", high_acc_model)
    print("os.path.isdir(high_acc_model)", os.path.isdir(high_acc_model))

    if os.path.isdir(high_acc_model):
        model = Model(high_acc_model)
        print("model loaded high acc")
    elif os.path.isdir(small_model):
        model = Model(small_model)
        print("model loaded low acc")
    else:
        raise FileNotFoundError("No Vosk model found")


# def Load_model_rec_off():
#     global model
#     print("model loading ...........")

#     appdata_path = os.path.join(os.getenv("APPDATA"), "Pentrilon", "models")
#     high_acc_model = os.path.join(appdata_path, "vosk-model-en-us-0.22")
#     small_model = os.path.join(appdata_path, "vosk-model-small-en-us-0.15")

#     if os.path.isdir(high_acc_model):
#         model = Model(high_acc_model)
#         print("model loaded high acc")
#     else:
#         model = Model(small_model)
#         print("model loaded low acc")


def internet_connected(url="http://www.google.com/", timeout=5):
    try:
        requests.get(url, timeout=timeout)
        return True
    except requests.ConnectionError:
        return False


def Speak_(query):
    speak(query)


def speak(say):
    print(f"[PENTRILON]: {say}")
    try:
        engine.say(say)
        engine.runAndWait()
    except Exception as e:
        print("TTS error:", e)


def take_command(
    max_wait=5,
    model_path=r"E:\main projects\Pentrilon-desktop\backend\models\vosk-model-small-en-us-0.15",
):
    """Listen for a voice command with online/offline fallback."""
    if internet_connected():
        global model

        # Online mode: Google Speech Recognition
        with sr.Microphone() as source_mic:
            print("Listening (Google)...")
            try:
                audio = r.listen(
                    source_mic, timeout=max_wait, phrase_time_limit=max_wait
                )
            except sr.WaitTimeoutError:
                print("Timeout: No speech detected.")
                return "none"

            print("Recognizing (Google)...")
            r.pause_threshold = 0.5
            try:
                query_ = r.recognize_google(audio, language="en-US")
                print(f"User said: {query_}\n")
                return query_
            except Exception as e:
                print(f"Error: {str(e)}")
                return "None"
    else:
        if not os.path.isdir(model_path):
            print(f"Model path not found: {model_path}")
            return "None"

        print("-------------->No internet. Switching to offline Vosk mode...")

        try:

            global model
            rec = KaldiRecognizer(model, 16000)
            recognized_text = None

            def callback(indata, frames, time_info, status):
                nonlocal recognized_text
                if rec.AcceptWaveform(bytes(indata)):

                    result = json.loads(rec.Result())
                    if result.get("text"):
                        recognized_text = result["text"]

            with sd.RawInputStream(
                samplerate=16000,
                blocksize=8000,
                dtype="int16",
                channels=1,
                callback=callback,
            ):
                print("Speak (offline)...")
                sd.sleep(max_wait * 1000)  # listen for max_wait seconds

            if recognized_text:
                print(f"User said (offline): {recognized_text}")
                return recognized_text
            else:
                print("No speech detected offline.")
                return "None"

        except Exception as e:
            print("error---------------------------------\n", e)
            return jsonify({"error": str(e)}), 500


# ---------------------> home route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend running successfully"}), 200


@app.route("/Ping", methods=["GET"])
def Ping():
    try:
        return jsonify({"message": "backend connected"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/GetAudio_To_Text", methods=["POST"])
def Audio_to_text():

    try:
        print("----------------------------------> audio to text")
        text = take_command().lower()

        print("-converted> audio to text :", text)

        return jsonify({"message": text}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route("/Automate_browser", methods=["POST"])
def Automate_browser():
    print("automate edge broo")
    data = request.get_json()  # parse JSON body
    query = data.get("Query")

    text_a = Edge_search_automation(query)
    print(text_a)

    return jsonify({"message": text_a}), 200


@app.route("/getUserAudio", methods=["POST"])
def get_user_audio():

    try:

        text = take_command().lower()
        text_ = "error"
        info = ""
        print("user said:", text)

        if "open" in text and ("application" in text or "app" in text):

            print("openinggg->")
            try:

                if "settings" in text:
                    text_ = open_settings(text)

                elif "notepad" in text:
                    text_ = open_notepad(text)

                elif "calculator" in text:
                    text_ = open_calculator(text)

                elif "chrome" in text:
                    text_ = open_chrome(text)

                elif "visual studio code" in text:
                    text_ = open_vscode(text)

                elif "vs code" in text:
                    text_ = open_vscode(text)

                elif "microsoft edge" in text:
                    text_ = open_edge(text)

                else:
                    text_ = f"App not found"

            except Exception as e:
                print(e)
        



        elif (
            "who" in text
            or "what" in text
            or "how" in text
            or "search" in text
            or "find" in text
        ):

            text_response = Search_Wikipedia(text)

            info = text_response
            text_ = f"here is info about {text}"

        else:
            text_ = AI_interaction(text)
            print("text_ in interact:---\n", text_)

            if "error in detection" in text_:

                if "battery status" in text:
                    text_ = fullybattery()

                else:
                    text_ = "error in audio detection"

            text_ = text_

        print(text_)

        return jsonify({"text": text_, "info": info}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


img_input_2 = None


# ----------------------------> User Prompt fetch route
@app.route("/GetUserPrompt", methods=["POST"])
def GetUserPrompt():
    Prompt = request.form.get("Prompt")
    file = request.files.get("file")

    print("Prompt:", Prompt)

    info = ""
    text_ = "none"
    text = Prompt
    success = False

    try:

        # ------------------------> image detection <----------------------
        if file:
            print("file is thereree ---------------")

            if "object" in text and "detect" in text:
                
                text, AI_res, info, success, status = Object_Detection_model(file)
                
            elif "leaf" in text or "plant disease" in text:
                text, AI_res, info, success, status = Leaf_Disease_Prediction_model(file)
                
            else:
                text = "give corect prompt",
                info = "obj detction prompt -> keywprd(object , detect) || plant disease prompt -> keyword (leaf ,plant disease) ",
                success = False
                status = 500
                
                

            
            Prompt_text = Prompt.lower()
            if Prompt_text:
                print("intract")
                AI_res_2 = AI_interaction(Prompt_text, file)

                # If AI_interaction returns (text, text_, info, success, status)
                # and you want the "info" part:
                print("AI_res_2:", AI_res_2)
                print("info", info)

                info = AI_res_2[2] + "\n" + info


            print(f" text {text} \nmessage {text_} \ninfo {info} \nsuccess {success}")

            return (
                jsonify(
                    {
                        "text": text,
                        "message": text_,
                        "info": info,
                        "success": success,
                    }
                ),
                status,
            )

        # ------------- user desktop app open ----------------------
        elif "open" in text and ("application" in text or "app" in text):

            try:
                text = text.replace("app", "application")

                if "settings" in text:
                    text_ = open_settings(text)

                elif "notepad" in text:
                    text_ = open_notepad(text)

                elif "calculator" in text:
                    text_ = open_calculator(text)

                elif "chrome application" in text:
                    text_ = open_chrome(text)

                elif "visual studio code" in text:
                    text_ = open_vscode(text)

                elif "vs code application" in text:
                    text_ = open_vscode(text)

                elif "microsoft edge" in text:
                    text_ = open_edge(text)

                else:
                    text_ = f"App not found"

            except Exception as e:
                print(e)

        # ----------------------> ask for wikipedia ---------------------------------
        elif "who" in text or "what" in text or "how" in text or "search" in text:

            text = text.replace("search", "")
            print("-----------------------------> prompt ->",text)
            text_response = Search_Wikipedia(text)
            info = text_response
            text_ = f"here is info about {text}"
            
            print("-----------------> response from wikipedia\n",info)
            


        # ------------------------> house price prediction <-----------------------------
        elif "house" in text and ("prediction" in text or "predict" in text):
            # HousePricePredictionBanglore
            print("HPP",text)
            try:
                text = text.lower()

                # Extract bhk, sqft, bath using regex
                bhk_match = re.search(r"(\d+)\s*bhk", text) or re.search(
                    r"bhk\s*(\d+)", text
                )
                sqft_match = re.search(r"(\d+)\s*sqft", text) or re.search(
                    r"\ssqft*(\d+)", text
                )
                bath_match = re.search(r"(\d+)\s*bath", text) or re.search(
                    r"\sbath*(\d+)", text
                )

                bhk = int(bhk_match.group(1)) if bhk_match else None
                sqft = int(sqft_match.group(1)) if sqft_match else None
                bath = int(bath_match.group(1)) if bath_match else None

                # Extract location by removing known tokens
                tokens = text.split()
                ignore = {
                    "house",
                    "price",
                    "prediction",
                    "predict",
                    "in",
                    "sqft",
                    "bhk",
                    "bath",
                    "with",
                    "banglore",
                    "and",
                    "value",
                }

                print("ignore",ignore)

                location_tokens = [
                    t
                    for t in tokens
                    if not any(x in t for x in ignore) and not t.isdigit()
                ]

                print(location_tokens)
                location = str(" ".join(location_tokens))

                # --->  handling missing values
                missing = []

                if not bath:
                    missing.append("bath")
                if not sqft:
                    missing.append("sqft")
                if not sqft:
                    missing.append("bhk")
                if not sqft:
                    missing.append("location")

                if missing:
                    return (
                        jsonify(
                            {
                                "status": "incomplete",
                                "missing": f"Please provide {', '.join(missing)}",
                                "info": f"format -\nhouse price prediction in banglore area value  value bathroom    value bhk  value  sqft)",
                                "text": f"Please provide {', '.join(missing)}",
                            }
                        ),
                        200,
                    )

                print("Location:", location)
                print("BHK:", bhk)
                print("Sqft:", sqft)
                print("Bath:", bath)

                # Instead of calling the Flask route directly, forward the request
                response = requests.post(
                    "http://127.0.0.1:5000/HousePricePredictionBanglore",
                    json={"location": location, "bhk": bhk, "bath": bath, "sqft": sqft},
                )

                # print("status code:", response.status_code)
                # print("message:", response.json().get("message"))

                if response.status_code == 200:
                    message = response.json().get("message")
                    result = response.json().get("result")
                    success = response.json().get("success")
                    status = response.status_code

                    info = f" in '{location}' House pice is Approx:-  '{ result } Rs' - for\n {bhk} bhk | {bath} bathroom | almost {sqft} sqft"
                    text = message

                print(text, text_, info, success)
            except Exception as e:
                print("error", e)
                text_ = {"error": "Failed to fetch house prediction"}

            return (
                jsonify(
                    {
                        "text": text,
                        "message": text_,
                        "info": info,
                        "success": success,
                        "status": status,
                    }
                ),
                status,
            )

            # try:
            #     text = text.lower()

            #     # Extract bhk, sqft, bath using regex
            #     bhk_match = re.search(r"(\d+)\s*bhk", text) or re.search(
            #         r"bhk\s*(\d+)", text
            #     )
            #     sqft_match = re.search(r"(\d+)\s*sqft", text) or re.search(
            #         r"\ssqft*(\d+)", text
            #     )
            #     bath_match = re.search(r"(\d+)\s*bath", text) or re.search(
            #         r"\sbath*(\d+)", text
            #     )

            #     bhk = int(bhk_match.group(1)) if bhk_match else None
            #     sqft = int(sqft_match.group(1)) if sqft_match else None
            #     bath = int(bath_match.group(1)) if bath_match else None

            #     # Extract location by removing known tokens
            #     tokens = text.split()
            #     ignore = {
            #         "house",
            #         "price",
            #         "prediction",
            #         "predict",
            #         "in",
            #         "sqft",
            #         "bhk",
            #         "bath",
            #         "with",
            #         "banglore",
            #         "and",
            #         "value",
            #     }

            #     print(ignore)

            #     location_tokens = [
            #         t
            #         for t in tokens
            #         if not any(x in t for x in ignore) and not t.isdigit()
            #     ]

            #     print(location_tokens)
            #     location = str(" ".join(location_tokens))

            #     # --->  handling missing values
            #     missing = []

            #     if not bath:
            #         missing.append("bath")
            #     if not sqft:
            #         missing.append("sqft")
            #     if not sqft:
            #         missing.append("bhk")
            #     if not sqft:
            #         missing.append("location")

            #     if missing:
            #         return (
            #             jsonify(
            #                 {
            #                     "status": "incomplete",
            #                     "missing": f"Please provide {', '.join(missing)}",
            #                     "info": f"format -\nhouse price prediction in banglore area value  value bathroom    value bhk  value  sqft)",
            #                     "text": f"Please provide {', '.join(missing)}",
            #                 }
            #             ),
            #             200,
            #         )

            #     print("Location:", location)
            #     print("BHK:", bhk)
            #     print("Sqft:", sqft)
            #     print("Bath:", bath)

            #     # Instead of calling the Flask route directly, forward the request
            #     response = requests.post(
            #         "http://127.0.0.1:5000/HousePricePredictionBanglore",
            #         json={"location": location, "bhk": bhk, "bath": bath, "sqft": sqft},
            #     )

            #     # print("status code:", response.status_code)
            #     # print("message:", response.json().get("message"))

            #     if response.status_code == 200:
            #         message = response.json().get("message")
            #         result = response.json().get("result")
            #         success = response.json().get("success")

            #         info = f" in '{location}' House pice is Approx:-  '{ result } Rs' - for\n {bhk} bhk | {bath} bathroom | almost {sqft} sqft"
            #         text = message

            #         return (
            #             jsonify({"text": text, "info": info, "success": success}),
            #             200,
            #         )

            #     else:
            #         text_ = {"error": "Failed to fetch house prediction"}
            # except Exception as e:
            #     print("error", e)
            #     text_ = {"error": "Failed to fetch house prediction"}

        # -----------------------> face detect model <-----------------------------

        elif ("face" in text or "person" in text) and "detect" in text:
            try:
                pass

            except Exception as e:
                print("error", e)

        # ----------------------> object detection <--------------------------
        elif "detect" in text or "find" in text:
            pass

        # ----------------------> interaction error <---------------------------
        else:
            text_ = AI_interaction(text)
            info = None

            print("text_ in interact:---\n", text_)
            if "response not found" in text_:

                if "battery status" in text:
                    text_ = "here is battery status"
                    info = fullybattery() 

                else:
                    text_ = "error in detection"
                    info = "error found"

            print(text_)
            
            
            
        # info = Prompt
        # print("-------------------->\ninfo : ",info)
        # print("-------------------->\text_ : ",text_)

        return jsonify({"message": text_, "text": text_, "info": info}), 200

    except Exception as e:
        print("error",e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":

    def Greeting():
        Wish_me()
        speak("hello i am Pentrilon AI")
        speak("how may i help you")

    Greeting()
    Load_model_rec_off()

    app.run(host="127.0.0.1", port=8000, debug=False)
