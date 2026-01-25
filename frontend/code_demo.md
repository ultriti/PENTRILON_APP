// import React, { useState, useRef } from 'react'
// import "./SearchBarComp.css"
// import axios from 'axios'

// import send_webp from "../../public/images/app_components/send.webp"
// import plus_webp from "../../public/images/app_components/clip.png"
// import check_webp from "../../public/images/app_components/check.png"

// const SearchBarComp = ({ setAI_Speak_Msg, setAI_respond, setAI_Response_Info, setImage_res }) => {
//     const [SendPromptValue, setSendPromptValue] = useState("")
//     const [selectedFile, setSelectedFile] = useState(null)
//     const fileInputRef = useRef(null)
//     const [FileSelected, setFileSelected] = useState(false)



//     const [isSending, setisSending] = useState(false)


//     const setInteraction = (message, isNewConvo = false) => {
//         const getlocal = localStorage.getItem("AI_interact");
//         let interactions = getlocal ? JSON.parse(getlocal) : [];

//         if (isNewConvo || interactions.length === 0) {
//             // Start a new conversation
//             const convo_id = interactions.length + 1;
//             const newConvo = {
//                 convo_id: convo_id,
//                 convo: [message]
//             };
//             interactions.push(newConvo);
//         } else {
//             // Add to the latest conversation
//             const lastConvo = interactions[interactions.length - 1];
//             lastConvo.convo.push(message);
//         }

//         localStorage.setItem("AI_interact", JSON.stringify(interactions));
//     };


//     const Send_Prompt = async (e) => {
//         e.preventDefault()
//         setisSending(true)

//         const formData = new FormData()
//         formData.append("Prompt", SendPromptValue)
//         if (selectedFile) {
//             formData.append("file", selectedFile)
//         }

//         console.log("FormData being sent:", {
//             Prompt: SendPromptValue,
//             file: selectedFile ? {
//                 name: selectedFile.name,
//                 type: selectedFile.type,
//                 size: selectedFile.size
//             } : null
//         })

//         const data_user = {
//             id: 1205,
//             text: SendPromptValue,
//             info: SendPromptValue,
//             image: null
//         }
//         setInteraction(data_user)

//         if (SendPromptValue !== "" || selectedFile) {
//             try {
//                 const res = await axios.post("http://127.0.0.1:8000/GetUserPrompt", formData, {
//                     withCredentials: true,
//                     headers: { "Content-Type": "multipart/form-data" }
//                 })

//                 if (res.status === 200) {
//                     console.log('res -> text,res', res);

//                     if (res.data.status === "incomplete") {
//                         if (selectedFile) {
//                             const url = URL.createObjectURL(selectedFile);
//                             setImage_res(url)
//                             const data_ = {
//                                 id: 1202,
//                                 text: res.data.text,
//                                 info: res.data.info,
//                                 image: url
//                             }
//                             setInteraction(data_)
//                         } else {
//                             alert("else")
//                             const data_ = {
//                                 id: 1202,
//                                 text: res.data.text,
//                                 info: res.data.info || res.data.text,
//                                 image: null
//                             }
//                             setInteraction(data_)
//                         }


//                         setAI_Speak_Msg(res.data.text)
//                         setAI_respond(res.data.info)
//                         setAI_Response_Info(res.data.info)
//                         // const data_ = {
//                         //     id: 1202,
//                         //     text: res.data.text,
//                         //     info: res.data.info || res.data.text,
//                         //     image: null
//                         // }
//                         // setInteraction(data_)



//                         setSelectedFile(null)
//                         setisSending(false)
//                     } else {
//                         if (selectedFile) {
//                             const url = URL.createObjectURL(selectedFile);
//                             setImage_res(url)
//                             const data_ = {
//                                 id: 1202,
//                                 text: res.data.text,
//                                 info: res.data.info,
//                                 image: url
//                             }
//                             setInteraction(data_)
//                         } else {
//                             const data_ = {
//                                 id: 1202,
//                                 text: res.data.text,
//                                 info: res.data.info || res.data.text,
//                                 image: null
//                             }
//                             setInteraction(data_)
//                         }
//                         setAI_Speak_Msg(res.data.text || res.data.message)
//                         setAI_respond(res.data.info)
//                         setAI_Response_Info(res.data.info)
//                         setSelectedFile(null)
//                         setisSending(false)


//                     }
//                 } else {
//                     setAI_Speak_Msg(res.data.error)
//                     setAI_respond(res.data.error)
//                     setAI_Response_Info("")
//                     setSelectedFile(null)
//                     setisSending(false)

//                 }
//                 setSendPromptValue("")
//                 setSelectedFile(null)
//                 setisSending(false)
//             } catch (error) {
//                 console.log("error", error)
//                 alert("internal error")
//                 setSelectedFile(null)
//                 setisSending(false)
//             }
//         }
//     }

//     return (
//         <div className="SearchBarComp_frame">
//             <form onSubmit={Send_Prompt}>
//                 <div className="Input_add_file_frame">
//                     {/* hidden file input */}
//                     <input
//                         type="file"
//                         className="Add_file_btn"
//                         style={{ display: "none" }}
//                         ref={fileInputRef}
//                         onChange={(e) => setSelectedFile(e.target.files[0])}
//                     />
//                     {/* image trigger */}
//                     {
//                         selectedFile ? (
//                             <>
//                                 <img
//                                     className='Check_img'
//                                     src={check_webp}
//                                     alt="Upload"
//                                     onClick={() => fileInputRef.current.click()}
//                                 />
//                             </>
//                         ) : (
//                             <>
//                                 <img
//                                     className='Attach_img'
//                                     src={plus_webp}
//                                     alt="Upload"
//                                     onClick={() => fileInputRef.current.click()}
//                                 />
//                             </>)
//                     }

//                 </div>

//                 <div className="Search_Bar_Label">
//                     <input
//                         className="Promt_Input_"
//                         value={SendPromptValue}
//                         type="text"
//                         placeholder="enter your search"
//                         onChange={(e) => setSendPromptValue(e.target.value)}
//                     />
//                 </div>

//                 <div className="Input_Search_Btn_Frame">
//                     {
//                         isSending ? (
//                             <>
//                                 <svg class="svg-spinner" viewBox="0 0 50 50" aria-hidden="true">
//                                     <circle class="ring" cx="25" cy="25" r="20" />
//                                     <circle class="arc" cx="25" cy="25" r="20" />
//                                 </svg>
//                             </>
//                         ) : (
//                             <>
//                                 <button
//                                     className="AI_Speech_Rec_toggle Label_send_data"
//                                     type="submit"
//                                 >
//                                     <img src={send_webp} alt="" />
//                                 </button>
//                             </>
//                         )
//                     }

//                 </div>
//             </form>
//         </div>
//     )
// }

// export default SearchBarComp