import React from 'react'
import "./Personalize_Frame.css"
import "./User_Profile_frame.css"

const Personalize_Frame = ({ Frame_Title }) => {
  return (
    <div className='Personalize_main_frame'>
      <div className="Personalize_main_frame_cont">
        <div className="Menu_Feature_Title_frame">
          <p>{Frame_Title}</p>
        </div>

        <div className="Meanu_Feature_Main_Frame_Cont">
          <div className="Meanu_Feature_Main_Frame_Cont_">

            <div className="Main_Menu_Label_frame">
              <p className='Menu_value_p'>Assistant Voice</p>
              <button>Joy</button>
            </div>
            <div className="Main_Menu_Label_frame">
              <p className='Menu_value_p'>Theme</p>
              <button>Dark</button>
            </div>
            <div className="Main_Menu_Label_frame">
              <p className='Menu_value_p'>Language</p>
              <button>Eng</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Personalize_Frame
