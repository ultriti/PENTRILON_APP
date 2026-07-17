import React, { useContext } from 'react'
import "./Pentrilon_feature_frame_.css"
import { userDataContext } from '../../context/User_context/UserContext';
import Register from '../../Pages/Auth/RegisterPage';
import Login from '../../Pages/Auth/LoginPage';
import User_Profile_frame from '../../Pages/Main_Settings_Fame/User Profile frame/User_Profile_frame';
import Module_frame from '../../Pages/Main_Settings_Fame/settings/Module_frame';

const Pentrilon_feature_frame = () => {
  const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, Feature_main_frame_toggle, activeSetting, setActiveSetting } = useContext(userDataContext);


  const renderSettingContent = () => {

    switch (activeSetting) {
      case 'Register':
        return <Register />;
      case 'Login':
        return <Login />

      case 'Module':
        return <Module_frame activeSetting={activeSetting} />

      case 'Profile':
        return <User_Profile_frame activeSetting={activeSetting} />

      default:
        return <Login />;
    }
  };

  return (
    <div className='Pentrilon_multi_feature_cont' >
      <div className="Pentrilon_multi_feature_cont_2">

        {/* --------> exit frame */}
        <div className="Exit_frame_PFF">

          <div className="_Feature_Name_">
            {activeSetting}
          </div>
          <div className="exit_frame_btn" onClick={() => { user_feature_close_fun() }}>
            x
          </div>
        </div>

        {/* --------------> main main feature frame */}
        <div className="AI_Main_Overlay_feature_frame">

          {renderSettingContent()}

        </div>


      </div>
    </div>
  )
}

export default Pentrilon_feature_frame
