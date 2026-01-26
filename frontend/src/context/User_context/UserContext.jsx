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

  const user_profile_toggle_fun = () => {

    setUser_Profile_toggle(!User_Profile_toggle)
    // alert(User_Profile_toggle)
  }
  const user_profile_close_fun = () => {

    setUser_Profile_toggle(false)
    // alert(User_Profile_toggle)
  }

  return (
    <div>
      <userDataContext.Provider value={{ user, setUser, user_profile_toggle_fun, User_Profile_toggle,user_profile_close_fun }}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
