import { useState } from "react";
import axios from "axios";

function Login() {

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8081/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role || "USER"
            );

            localStorage.setItem(
                "name",
                response.data.name || "User"
            );

            localStorage.setItem(
                "email",
                email
            );

            window.location.href = "/";

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid Credentials"
            );
        }
    };

    const handleSignup = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8081/users",
            {
                name,
                email,
                password,
                role: "USER",
                active: true
            }
        );

        console.log("SUCCESS:", response.data);

        alert("Account Created Successfully");

        setIsLogin(true);

    } catch (error) {

        console.log("FULL ERROR:", error);

        console.log(
            "SERVER RESPONSE:",
            error.response?.data
        );

        alert(
            JSON.stringify(
                error.response?.data
            ) || error.message
        );
    }
};

    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">

                <div className="login-logo">

                    SH

                </div>

                <h1 className="login-title">

                    ServiceHub

                </h1>

                <p className="login-subtitle">

                    Modern AI-powered Service Request
                    Management Platform for managing
                    campus and enterprise technical
                    issues.

                </p>

                <div className="login-features">

                    <p>
                        🚀 Smart Request Tracking
                    </p>

                    <p>
                        🔍 Semantic AI Search
                    </p>

                    <p>
                        📊 Real-time Analytics
                    </p>

                    <p>
                        🛠️ Admin Management Panel
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-card">

                    <h1>

                        {
                            isLogin
                                ? "Welcome Back"
                                : "Create Account"
                        }

                    </h1>

                    <p>

                        {
                            isLogin
                                ? "Login to continue to your dashboard"
                                : "Create your ServiceHub account"
                        }

                    </p>

                    <form
                        onSubmit={
                            isLogin
                                ? handleLogin
                                : handleSignup
                        }
                    >

                        {
                            !isLogin &&

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="login-input"
                                required
                            />
                        }

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="login-input"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="login-input"
                            required
                        />

                        <button
                            type="submit"
                            className="login-btn"
                        >

                            {
                                isLogin
                                    ? "Sign In"
                                    : "Create Account"
                            }

                        </button>

                    </form>

                    <div className="signup-link">

                        {
                            isLogin ?

                                <p>

                                    Don't have an account?

                                    {" "}

                                    <span
                                        onClick={() =>
                                            setIsLogin(false)
                                        }
                                    >

                                        Sign Up

                                    </span>

                                </p>

                                :

                                <p>

                                    Already have an account?

                                    {" "}

                                    <span
                                        onClick={() =>
                                            setIsLogin(true)
                                        }
                                    >

                                        Sign In

                                    </span>

                                </p>
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;