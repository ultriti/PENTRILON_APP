
<!-- ------- main.py  -->
# def wrap ():
# -------------------------------------------------

# @app.route("/DownloadBigModel", methods=["GET"])
# def download_big_model():

#     # Step 1: Build full path to C:\Pentrilon\models
#     base_dir = r"C:\Pentrilon"
#     target_dir = os.path.join(base_dir, "models")
#     os.makedirs(target_dir, exist_ok=True)  # ensure folder exists

#     # Step 2: Set ZIP and model folder paths
#     zip_path = os.path.join(target_dir, "vosk-model-en-us-0.22.zip")
#     model_folder = os.path.join(target_dir, "vosk-model-en-us-0.22")

#     # Step 3: Download ZIP
#     url = "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip"
#     print("Downloading model to:", zip_path)

#     try:

#         with requests.get(url, stream=True) as r:
#             r.raise_for_status()
#             total = int(r.headers.get("content-length", 0))
#             downloaded = 0
#             with open(zip_path, "wb") as f:
#                 for chunk in r.iter_content(chunk_size=8192):
#                     if chunk:
#                         f.write(chunk)
#                         downloaded += len(chunk)
#                         percent = int(downloaded * 100 / total)
#                         downloaded_mb = round(downloaded / (1024 * 1024), 2)
#                         total_mb = round(total / (1024 * 1024), 2)
#                         print(f"Downloaded {downloaded_mb}/{total_mb} MB ({percent}%)")

#         # Step 4: Extract ZIP
#         print("Extracting to:", target_dir)
#         with zipfile.ZipFile(zip_path, "r") as zip_ref:
#             zip_ref.extractall(target_dir)

#         # Step 5: Delete ZIP
#         os.remove(zip_path)
#         print("Model installed successfully at:", model_folder)

#         return jsonify({"installed": True, "message": "Successfully installed Model"}), 200

#     except Exception as e:
#         return jsonify({"installed": False, "message": "Unsuccessfull To installed Model"}), 500


# @app.route("/DownloadBigModel", methods=["GET"])
# def download_big_model():
#     base_dir = r"C:\Pentrilon"
#     target_dir = os.path.join(base_dir, "models")
#     os.makedirs(target_dir, exist_ok=True)

#     zip_path = os.path.join(target_dir, "vosk-model-small-en-us-0.15.zip")
#     model_folder = os.path.join(target_dir, "vosk-model-en-us-0.22")
#     url = "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"

#     def generate():
#         try:
#             with requests.get(url, stream=True) as r:
#                 r.raise_for_status()
#                 total = int(r.headers.get("content-length", 0))
#                 downloaded = 0
#                 with open(zip_path, "wb") as f:
#                     for chunk in r.iter_content(chunk_size=8192):
#                         if chunk:
#                             f.write(chunk)
#                             downloaded += len(chunk)
#                             percent = int(downloaded * 100 / total)
#                             # 👇 send progress to frontend
#                             yield f"data: {percent}\n\n"

#             yield "data: Extracting...\n\n"
#             with zipfile.ZipFile(zip_path, "r") as zip_ref:
#                 zip_ref.extractall(target_dir)
#             os.remove(zip_path)
#             yield "data: Successfully installed Model\n\n"

#         except Exception as e:
#             yield f"data: Error: {str(e)}\n\n"

#     # Return as SSE stream
#     return Response(generate(), mimetype="text/event-stream")



<!-- ------------------- get big model -->
# @app.route("/GetHousePricePrediction", methods=["POST"])
# def GetHousePricePrediction():
#     try:
#         # Get JSON body from incoming request
#         body = request.get_json()

#         # Extract parameters
#         location = body.get("location")
#         bhk = body.get("bhk")
#         bath = body.get("bath")
#         sqft = body.get("sqft")  # corrected spelling

#         # Forward request to the other Flask server
#         response = requests.post(
#             "http://127.0.0.1:5000/HousePricePredictionBanglore",
#             json={"location": location, "bhk": bhk, "bath": bath, "sqft": sqft},
#         )

#         # Return the response from the other server
#         return jsonify(response.json()), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



<!-- --------------------------------- leaf disease detdtion  -->
 # Reset pointer and read bytes
            file.seek(0)
            file_bytes = np.frombuffer(file.read(), np.uint8)

            if file_bytes.size == 0:
                raise ValueError("Empty file buffer, cannot decode")

            # Decode into OpenCV image
            img_input_2 = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            if img_input_2 is None:
                raise ValueError("Failed to decode image")

            # Preprocess for TensorFlow
            input_img_21 = tf.keras.preprocessing.image.img_to_array(img_input_2)
            input_img_21_array = tf.expand_dims(input_img_21, 0)
            
            model_load = keras.models.load_model(r"E:\python\tenserflow\Exercises\potato_healthy_plant_detection\model_healty_plant\plant_status_detector_v2.keras")
            
            prediction = model_load.predict(input_img_21_array)
            print(prediction)


<!-- -------------------------------------- -->
            # import numpy as np
            # import cv2
            
            # # Reset pointer and read bytes
            # file.seek(0)
            # file_bytes = np.frombuffer(file.read(), np.uint8)

            # if file_bytes.size == 0:
            #     raise ValueError("Empty file buffer, cannot decode")

            # # Decode into OpenCV image
            # img_input_2 = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            # if img_input_2 is None:
            #     raise ValueError("Failed to decode image")

            # # Preprocess for TensorFlow
            # input_img_21 = tf.keras.preprocessing.image.img_to_array(img_input_2)
            # input_img_21_array = tf.expand_dims(input_img_21, 0)
            
            # model_load = keras.models.load_model(r"E:\python\tenserflow\Exercises\potato_healthy_plant_detection\model_healty_plant\plant_status_detector_v2.keras")
            
            # prediction = model_load.predict(input_img_21_array)
            # print(prediction)


            # # Show image with matplotlib
            # plt.imshow(cv2.cvtColor(img_input_2, cv2.COLOR_BGR2RGB))
            # plt.axis("off")
            # plt.show()