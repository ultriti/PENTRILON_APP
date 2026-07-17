import React, { useContext } from 'react'
import "./User_Profile_frame.css"
import Profile_Frame from './Profile_Frame'
import { userDataContext } from '../../../context/User_context/UserContext';
import Account_frame from './Account_frame';
import Connections_frame from './Connections_frame';
import Personalize_Frame from './Personalize_Frame';
import About_Frame from './About_FRame';
import Module_frame from '../settings/Module_frame';


const User_Profile_frame = () => {
  const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, Feature_main_frame_toggle, activeSetting, setActiveSetting, setActiveSetting_Feature, activeSetting_Feature } = useContext(userDataContext);


  const renderSettingContent = () => {

    switch (activeSetting_Feature) {
      case 'About':
        return <About_Frame Frame_Title={"About"} />;
      case 'Profile':
        return <Profile_Frame Frame_Title={"Profile"} />
      case 'Privacy':
        return <Account_frame Frame_Title={"Privacy"} />

      // case 'Module':
      //   return <Module_frame Frame_Title={"Module"} />

      case 'Personalize':
        return <Personalize_Frame Frame_Title={"Personalize"} />

      default:
        return <Profile_Frame Frame_Title={"personalize"} />;
    }
  };


  return (
    <div className='User_Profile_frame'>

      <div className="Feature_Menu_left">

        <div className="Feature_Menu_Frame" onClick={() => { setActiveSetting_Feature('Personalize') }}>
          <p>{"Personalize"}</p>
        </div>
        <div className="Feature_Menu_Frame" onClick={() => { setActiveSetting_Feature('Profile') }}>
          <p>{"Profile"}</p>
        </div>
        <div className="Feature_Menu_Frame" onClick={() => { setActiveSetting_Feature('Privacy') }}>
          <p>{"Privacy"}</p>
        </div>
        <div className="Feature_Menu_Frame" onClick={() => { setActiveSetting_Feature('About') }}>
          <p>{"About"}</p>
        </div>

      </div>

      <div className="Feature_main_content">
        {renderSettingContent()}
      </div>

    </div>
  )
}

export default User_Profile_frame
