import React, { useState } from "react";
import axios from "axios";

const Notepad = () => {
  const [message, setMessage] = useState("");

  const openNotepad = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/open-notepad");
      if (res.status === 200) {
        setMessage(res.data.message || "Notepad opened!");
      } else {
        setMessage("Unexpected response from backend");
      }
    } catch (err) {
      console.error("Error calling backend:", err);
      setMessage("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Homepage</h1>
      <p>{message}</p>
      <button onClick={openNotepad}>Open Notepad</button>
    </div>
  );
};

export default Notepad;
