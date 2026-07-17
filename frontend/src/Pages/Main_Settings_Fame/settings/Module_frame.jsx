import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ModuleFrame.css";
import No_Wifi_Webp from "../../../../public/images/app_components/no-internet_12320442.webp"

const Module_frame = ({ Frame_Title }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");
    const [installed, setInstalled] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);

    useEffect(() => {
        const checkModel = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/CheckBigModel");
                if (res.status === 200 && res.data.installed) {
                    setInstalled(true);
                    setStatus(res.data.message);
                } else {
                    setInstalled(false);
                    setStatus(res.data.message);
                }
            } catch (err) {
                console.error("Check failed:", err);
                setStatus("Error checking model");
            }
        };
        checkModel();
    }, []);

    const downloadModel = () => {
        if (installed) return;
        setIsInstalling(true);
        setStatus("Downloading...");

        const eventSource = new EventSource("http://127.0.0.1:8000/DownloadBigModel");

        eventSource.onmessage = (e) => {
            const val = parseInt(e.data);
            if (!isNaN(val)) {
                setProgress(val);
            } else {
                setStatus(e.data);
                setIsInstalling(false);
            }
            if (e.data.includes("Successfully")) {
                setInstalled(true);
                setIsInstalling(false);
                setStatus("Successfully Installed");
                eventSource.close();
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            setStatus("Download failed");
            setIsInstalling(false);
            eventSource.close();
        };
    };

    const cancelDownload = () => {
        setIsInstalling(false);
        setProgress(0);
        setStatus("Cancelled");
        // Note: SSE cancellation requires server support (closing EventSource here stops client listening)
    };

    return (
        <div className='Personalize_main_frame'>
            <div className="Personalize_main_frame_cont">

                <div className="Menu_Feature_Title_frame">
                    <p>{Frame_Title}</p>
                </div>

                <div className="Meanu_Feature_Main_Frame_Cont">
                    <div className="Meanu_Feature_Main_Frame_Cont_ ">

                        <div className="Main_Menu_Label_frame ">

                            <div className="Module_App_image_frame">
                                <img src={No_Wifi_Webp} alt="" />
                            </div>
                            

                            <div className="Progress_bar_frame px-1">
                                <p className='Menu_value_p'>Vosk Offline Agent {progress > 0 && <span className="progress-text"> {progress}%</span>}</p>
                                
                                <div className="Progress_bar_frame_cont">
                                    
                                    <div 
                                        className="Progress_bar_fill" 
                                        style={{ width: `${progress}%` }}
                                    >
                                    </div>
                                </div>
                                {/* <p>{status}</p> */}
                            </div>

                            {!installed && !isInstalling && (
                                <button onClick={downloadModel}>Install</button>
                            )}
                            {isInstalling && (
                                <button onClick={cancelDownload}>Cancel</button>
                            )}
                            {installed && (
                                <button disabled>Installed</button>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Module_frame;
