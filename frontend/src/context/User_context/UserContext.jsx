import React, { createContext, useState } from 'react'

export const userDataContext = createContext()

const UserContext = ({ children }) => {

  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: ""
    },
    token: ''
  })

  const [User_Profile_toggle, setUser_Profile_toggle] = useState(false)
  const [Feature_main_frame_toggle, setFeature_main_frame_toggle] = useState(false)
  const [activeSetting, setActiveSetting] = useState(null);
  const [activeSetting_Feature, setActiveSetting_Feature] = useState(null);
  const [ActiveSettings_Features_text, setActiveSettings_Features_] = useState("")

  const [UserDetail, setUserDetail] = useState(null)

  const user_profile_toggle_fun = () => {

    setUser_Profile_toggle(!User_Profile_toggle)
  }
  const user_profile_close_fun = () => {
    setUser_Profile_toggle(false)
  }

  // -------> pentrilon feature frame
  const user_Feature_toggle_fun = () => {

    setFeature_main_frame_toggle(true)
  }
  const user_feature_close_fun = () => {
    setFeature_main_frame_toggle(false)
  }

  const userDetailFetch = () => {
      const userInfo = localStorage.getItem("UserDetail_Pentrilon")
      setUserDetail(JSON.parse(userInfo))
      return JSON.parse(userInfo)
    }
  


  return (
    <div>
      <userDataContext.Provider value={{ setActiveSetting_Feature,userDetailFetch,UserDetail, activeSetting_Feature, setActiveSetting, activeSetting, user, setUser, user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_Feature_toggle_fun, user_feature_close_fun, Feature_main_frame_toggle }}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
