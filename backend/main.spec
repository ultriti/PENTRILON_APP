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
