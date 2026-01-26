import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HomePage.css";

import { speak, speak_Info, stopSpeaking } from "../../Components/Util.speech.js";
import Search_Bar_auto from "../Automation/Automate_chrome.js";
import {
  startSpeechRecognition,
  stopSpeechRecognition,
} from "../../Components/speech_recognition.js";

import mic_webp from "../../../public/images/app_components/mic_10460989.webp"
import stop_rec_webp from "../../../public/images/app_components/stop_190523.webp"
import speaker_webp from "../../../public/images/app_components/volume_390920.webp"
import wifi_webp from "../../../public/images/app_components/wifi_6532060.webp"
import compose_webp from "../../../public/images/app_components/compose.webp"
import business_webp from "../../../public/images/app_components/business.webp"
import download_webp from "../../../public/images/app_components/download_5336468.webp"
import downloaded_webp from "../../../public/images/app_components/upload (1).webp"
import down_webp from "../../../public/images/app_components/down.webp"
import user_webp from "../../../public/images/app_components/user.webp"

import SearchBarComp from "../../Components/SearchBarComp.jsx";
import DownloadModelButton from "../../Components/DownloadModelBtn.jsx";
import AudioRingVisualizer from "../Automation/AI_audio_circular_wave.jsx";

const Homepage = () => {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const interactFrameRef = useRef(null); // 👈 NEW: Added for scrolling

  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setisSpeaking] = useState(false)

  const [AI_Speak_Msg, setAI_Speak_Msg] = useState("")
  const [spoken, setspoken] = useState(false)
  const [setTimer_, setsetTimer_] = useState(10000)

  const [stop_speech_rec, setstop_speech_rec] = useState(false)
  const [AI_Response_Info, setAI_Response_Info] = useState("")
  const [AI_respond, setAI_respond] = useState(null)
  const [Image_res, setImage_res] = useState(null)

  const [isAI_Speaking, setIsAI_Speaking] = useState(false);

  const [Installed_, setInstalled_] = useState(false);

  const [Conversation, setConversation] = useState([])
  const [IsNewConvo, setIsNewConvo] = useState(false)
  const [convoLen, setconvoLen] = useState(0)
  const [selectedConvo, setselectedConvo] = useState(null)
  const [interactions, setinteractions] = useState([])


  // 👈 NEW: Scroll function
  const scrollToLatestConvo = useCallback(() => {
    const latestConvo = document.getElementById('latest_convo');
    if (latestConvo && interactFrameRef.current) {
      latestConvo.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, []);



  const PentrilonSpeaker = (text) => {
    setisSpeaking(true);
    speak(text || "hello", () => setisSpeaking(false));
  };

  const Pentrilonspeak_Info = (text) => {
    setisSpeaking(true);
    speak_Info(text || "hello", () => setisSpeaking(false));
  };

  const StartRecording = async () => {
    setIsRecording(true);
    const data = { da: "hello" };
    const res = await axios.post("http://127.0.0.1:8000/getUserAudio", data, { withCredentials: true });

    if (res.status === 200) {
      console.log("Transcription:", res.data);
      PentrilonSpeaker(String(res.data.text));
      setAI_Speak_Msg(res.data.text);
      setAI_respond(res.data.info)
      setAI_Response_Info(res.data.info)
      setIsRecording(false);

      if (String(res.data.text).includes("edge")) {
        PentrilonSpeaker("Shall I search for you in Browser");
        setAI_Speak_Msg("Shall I search for you in Edge... (yes / no)");

        setspoken(false);

        setTimeout(async () => {
          console.log('spek no2');

          const get_text_ = async () => {
            const data_ = {
              data: "hey"
            }

            try {
              const A2Text = await axios.post("http://127.0.0.1:8000/GetAudio_To_Text", data_, { withCredentials: true });

              if (A2Text.status == 200) {
                setAI_Speak_Msg(A2Text.data.message);

                setInteraction(data_)
                setspoken(true); // user spoke
                setstop_speech_rec(true)

                console.log('A2Text.data.message', A2Text.data.message);

                if (A2Text.data.message.includes("yes")) {
                  Search_Bar_auto();
                }
                else if (String(A2Text.data.message) == String("none")) {
                  get_text_()
                }

              } else {
                alert(A2Text.data.error)
              }

            } catch (error) {
              console.log('error', error);
              alert("internal error")
            }
          }

          get_text_()
        }, 2000);
      }
    }
  };

  const StopRecording = () => {
    console.log('wait');
    // stopSpeaking()
  }

  const pinging = async () => {
    const data = "hello"
    try {
      const res = await axios.get("http://127.0.0.1:8000/Ping", data, { withCredentials: true });
      if (res.status == 200) {
        alert("working")
      } else {
        alert("tryagain pining")
      }

    } catch (error) {
      console.log('error', error);

      alert("Restarting Pentrilon Plesse wait")
    }
  }

  const New_convo = useCallback(() => {
    setIsNewConvo(true);
    localStorage.setItem("convo_new", "1");
    setselectedConvo(null);

    const interact = JSON.parse(localStorage.getItem("AI_interact") || "[]");
    setinteractions(interact);

    let convo_num = parseInt(localStorage.getItem("convo_num") || "0", 10) + 1;
    localStorage.setItem("convo_num", convo_num.toString());
    setconvoLen(convo_num);

    setAI_Response_Info("");
    setAI_respond("");
  }, []);

  const clear_convo_LS = () => {
    localStorage.removeItem("AI_interact")
    setAI_Response_Info("")
    setAI_respond("")
  }

  useEffect(() => {
    if (Conversation?.length > 0) {
      scrollToLatestConvo();
    }
  }, [Conversation?.length, scrollToLatestConvo]);


  useEffect(() => {
    const getlocal = localStorage.getItem("AI_interact");

    let interactions = getlocal ? JSON.parse(getlocal) : [];

    const len = selectedConvo ? selectedConvo : convoLen

    setConversation(interactions[convoLen] ? interactions[len].convo : [])

    const interact = JSON.parse(localStorage.getItem("AI_interact") || "[]");
    setinteractions(interact);

    localStorage.setItem("selectedConvo", selectedConvo)
  }, [AI_respond, AI_Response_Info, selectedConvo])

  return (
    <div className="HomePage_frame">
      <div className="HomePage_cont">

        {/* 👈 UPDATED: Latest button with scroll function */}
        <button className="ping_btn" onClick={() => { pinging() }}>
          <img src={wifi_webp} alt="" />
        </button>


        {
          Installed_
            ? (
              <>
                <button className="Downloaded_blank_img">
                  <img src={downloaded_webp} alt="" />
                </button>
              </>
            ) : (
              <>
                <div className="download_model_button">
                  <DownloadModelButton setInstalled_={setInstalled_} />
                </div>
              </>
            )
        }

        {/* ------------------------> interaction history frame  */}
        <div className="History_Interact_Frame">

          <div className="AI_Voice_Response_Frame">
            <AudioRingVisualizer isSpeaking={isSpeaking} />
          </div>

          <div className="User_Interaction_features_frame">

            <button className="clear_convo_btn" onClick={() => { clear_convo_LS() }}>
              <img src={business_webp} alt="" />
            </button>
            <button className="clear_convo_btn" onClick={() => { New_convo() }}>
              <img src={compose_webp} alt="" />
            </button>

          </div>

          <div className="User_AI_intercation_History">
            <div className="User_AI_intercation_History_Cont">

              <div className="Conversation_Title_frame">
                <p>Conversation</p>
              </div>

              {interactions?.length > 0 && interactions.map((interaction, i) => (
                <div
                  className={Number(selectedConvo) + 1 == interaction?.convo_id ? "Conversation_Title_frame Conversation_Title_frame-active" : "Conversation_Title_frame"}
                  key={interaction?.id || interaction?.convo[0]?.timestamp || i}
                  onClick={() => setselectedConvo(i)}
                >
                  <p>
                    {interaction.convo[0]?.text?.slice(0, 50) || `Conversation ${i + 1}`}
                    {interaction.convo[0]?.text?.length > 50 && '...'}
                  </p>
                </div>
              ))}

            </div>
          </div>

          <div className="UserAccount_Frame">
            <div className="Username_Info_Frame">

              <div className="User_Profile_Picture">
                <img src={user_webp} alt="" />
              </div>

              <div className="User_Username_Frame">
                <p className="Username_text">{"yashash"}</p>
                <p className="Plan_text">{"free plan"}</p>
              </div>

              <div className="Upgrade_Plan_frame">
                <div className="upgrade_frame">{"Upgrade"}</div>
              </div>

            </div>
          </div>

        </div>

        {/* --------------------> ai user intercation frame */}
        <div className="Pentrilon_Interact_Frame">
          <div className="Pentrilon_Agent_Frame">
            <p>Pentrilon Agent: {AI_Speak_Msg} {AI_Speak_Msg ? ". . ." : ""} </p>
          </div>

          <div
            className={Conversation?.length > 0 ? "Interact_comp  Interact_comp_SB" : "Interact_comp"}
            ref={interactFrameRef}
          >

            {
              Conversation ? (
                <div className={Conversation?.length > 0 ? "AI_Response_Info_Frame AI_Response_Info_Frame_h" : "AI_Response_Info_Frame"}>
                  <button
                    className="Latest_btn"
                    onClick={scrollToLatestConvo}
                  >
                    <img src={down_webp} alt="Go to latest conversation" />
                  </button>
                  {
                    Conversation ? Conversation?.map((convo, i) =>
                    (
                      <div className={convo.id == 1202 ? "ai_res_container" : "ai_res_container_user"} key={i}>

                        <div className="AI_Res_info_frame">

                          <div className="AI_Res_info_cont">

                            {
                              convo?.image ? (
                                <div className="AI_res_image_prov">
                                  <img src={`${convo?.image}`} alt="" className="file_prov_user" />
                                </div>
                              ) : (
                                <></>
                              )
                            }

                            <div className={convo?.id == 1202 ? "AI_Res_info_frame_cont" : "AI_Res_info_frame_cont_user"}>
                              <div className={convo?.id == 1202 ? "AI_Res_info_frame_cont_2" : "AI_Res_info_frame_cont_2_user"}>
                                {convo?.info}
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>

                    )) : (<></>)
                  }

                  <div className="Conversation_Title_frame" id="latest_convo">
                    {/* <p>Latest conversation content here...</p>  */}
                  </div>
                </div>
              ) : (
                <></>
              )
            }

            {/* user send prompt from  */}
            <div className={AI_Response_Info ? "User_interaction_frame" : "User_interaction_frame User_interaction_frame_top"}>

              <div className="user_input_label">

                <div className="_top_">
                  <SearchBarComp
                    setAI_Speak_Msg={setAI_Speak_Msg}
                    setAI_respond={setAI_respond}
                    setAI_Response_Info={setAI_Response_Info}
                    setImage_res={setImage_res}
                    IsNewConvo={IsNewConvo}
                  />

                  {/* ai interact buttons  */}
                  {/* <div className="User_insteract_btns">

                    <button className="AI_Speech_Rec_toggle" onClick={isRecording ? StopRecording : StartRecording}>
                      {
                        isRecording ? (<><img src={stop_rec_webp} alt="" /></>) : (<><img src={mic_webp} alt="" /></>)
                      }
                    </button>

                    <button
                      className="AI_Speech_Rec_toggle"
                      onClick={() => {
                        if (isSpeaking) {
                          // alert("Already speaking");
                          stopSpeaking()
                          setisSpeaking(false)
                        } else {
                          {
                            AI_respond ? Pentrilonspeak_Info(AI_respond || AI_Speak_Msg) :
                              PentrilonSpeaker(AI_Speak_Msg ? AI_Speak_Msg : " how are you, my name is Pentrilon")
                          }
                        }
                      }}
                    >

                      {isSpeaking ? (
                        <img src={stop_rec_webp} alt="Stop speaking" />
                      ) : (
                        <img src={speaker_webp} alt="Speak" />
                      )}

                    </button>

                  </div> */}
                </div>

                <div className="Input_Features_frame">

                  <div className="Input_Feature_Left">
                    <button className="AI_Speech_Rec_toggle" onClick={isRecording ? StopRecording : StartRecording}>
                      {
                        isRecording ? (<><img src={stop_rec_webp} alt="" /></>) : (<><img src={mic_webp} alt="" /></>)
                      }
                    </button>
                    <button className="AI_Speech_Rec_toggle" onClick={isRecording ? StopRecording : StartRecording}>
                      {
                        isRecording ? (<><img src={stop_rec_webp} alt="" /></>) : (<><img src={mic_webp} alt="" /></>)
                      }
                    </button>
                  </div>

                  <div className="Input_Feature_Right">

                    <button className="AI_Speech_Rec_toggle" onClick={isRecording ? StopRecording : StartRecording}>
                      {
                        isRecording ? (<><img src={stop_rec_webp} alt="" /></>) : (<><img src={mic_webp} alt="" /></>)
                      }
                    </button>

                    <button className="AI_Speech_Rec_toggle" onClick={isRecording ? StopRecording : StartRecording}>
                      {
                        isRecording ? (<><img src={stop_rec_webp} alt="" /></>) : (<><img src={mic_webp} alt="" /></>)
                      }
                    </button>
                    <button
                      className="AI_Speech_Rec_toggle"
                      onClick={() => {
                        if (isSpeaking) {
                          // alert("Already speaking");
                          stopSpeaking()
                          setisSpeaking(false)
                        } else {
                          {
                            AI_respond ? Pentrilonspeak_Info(AI_respond || AI_Speak_Msg) :
                              PentrilonSpeaker(AI_Speak_Msg ? AI_Speak_Msg : " how are you, my name is Pentrilon")
                          }
                        }
                      }}
                    >

                      {isSpeaking ? (
                        <img src={stop_rec_webp} alt="Stop speaking" />
                      ) : (
                        <img src={speaker_webp} alt="Speak" />
                      )}

                    </button>

                  </div>

                </div>


              </div>



            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default Homepage;
