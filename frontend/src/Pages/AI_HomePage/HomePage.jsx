import React, { useState } from "react";
import ChatHistory from "../chatHistory/ChatHistory";
import "./HomePage.css";
import UserConversation from "../UserConversation/UserConversation";
import DownloadModelButton from "../../Components/DownloadModelBtn";
import downloaded_webp from "../../../public/images/app_components/upload (1).webp";
import wifi_webp from "../../../public/images/app_components/wifi_6532060.webp";

import axios from "axios";

const HomePage = () => {
  const [interaction, setinteraction] = useState(null);
  const [Installed_, setInstalled_] = useState(false);

  const pinging = async () => {
    const data = "hello";
    try {
      const res = await axios.get("http://127.0.0.1:8000/Ping", data, {
        withCredentials: true,
      });
      if (res.status == 200) {
        alert("working");
      } else {
        alert("tryagain pining");
      }
    } catch (error) {
      console.log("error", error);

      alert("Restarting Pentrilon Plesse wait");
    }
  };

  return (
    <div className="MainFrame">
      {/* 👈 UPDATED: Latest button with scroll function */}
      <button
        className="ping_btn_"
        onClick={() => {
          pinging();
        }}
      >
        <img src={wifi_webp} alt="" />
      </button>

      {Installed_ ? (
        <>
          <button className="Downloaded_blank_img_">
            <img src={downloaded_webp} alt="" />
          </button>
        </>
      ) : (
        <>
          <div className="download_model_button_">
            <DownloadModelButton setInstalled_={setInstalled_} />
          </div>
        </>
      )}

      {/* user history chat sidebar */}
      <div className="sidebarFrame">
        <ChatHistory />
      </div>

      {/* user conversaton frame */}
      <div className="userConversationFrame">
        <UserConversation setinteraction={setinteraction} />
      </div>
    </div>
  );
};

export default HomePage;
