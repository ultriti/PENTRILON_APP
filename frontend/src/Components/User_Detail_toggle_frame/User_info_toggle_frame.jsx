import React, { useContext, useEffect, useState } from 'react'
import "./User_info_toggle_frame.css"
import { userDataContext } from '../../context/User_context/UserContext';

const User_info_toggle_frame = () => {
    const [UserDetail, setUserDetail] = useState(null)
    const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, activeSetting, setActiveSetting, setActiveSetting_Feature } = useContext(userDataContext);

    const SignOut = () => {
        localStorage.removeItem("UserDetail_Pentrilon")
        alert("user Logged out")
        user_feature_close_fun()
        user_profile_close_fun()
    }

    const userDetailFetch = () => {
        const userInfo = localStorage.getItem("UserDetail_Pentrilon")
        setUserDetail(JSON.parse(userInfo))
    }

    useEffect(() => {
        userDetailFetch()
    }, [])




    return (
        <div className="User_Profile_toggle_frame">

            <div
                className="User_account_info"
                onClick={() => {
                    if (UserDetail) {
                        user_Feature_toggle_fun();
                        user_profile_close_fun();
                        setActiveSetting("Profile");
                        setActiveSetting_Feature("Profile");
                    } else {
                        user_Feature_toggle_fun();
                        user_profile_close_fun();
                        setActiveSetting("Login");
                    }
                }}
            >

                <p className="Username_text">{UserDetail ? UserDetail.username : "name not found"}</p>
                <p className="Plan_text">{UserDetail ? UserDetail.email : "email not found"}</p>
            </div>


            {
                UserDetail ? (
                    <div className="pentrilon_feature_m_f">
                        <div className="Pentrilon_feature_frame" onClick={() => { user_Feature_toggle_fun(), user_profile_close_fun(), setActiveSetting('Profile'), setActiveSetting_Feature("Personalize") }}>
                            <p className="Username_text">{"settings"}</p>
                        </div>
                        <div className="Pentrilon_feature_frame" onClick={() => { user_Feature_toggle_fun(), setActiveSetting('Login') }}>
                            <p className="Username_text">{"QNA"}</p>
                        </div>
                        <div className="Pentrilon_feature_frame">
                            <p className="Username_text">{"feedback"}</p>
                        </div>
                    </div>
                ) :
                    (
                        <></>
                    )
            }


            {
                UserDetail ? (
                    <div className="Plan_app_frame">
                        <div className="Pentrilon_feature_frame" onClick={() => { user_Feature_toggle_fun(), setActiveSetting('Module'), user_profile_close_fun() }}>
                            <p className="Username_text">{"Modules"}</p>
                        </div>
                        <div className="Pentrilon_feature_frame">
                            <p className="Username_text">{"Upgrade"}</p>
                        </div>

                    </div>
                ) : (
                    <></>
                )
            }


            <div className="signout_frame_">
                <button className="Pentrilon_feature_frame" onClick={() => { SignOut() }}>
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
