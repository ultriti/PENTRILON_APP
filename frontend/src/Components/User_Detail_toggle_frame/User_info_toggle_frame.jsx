import React from 'react'
import "./User_info_toggle_frame.css"

const User_info_toggle_frame = () => {
    return (
        <div className="User_Profile_toggle_frame">

            <div className="User_account_info">
                <p className="Username_text">{"yashash"}</p>
                <p className="Plan_text">{"email@gmail.com"}</p>
            </div>

            <div className="pentrilon_feature_m_f">
                <div className="Pentrilon_feature_frame">
                    <p className="Username_text">{"settings"}</p>
                </div>
                <div className="Pentrilon_feature_frame">
                    <p className="Username_text">{"QNA"}</p>
                </div>
                <div className="Pentrilon_feature_frame">
                    <p className="Username_text">{"feedback"}</p>
                </div>
            </div>

            <div className="Plan_app_frame">
                <div className="Pentrilon_feature_frame">
                    <p className="Username_text">{"Modules"}</p>
                </div>
                <div className="Pentrilon_feature_frame">
                    <p className="Username_text">{"Online Chat"}</p>
                </div>

            </div>

            <div className="signout_frame_">
                <button className="Pentrilon_feature_frame">
                    <p className="Username_text">{"Sign Out"}</p>
                </button>

            </div>

            <div className="terms_and_condition_frame">
                <p>Privacy</p>
                <p>Terms</p>
                <p>FAQ</p>
                    
                    

            </div>


        </div>
    )
}

export default User_info_toggle_frame
