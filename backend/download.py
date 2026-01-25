# # import requests
# # import os
# # import zipfile

# # # URL of the model you want
# # url = "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"

# # # Build the full target directory under %APPDATA%
# # base_dir = os.getenv("APPDATA") or os.path.expanduser("~")
# # target_dir = os.path.join(base_dir, "Pentrilon", "models")
# # os.makedirs(target_dir, exist_ok=True)   # 👈 ensures folder exists

# # zip_path = os.path.join(target_dir, "vosk-model-small-en-us-0.15.zip")
# # model_folder = os.path.join(target_dir, "vosk-model-small-en-us-0.15.zip")

# # # Download with progress
# # with requests.get(url, stream=True) as r:
# #     r.raise_for_status()
# #     total = int(r.headers.get("content-length", 0))
# #     downloaded = 0
# #     with open(zip_path, "wb") as f:
# #         for chunk in r.iter_content(chunk_size=8192):
# #             if chunk:
# #                 f.write(chunk)
# #                 downloaded += len(chunk)
# #                 percent = int(downloaded * 100 / total)
# #                 downloaded_mb = round(downloaded / (1024 * 1024), 2)
# #                 total_mb = round(total / (1024 * 1024), 2)
# #                 print(f"Downloaded {downloaded_mb}/{total_mb} MB ({percent}%)")

# # print("Download complete, extracting...")

# # # Extract into target_dir
# # with zipfile.ZipFile(zip_path, "r") as zip_ref:
# #     zip_ref.extractall(target_dir)

# # # Remove the zip after extraction
# # os.remove(zip_path)

# # print("Model installed successfully at:", model_folder)

# import os
# import requests
# import zipfile

# # Step 1: Build full path to C:\Pentrilon\models
# base_dir = r"C:\Pentrilon"   # 👈 fixed: direct path, not %APPDATA%
# target_dir = os.path.join(base_dir, "models")
# os.makedirs(target_dir, exist_ok=True)  # ensure folder exists

# # Step 2: Set ZIP and model folder paths
# zip_path = os.path.join(target_dir, "vosk-model-small-en-us-0.15.zip")
# model_folder = os.path.join(target_dir, "vosk-model-small-en-us-0.15")

# # Step 3: Download ZIP
# url = "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"
# print("Downloading model to:", zip_path)

# with requests.get(url, stream=True) as r:
#     r.raise_for_status()
#     total = int(r.headers.get("content-length", 0))
#     downloaded = 0
#     with open(zip_path, "wb") as f:
#         for chunk in r.iter_content(chunk_size=8192):
#             if chunk:
#                 f.write(chunk)
#                 downloaded += len(chunk)
#                 percent = int(downloaded * 100 / total)
#                 downloaded_mb = round(downloaded / (1024 * 1024), 2)
#                 total_mb = round(total / (1024 * 1024), 2)
#                 print(f"Downloaded {downloaded_mb}/{total_mb} MB ({percent}%)")

# # Step 4: Extract ZIP
# print("Extracting to:", target_dir)
# with zipfile.ZipFile(zip_path, "r") as zip_ref:
#     zip_ref.extractall(target_dir)

# # Step 5: Delete ZIP
# os.remove(zip_path)
# print("Model installed successfully at:", model_folder)



# # import os

# # # Path to AppData (not Roaming, directly AppData)
# # appdata_path = os.path.join("C:\\")

# # # Define the new folder name
# # new_folder = os.path.join(appdata_path, "Pentrilon")

# # # Create the folder
# # os.makedirs(new_folder, exist_ok=True)

# # print("Folder created at:", new_folder)


import re

strt = "House price prediction in 3 bathroom delhi  4  2290 sqft "

# Lowercase for consistency
text = strt.lower()

# Extract bhk, sqft, bath using regex
bhk_match = re.search(r"(\d+)\s*bhk", text) or re.search(r"bhk\s*(\d+)", text)
sqft_match = re.search(r"(\d+)\s*sqft", text) or re.search(r"\ssqft*(\d+)", text)
bath_match = re.search(r"(\d+)\s*bath", text) or re.search(r"\sbath*(\d+)", text)

bhk = int(bhk_match.group(1)) if bhk_match else None
sqft = int(sqft_match.group(1)) if sqft_match else None
bath = int(bath_match.group(1)) if bath_match else None

# Extract location by removing known tokens
tokens = text.split()
ignore = {"house", "price", "prediction", "predict", "in", "sqft", "bhk", "bath"}

print(ignore)

location_tokens = [t for t in tokens if not any(x in t for x in ignore) and not t.isdigit()]

print(location_tokens)
location = " ".join(location_tokens)

print("Location:", location)
print("BHK:", bhk)
print("Sqft:", sqft)
print("Bath:", bath)
