<!-- -------------------------- for donwoad vosk for particular folder  -->
from flask import Flask, jsonify, request
import requests, zipfile, io, os

app = Flask(__name__)

MODEL_URL = "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip"
TARGET_DIR = r"E:\main projects\Pentrilon-desktop\backend\models"

@app.route("/download-model", methods=["POST"])
def download_model():
    try:
        # Stream download
        response = requests.get(MODEL_URL, stream=True)
        response.raise_for_status()

        # Extract zip into target dir
        with zipfile.ZipFile(io.BytesIO(response.content)) as z:
            z.extractall(TARGET_DIR)

        return jsonify({"status": "success", "message": "Model downloaded and extracted."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

<!-- ------------ chuck size show -->
from flask import Flask, Response, stream_with_context
import requests, os, zipfile

app = Flask(__name__)

MODEL_URL = "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip"
TARGET_DIR = r"E:\main projects\Pentrilon-desktop\backend\models"

@app.route("/download-model", methods=["POST"])
def download_model():
    def generate():
        with requests.get(MODEL_URL, stream=True) as r:
            r.raise_for_status()
            total_size = int(r.headers.get("content-length", 0))
            downloaded = 0
            chunksize = 8192

            # Save zip temporarily
            temp_zip = os.path.join(TARGET_DIR, "model.zip")
            with open(temp_zip, "wb") as f:
                for chunk in r.iter_content(chunk_size=chunksize):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        percent = (downloaded / total_size) * 100
                        yield f"data: {{\"downloaded\":{downloaded},\"total\":{total_size},\"percent\":{percent:.2f}}}\n\n"

            # Extract after download
            with zipfile.ZipFile(temp_zip, "r") as z:
                z.extractall(TARGET_DIR)
            os.remove(temp_zip)
            yield f"data: {{\"status\":\"complete\"}}\n\n"

    return Response(stream_with_context(generate()), mimetype="text/event-stream")

<!-- frontend -->
function downloadModel() {
  const evtSource = new EventSource("http://localhost:5000/download-model");

  evtSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.status === "complete") {
      document.getElementById("status").innerText = "Download complete!";
      evtSource.close();
    } else {
      const mbDownloaded = (data.downloaded / (1024*1024)).toFixed(2);
      const mbTotal = (data.total / (1024*1024)).toFixed(2);
      document.getElementById("status").innerText =
        `Downloading: ${mbDownloaded} MB / ${mbTotal} MB (${data.percent}%)`;
    }
  };
}
<!-- --------- main .spec -->
# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import collect_dynamic_libs, collect_data_files
import os

# Collect Vosk DLLs and data files
vosk_binaries = collect_dynamic_libs('vosk')
vosk_datas = collect_data_files('vosk')

# Add only the small model folder explicitly (exclude the big one!)
small_model_path = os.path.abspath("models/vosk-model-small-en-us-0.15")

model_datas = [
    (small_model_path, "vosk-model-small"),
    # big model intentionally excluded to keep installer small
]

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=vosk_binaries,
    datas=vosk_datas + model_datas,
    hiddenimports=['scipy._cyutility', 'scipy.sparse._csparsetools'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
