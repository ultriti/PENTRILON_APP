import React, { use, useContext, useEffect, useState } from 'react'
import "./Profile_Frame.css"
import { userDataContext } from '../../../context/User_context/UserContext';

const Profile_Frame = ({ Frame_Title }) => {
  const [UserDetail, setUserDetail] = useState(null)
  const userDetail = localStorage.getItem("UserDetail_Pentrilon")
  const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, Feature_main_frame_toggle, activeSetting, setActiveSetting, setActiveSetting_Feature, activeSetting_Feature } = useContext(userDataContext);

  const userDetailFetch = () => {
    const userInfo = localStorage.getItem("UserDetail_Pentrilon")
    setUserDetail(JSON.parse(userInfo))
  }

  useEffect(() => {
    userDetailFetch()
  }, [])

  return (
    <div className='Profile_main_frame'>
      <div className="Profile_main_frame_cont">
        <div className="Menu_Feature_Title_frame">
          <p>{Frame_Title}</p>
        </div>

        <div className="Meanu_Feature_Main_Frame_Cont_">


          <div className="Main_Menu_Label_frame bottom_border">
            <p className='Menu_value_p'>Username</p>
            <p className='Username_value'>{UserDetail ? UserDetail?.username : "name not assigned"}</p>
          </div>

          <div className="Main_Menu_Label_frame">
            <p className='Menu_value_p'>ULTRITI</p>
            {
              userDetail ? (
                <>
                <button onClick={() => { alert("alredy Aigned") }} disabled>Logged In</button>
                </>

              ) : (
                <>

                  
                  <button onClick={() => { setActiveSetting('Login') }}>Sign in</button>

                </>
              )
            }
          </div>


          <div className="Main_Menu_Label_frame">
            <p className='Menu_value_p'>google</p>
            <button>Sign in</button>
          </div>

          <div className="Main_Menu_Label_frame">
            <p className='Menu_value_p'>Github</p>
            <button>Sign in</button>
          </div>

          <div className="Main_Menu_Label_frame mt-1">
            <p className='Username_value'>Delete Your accoount ?</p>
            <button>Delete</button>
          </div>


        </div>


      </div>
    </div>
  )
}

export default Profile_Frame
