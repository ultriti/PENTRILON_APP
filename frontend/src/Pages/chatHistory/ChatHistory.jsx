import React from "react";
import AudioRingVisualizer from "../Automation/AI_audio_circular_wave";
import mic_webp from "../../../public/images/app_components/mic_10460989.webp";
import stop_rec_webp from "../../../public/images/app_components/stop_190523.webp";
import speaker_webp from "../../../public/images/app_components/volume_390920.webp";
import wifi_webp from "../../../public/images/app_components/wifi_6532060.webp";
import compose_webp from "../../../public/images/app_components/compose.webp";
import business_webp from "../../../public/images/app_components/business.webp";
import download_webp from "../../../public/images/app_components/download_5336468.webp";
import downloaded_webp from "../../../public/images/app_components/upload (1).webp";
import down_webp from "../../../public/images/app_components/down.webp";
import user_webp from "../../../public/images/app_components/user.webp";
import Micro_chip_webp from "../../../public/images/app_components/micro-chip.webp";

const ChatHistory = ({
  user_profile_close_fun,
  isSpeaking,
  clear_convo_LS,
  New_convo,
  interactions,
  user_profile_toggle_fun,
  setselectedConvo,
  selectedConvo
}) => {
  const userInfo = localStorage.getItem("UserDetail_Pentrilon");
  const UserDetail = JSON.parse(userInfo);

  return (
    <div className="History_Interact_Frame">
      <div
        className="AI_Voice_Response_Frame"
        onClick={() => {
          user_profile_close_fun();
        }}
      >
        <AudioRingVisualizer isSpeaking={isSpeaking} />
      </div>

      <div
        className="User_Interaction_features_frame"
        onClick={() => {
          user_profile_close_fun();
        }}
      >
        <button
          className="clear_convo_btn"
          onClick={() => {
            clear_convo_LS();
          }}
        >
          <img src={business_webp} alt="" />
        </button>
        <button
          className="clear_convo_btn"
          onClick={() => {
            New_convo();
          }}
        >
          <img src={compose_webp} alt="" />
        </button>
      </div>

      <div
        className="User_AI_intercation_History"
        onClick={() => {
          user_profile_close_fun();
        }}
      >
        <div className="User_AI_intercation_History_Cont">
          <div className="Conversation_Title_frame">
            <p>Conversation</p>
          </div>

          {interactions?.length > 0 &&
            interactions.map((interaction, i) => (
              <div
                className={
                  Number(selectedConvo) + 1 == interaction?.convo_id
                    ? "Conversation_Title_frame Conversation_Title_frame-active"
                    : "Conversation_Title_frame"
                }
                key={interaction?.id || interaction?.convo[0]?.timestamp || i}
                onClick={() => setselectedConvo(i)}
              >
                <p>
                  {interaction.convo[0]?.text?.slice(0, 50) ||
                    `Conversation ${i + 1}`}
                  {interaction.convo[0]?.text?.length > 50 && "..."}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div
        className="UserAccount_Frame"
        onClick={() => {
          user_profile_toggle_fun();
        }}
      >
        {/* user detail toggle frame */}

        <div className="Username_Info_Frame">
          <div className="User_Profile_Picture">
            <img src={user_webp} alt="" />
          </div>

          <div className="User_Username_Frame">
            <p className="Username_text">{"yashash"}</p>
            <p className="Plan_text">
              {UserDetail?.hasPremium ? "Verified" : "free plan"}
            </p>
          </div>

          <div className="Upgrade_Plan_frame">
            {UserDetail?.hasPremium ? (
              <></>
            ) : (
              <>
                <div className="upgrade_frame">{"Upgrade"}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
