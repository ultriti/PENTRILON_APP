// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import "./DownloadBtn.css";

// import Donwload_webp from "../../public/images/app_components/cloud-download_4007728.webp"

// function DownloadModelButton({ setInstalled_ }) {
//     const [progress, setProgress] = useState(0);
//     const [status, setStatus] = useState("");
//     const [installed, setInstalled] = useState(true);

//     useEffect(() => {
//         const checkModel = async () => {
//             try {
//                 const res = await axios.get("http://127.0.0.1:8000/CheckBigModel");
//                 if (res.status === 200 && res.data.installed) {
//                     setInstalled(true);
//                     setInstalled_(true);
//                     setStatus(res.data.message);

//                     // 👇 show alert once when page loads
//                     // alert("Model is already installed");
//                 } else {
//                     setInstalled(false);
//                     setInstalled_(false);
//                     setStatus(res.data.message);

//                     // 👇 show alert once when page loads
//                     alert("Model is not installed");
//                 }
//             } catch (err) {
//                 console.error("Check failed:", err);
//                 setStatus("Error checking model");
//                 alert("Error checking model");
//             }
//         };
//         checkModel();
//     }, []);


//     const downloadModel = () => {
//         if (installed) {
//             // alert("Model already installed");
//             return;
//         }

//         const eventSource = new EventSource("http://127.0.0.1:8000/DownloadBigModel");
//         eventSource.onmessage = (e) => {
//             console.log("SSE message:", e.data);
//             const val = parseInt(e.data);

//             if (!isNaN(val)) {
//                 setProgress(val);
//             } else {
//                 setStatus(e.data);
//             }
//             if (e.data.includes("Successfully")) {
//                 setInstalled(true);
//                 eventSource.close();
//             }
//         };
//         eventSource.onerror = (err) => {
//             console.error("SSE error:", err);
//             setStatus("Download failed");
//             eventSource.close();
//         };
//     };

//     return (
//         <div className={false ? "download-container_hide" : "download-container" }>
//             <button
//                 className="download-btn"
//                 onClick={downloadModel}
//                 disabled={installed}
//             >
//                 {false ? <></> : <><img src={Donwload_webp} alt="" /></>}
//             </button>

//             {!installed && (
//                 <div className="progress-wrapper">
//                     <div className="progress-bar">
//                         <div
//                             className="progress-fill"
//                             style={{ width: `${progress}%` }}
//                         ></div>
//                     </div>
//                     <p className="progress-text">{progress}%</p>
//                     <p className="status-text">{status}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default DownloadModelButton;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DownloadBtn.css";
import Donwload_webp from "../../public/images/app_components/cloud-download_4007728.webp";

function DownloadModelButton({ setInstalled_ }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");
    const [installed, setInstalled] = useState(true);
    const [isInstalling, setisInstalling] = useState(false)

    useEffect(() => {
        const checkModel = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/CheckBigModel");
                if (res.status === 200 && res.data.installed) {
                    setInstalled(true);
                    setInstalled_(true);
                    setStatus(res.data.message);
                } else {
                    setInstalled(false);
                    setInstalled_(false);
                    setStatus(res.data.message);
                    alert("Model is not installed");
                }
            } catch (err) {
                console.error("Check failed:", err);
                setStatus("Error checking model");
                alert("Error checking model");
            }
        };
        checkModel();
    }, []);

    const downloadModel = () => {
        if (installed) return;
        setisInstalling(true)

        const eventSource = new EventSource("http://127.0.0.1:8000/DownloadBigModel");
        eventSource.onmessage = (e) => {
            const val = parseInt(e.data);
            if (!isNaN(val)) {
                setProgress(val);
                // setisInstalling(false)
            } else {
                setStatus(e.data);
                setisInstalling(false)
            }
            if (e.data.includes("Successfully")) {
                setInstalled(true);
                eventSource.close();
                setisInstalling(false)
            }
        };
        eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            setStatus("Download failed");
            setisInstalling(false)
            eventSource.close();
        };
    };

    return (
        <div className="circular-container">
            <div
                className="circular-progress"
                style={{ background: `conic-gradient(red ${progress * 3.6}deg, #ccc 0deg)` }}
            >
                <button
                    className="download-btn"
                    onClick={downloadModel}
                    disabled={installed}
                >
                    {
                        isInstalling ? (
                            <>
                            <div className="blank_blue">
                                
                            </div>
                            </>
                        ):(
                            <>
                            <img src={Donwload_webp} alt="download" />
                            </>
                        )
                    }
                    
                    {(!installed && isInstalling)  ? <span className="progress-text">{progress}%</span> : <></>}
                </button>
            </div>
            {/* <p className="status-text">{status} {progress}</p> */}
        </div>
    );
}

export default DownloadModelButton;
