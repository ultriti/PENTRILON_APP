import re
import requests
from flask import jsonify
import numpy as np
import cv2

text = None
text_ = None
info = None
success = None
status = 500

confidence = None
Cloumn_Name = None
Pred_Value = None
image = None


# house price detection
def House_PricePrediction_model(text):
    text_ = None
    info = None
    success = None
    status = 500  # default

    print("--------------------------->>>>>>>", text)

    try:
        text = text.lower()

        # Extract bhk, sqft, bath using regex
        bhk_match = re.search(r"(\d+)\s*bhk", text) or re.search(r"bhk\s*(\d+)", text)
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
            "bathroom",
        }

        location_tokens = [t for t in tokens if t not in ignore and not t.isdigit()]
        location = " ".join(location_tokens)

        # ---> handling missing values
        missing = []
        if not bath:
            missing.append("bath")
        if not sqft:
            missing.append("sqft")
        if not bhk:
            missing.append("bhk")
        if not location:
            missing.append("location")

        if missing:
            text = f"Please provide {', '.join(missing)}"
            text_ = text
            info = (
                "format -\n"
                "house price prediction in banglore area value value bathroom value bhk value sqft"
            )
            success = False
            status = 200
            return text, text_, info, success, status

        print("Location:", location)
        print("BHK:", bhk)
        print("Sqft:", sqft)
        print("Bath:", bath)

        # Forward request to Flask route
        response = requests.post(
            "http://127.0.0.1:5000/HousePricePredictionBanglore",
            json={"location": location, "bhk": bhk, "bath": bath, "sqft": sqft},
        )

        if response.status_code == 200:
            message = response.json().get("message")
            result = response.json().get("result")
            success = response.json().get("success")

            info = (
                f" in '{location}' House price is Approx:- ' {result} Rs ' - for\n"
                f" {bhk} bhk | {bath} bathroom | almost {sqft} sqft"
            )
            text = message
            text_ = message
            status = 200
            return text, text_, info, success, status

        else:
            text = "Failed to fetch house prediction"
            text_ = {"error": text}
            success = False
            status = 500
            return text, text_, info, success, status

    except Exception as e:
        print("error", e)
        text = "Failed to fetch house prediction"
        text_ = {"error": text}
        success = False
        status = 500
        return text, text_, info, success, status


# -------------------> leaf Dieseaase model detection
def Leaf_Disease_Prediction_model(file):
    global text
    global text_
    global status
    global info

    global confidence
    global success
    global Cloumn_Name
    global Pred_Value

    print(file)
    if file:
        # Read file bytes once
        file_bytes = file.read()

        File_Name = file.filename
        File_Type = file.mimetype

        # Print metadata
        print("File name:", File_Name)
        print("File type:", File_Type)
        print("File size:", len(file_bytes))

        # ----------------------------> classify file type

        if str(File_Type) == "image/png" or str(File_Type) == "image/jpeg":
            print("img")

            # file.
            # Convert to numpy array and decode with OpenCV
            np_bytes = np.frombuffer(file_bytes, np.uint8)
            img_input_2 = cv2.imdecode(np_bytes, cv2.IMREAD_COLOR)

            if img_input_2 is None:
                print("Failed to decode image")
                text = "Failed to decode image"
                text_ = "Failed to decode image"
                info = "info failed"
                success = False
                status = 500

                return text, text_, info, success, status

            else:
                print("Image decoded successfully:", img_input_2.shape)

                print("decode image")
                text = "decode image"
                text_ = "decode image"
                info = f"{img_input_2.shape}"
                success = False
                status = 200

                file.seek(0)

                # send file to another backend using multipart/form-data
                response = requests.post(
                    "http://127.0.0.1:5000/PlantDiseaseDetection",
                    files={"file": (file.filename, file, file.mimetype)},
                    data={"Prompt": "optional extra data here"},
                )

                if response.status_code == 200:
                    text = response.json().get("message")
                    Cloumn_Name = response.json().get("Cloumn_Name")
                    Pred_Value = response.json().get("Pred_Value")
                    success = response.json().get("success")
                    confidence = response.json().get("confidence")

                print(
                    f"responce from ai pentrilon --> {text} , {Cloumn_Name}, {Pred_Value}, {confidence}"
                )
                # text = message
                info = f"the image has {Cloumn_Name} disease with {Pred_Value}% with {confidence}% confidence"

                return text, text_, info, success, status


# ----------------------> object detection model yolo
def Object_Detection_model(file):

    print("Object_Detection_model model")
    global text, text_, status, info, image
    global confidence, success, Cloumn_Name, Pred_Value

    if file:
        # Read file bytes once
        file_bytes = file.read()
        File_Name = file.filename
        File_Type = file.mimetype

        print("File name:", File_Name)
        print("File type:", File_Type)
        print("File size:", len(file_bytes))

        # ----------------------------> classify file type
        if File_Type in ["image/png", "image/jpeg"]:
            np_bytes = np.frombuffer(file_bytes, np.uint8)
            img_input_2 = cv2.imdecode(np_bytes, cv2.IMREAD_COLOR)

            if img_input_2 is None:
                text = text_ = "Failed to decode image"
                info = "info failed"
                success = False
                status = 500
                return text, text_, info, success, status

            # Reset file pointer before sending
            file.seek(0)

            # Send file to backend
            response = requests.post(
                "http://127.0.0.1:5000/ObjectDetactionModel",
                files={"file": (file.filename, file, file.mimetype)},
                data={"Prompt": "optional extra data here"},
            )

            if response.status_code == 200:
                resp_json = response.json()
                text = resp_json.get("message")
                Pred_Value = resp_json.get("Pred_Value")
                success = resp_json.get("success")
                confidence = resp_json.get("confidence")
                image = resp_json.get("image")
                Cloumn_Name = resp_json.get("Cloumn_Name")  # if your backend returns it
                
                

                print(
                    f"response from ai pentrilon --> {text}, {Cloumn_Name}, {Pred_Value}, {confidence}"
                )

                info = f"The image has {Cloumn_Name} with predictions {Pred_Value} and confidence {confidence}"
                status = 200
                text_ = text
                return text, text_, info, success, status

            else:
                text = text_ = "Backend error"
                info = "Failed to get response"
                success = False
                status = response.status_code
                return text, text_, info, success, status
