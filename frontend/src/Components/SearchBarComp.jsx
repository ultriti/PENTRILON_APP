import React, { useState, useRef, useCallback } from 'react'
import "./SearchBarComp.css"
import axios from 'axios'

import send_webp from "../../public/images/app_components/arrow.webp"
import plus_webp from "../../public/images/app_components/clip.png"
import check_webp from "../../public/images/app_components/check.png"

const SearchBarComp = ({ setAI_Speak_Msg, setAI_respond, setAI_Response_Info, setImage_res, IsNewConvo }) => {
    const [SendPromptValue, setSendPromptValue] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)
    const [isSending, setisSending] = useState(false)

    const loadInteractions = useCallback(() => {
        try {
            const getlocal = localStorage.getItem("AI_interact");
            return getlocal ? JSON.parse(getlocal) : [];
        } catch {
            return [];
        }
    }, []);

    const saveInteractions = useCallback((interactions) => {
        try {
            localStorage.setItem("AI_interact", JSON.stringify(interactions));
        } catch (e) {
            console.error("Failed to save interactions:", e);
        }
    }, []);

    const setInteraction = useCallback((message, isNewConvo = IsNewConvo) => {

        const interactions = loadInteractions();
        const new_convo = localStorage.getItem("convo_new")
        const selected_convo_id = localStorage.getItem("selectedConvo")
        // alert(isNewConvo,new_convo)

        if (selected_convo_id != String(null)) {

            for (let index = 0; index < interactions?.length; index++) {

                if (interactions[index].convo_id == Number(selected_convo_id)+1) {
                    const lastConvo = interactions[Number(selected_convo_id)];

                    // if()
                    lastConvo.convo.push(message);
                    localStorage.setItem("selected convo_new", 0)
                } else {
                    // alert("error adding msg")
                }



            }

        } else {
            if (new_convo == 1 || interactions?.length === 0) {

                const convo_id = interactions?.length + 1;
                const newConvo = {
                    convo_id: convo_id,
                    convo: [message]
                };
                interactions.push(newConvo);
                localStorage.setItem("convo_new", 0)
            } else {

                const lastConvo = interactions[interactions?.length - 1];

                lastConvo.convo.push(message);
                localStorage.setItem("convo_new", 0)
            }
        }



        saveInteractions(interactions);
    }, [loadInteractions, saveInteractions]);

    const createAiMessageData = useCallback((text, info, imageUrl) => ({
        id: 1202,
        text,
        info: info || text,
        image: imageUrl || null
    }), []);

    const Send_Prompt = async (e) => {
        e.preventDefault()
        if ((!SendPromptValue.trim() && !selectedFile)) return;

        setisSending(true)

        const formData = new FormData()
        formData.append("Prompt", SendPromptValue)
        if (selectedFile) {
            formData.append("file", selectedFile)
        }

        console.log("FormData being sent:", {
            Prompt: SendPromptValue,
            file: selectedFile ? {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size
            } : null
        })

        const data_user = {
            id: 1205,
            text: SendPromptValue,
            info: SendPromptValue,
            image: null
        }
        setInteraction(data_user)

        try {
            const res = await axios.post("http://127.0.0.1:8000/GetUserPrompt", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.status === 200) {
                const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;
                if (imageUrl) setImage_res(imageUrl);

                const data_ai = createAiMessageData(res.data.text, res.data.info, imageUrl);
                setInteraction(data_ai);

                setAI_Speak_Msg(res.data.text);
                setAI_respond(res.data.info);
                setAI_Response_Info(res.data.info);
            } else {
                setAI_Speak_Msg(res.data.error || "Unknown error");
                setAI_respond(res.data.error || "Unknown error");
                setAI_Response_Info("");
            }
        } catch (error) {
            console.error("API error:", error);
            setAI_Speak_Msg("Internal server error");
            setAI_respond("Internal server error");
            setAI_Response_Info("");
        } finally {
            setSendPromptValue("")
            setSelectedFile(null)
            setisSending(false)
        }
    }

    return (
        <div className="SearchBarComp_frame">
            <form onSubmit={Send_Prompt}>
                <div className="Input_add_file_frame">
                    {/* hidden file input */}
                    <input
                        type="file"
                        className="Add_file_btn"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {/* image trigger */}
                    {selectedFile ? (
                        <img
                            className='Check_img'
                            src={check_webp}
                            alt="File selected"
                            onClick={() => fileInputRef.current?.click()}
                        />
                    ) : (
                        <img
                            className='Attach_img'
                            src={plus_webp}
                            alt="Attach file"
                            onClick={() => fileInputRef.current?.click()}
                        />
                    )}
                </div>

                <div className="Search_Bar_Label">
                    <input
                        className="Promt_Input_"
                        value={SendPromptValue}
                        type="text"
                        placeholder="enter your search"
                        onChange={(e) => setSendPromptValue(e.target.value)}
                    />
                </div>

                <div className="Input_Search_Btn_Frame">
                    {isSending ? (
                        <svg className="svg-spinner" viewBox="0 0 50 50" aria-hidden="true">
                            <circle className="ring" cx="25" cy="25" r="20" />
                            <circle className="arc" cx="25" cy="25" r="20" />
                        </svg>
                    ) : (
                        <button
                            className="AI_Speech_Rec_toggle_submit Label_send_data"
                            type="submit"
                        >
                            <img src={send_webp} alt="Send" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SearchBarComp
