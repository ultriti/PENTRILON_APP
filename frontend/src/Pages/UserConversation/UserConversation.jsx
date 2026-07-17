import React, { useEffect, useRef, useState } from "react";
import "./UserConversation.css";
import axios from "axios";

import Micro_chip_webp from "../../../public/images/app_components/micro-chip.webp";
import send_webp from "../../../public/images/app_components/arrow.webp";
import plus_webp from "../../../public/images/app_components/clip.png";
import check_webp from "../../../public/images/app_components/check.png";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownRenderer from "../../Components/message/MarkdownRenderer";

const UserConversation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isSending, setisSending] = useState(false);
  const [SendPromptValue, setSendPromptValue] = useState("");

  const [interaction, setinteraction] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const sendPrompt = async (e) => {
    e.preventDefault();
    if (!SendPromptValue.trim() && !selectedFile) return;
    setisLoading(true);
    setisSending(true);

    const formData = new FormData();
    formData.append("Prompt", SendPromptValue);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // user interaction
    setinteraction((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        message: `${SendPromptValue}`,
        title: `${SendPromptValue}`,
      },
    ]);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/GetUserPrompt",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.status == 200) {
        console.log("SendPromptValue:", SendPromptValue);

        setinteraction((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            message: res?.data?.message,
            title: res?.data?.text,
          },
        ]);

        setSendPromptValue("");
      }
    } catch (error) {
      console.error("API error:", error);
      setSendPromptValue("");
    } finally {
      setisLoading(false);
      setisSending(false);
      setSendPromptValue("");
    }
  };

  useEffect(() => {
    console.log("interaction :", interaction);
  }, [isLoading]);

  const formatText = (text) => {
    let inCodeBlock = false;
    let codeLines = [];

    return text.split("\n").map((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLines = [];
          return null;
        } else {
          inCodeBlock = false;
          return (
            <pre key={index}>
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
        }
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return null;
      }

      if (line.startsWith("### ")) {
        return <h3 key={index}>{line.slice(4)}</h3>;
      }

      if (line.startsWith("## ")) {
        return <h2 key={index}>{line.slice(3)}</h2>;
      }

      if (line.startsWith("# ")) {
        return <h1 key={index}>{line.slice(2)}</h1>;
      }

      if (line.startsWith("- ")) {
        return <div key={index}>• {line.slice(2)}</div>;
      }

      return <p key={index}>{line}</p>;
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="userConversationFrame">
      {/* title frame */}
      <div className="titleFrameHP">
        <div className="appName">Pentrilon</div>
        <div className="appFeatures"></div>
      </div>

      {/* user convo */}
      <div className="userConvoFrame noScrollBar">
        {console.log("interaction :", interaction)}

        <div className="userConvoFrameCont">
          {interaction
            ? interaction?.map((interaction, i) => (
                <div
                  className={`chatCont ${interaction.type === "user" ? "user" : "ai"}`}
                >
                  {interaction.type === "ai" ? (
                    <></>
                  ) : (
                    <div
                      className="copy_btn"
                      onClick={() => {
                        copyToClipboard(interaction?.message);
                      }}
                    >
                      {"</>"}
                    </div>
                  )}
                  <div
                    key={interaction.id}
                    className={
                      interaction.type === "ai" ? "aiConvo" : "userConvo"
                    }
                  >
                    {/* <MarkdownRenderer remarkPlugins={[remarkGfm]}>
                    {interaction.message}
                  </ReactMarkdown> */}

                    <MarkdownRenderer text={interaction?.message} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      {/* Ai input form */}
      <div className="aiInputFrame">
        <div className="aiInputFrameCont">
          <form className="aiInputform" onSubmit={sendPrompt}>
            <div className="topFrame">
              {/* inpur file */}
              <div className="Input_add_file_frame">
                {/* hidden file input */}
                <input
                  type="file"
                  className="Add_file_btn"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {/* image trigger */}
                {selectedFile ? (
                  <img
                    className="Check_img"
                    src={check_webp}
                    alt="File selected"
                    onClick={() => fileInputRef.current?.click()}
                  />
                ) : (
                  <img
                    className="Attach_img"
                    src={plus_webp}
                    alt="Attach file"
                    onClick={() => fileInputRef.current?.click()}
                  />
                )}
              </div>

              {/* ai user intercation inpur frame */}
              <textarea
                className="input noScrollBar"
                rows={1}
                placeholder="Type your message..."
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 24 * 15) + "px";
                  e.target.style.overflowY =
                    e.target.scrollHeight > 24 * 15 ? "auto" : "hidden";
                }}
                value={SendPromptValue}
                onChange={(e) => {
                  setSendPromptValue(e.target.value);
                }}
              ></textarea>

              {/* send button */}
              <div className="Input_Search_Btn_Frame">
                {isSending ? (
                  <svg
                    className="svg-spinner"
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                  >
                    <circle className="ring" cx="25" cy="25" r="20" />
                    <circle className="arc" cx="25" cy="25" r="20" />
                  </svg>
                ) : (
                  <button
                    className="AI_Speech_Rec_toggle_submit Label_send_data"
                    type="submit"
                  >
                    <img src={send_webp} alt="Send" />
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="inputFeatures">
            <div className="inFLeft">
              <button className="AI_Speech_Rec_toggle">
                <img src={Micro_chip_webp} alt="Micro_chip_webp" />
              </button>

              <button className="AI_Speech_Rec_toggle">
                <img src={Micro_chip_webp} alt="Micro_chip_webp" />
              </button>
            </div>

            <div className="inFLeft">
              <button className="AI_Speech_Rec_toggle">
                <img src={Micro_chip_webp} alt="Micro_chip_webp" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
