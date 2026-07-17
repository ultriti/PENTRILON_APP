import React, { useContext, useState } from "react";
import "./Register.css";
import { userDataContext } from "../../context/User_context/UserContext";
import axios from "axios";

const Login = () => {
    const { user_profile_toggle_fun, User_Profile_toggle, user_profile_close_fun, user_feature_close_fun, user_Feature_toggle_fun, activeSetting, setActiveSetting } = useContext(userDataContext);

    const [formData, setFormData] = useState({
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
            email: formData.email,
            password: formData.password

        }

        const sendRegisterFun = await axios.post(`http://127.0.0.1:8000/UserLogin`, dataSend, { withCredentials: true })


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
            alert(error.response.data.error || "An error occurred during login.");
        }


        // You can add API call here
    };

    return (
        <div className="register-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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

                <div className="User_route_auth_frame" onClick={() => { setActiveSetting('Register') }}>
                    <p>Doesnt have any account</p> <p> Register</p>
                </div>
                <div className="Register_Btn_frame">
                    <button type="submit">Sign in</button>
                </div>
                <div className="User_route_auth_frame">
                    <p>Forgot your password ?</p>
                </div>

            </form>
        </div>
    );
};

export default Login;
