import React, { useContext, useState } from "react";
import "./Register.css";
import { userDataContext } from "../../context/User_context/UserContext";
import axios from "axios";

const Register = () => {
    const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, activeSetting, setActiveSetting,setActiveSetting_Feature } = useContext(userDataContext);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        const dataSend = {
            name: formData.username,
            email: formData.email,
            password: formData.password

        }
        // You can add API call here
        const sendRegisterFun = await axios.post(`http://127.0.0.1:8000/UserRegister`, dataSend, { withCredentials: true })
        try {
            if (sendRegisterFun.status == 200 || sendRegisterFun.status == 201) {
                console.log(sendRegisterFun);
                // Save user detail
                console.log('----> user detail\n', sendRegisterFun.data.userDetail);
                localStorage.setItem("UserDetail_Pentrilon", JSON.stringify(sendRegisterFun.data.userDetail));

                // Read user detail back
                const userDetail = JSON.parse(localStorage.getItem("UserDetail_Pentrilon"));
                console.log("Loaded user detail:", userDetail);


                alert(sendRegisterFun.data.message)
                
                user_feature_close_fun()
                user_Feature_toggle_fun(true)
                setActiveSetting('Profile')
            }
            else {
                alert(sendRegisterFun.data.error)
            }

        } catch (error) {
            console.log('error', error);

            alert(sendRegisterFun.data.error)

        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <div className="User_route_auth_frame" onClick={() => { setActiveSetting('Login') }}>
                    <p>alredy has an account? </p> <p> Login</p>
                </div>
                <div className="Register_Btn_frame">
                    <button type="submit">Register</button>
                </div>
                <div className="User_route_auth_frame">
                    <p>Forgot your password ?</p>
                </div>

            </form>
        </div>
    );
};

export default Register;
