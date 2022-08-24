import React, { useState, useContext, useReducer, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import globe from "../assets/images/globe.jpg";
import logo from "../assets/images/KaizenLogo.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const style = {
    wrapper: `h-screen grid grid-cols-1 md:grid-cols-2`,
    leftContainer: `relative hidden md:block`,
    globe: `object-cover h-screen`,
    overlay: `w-full absolute top-0 left-0 h-screen bg-black/70`,
    logo: `absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`,
    rightContainer: `flex flex-col items-center justify-center p-3`,
    logoSm: `my-3 md:hidden`,
    login: `bg-slate-300 p-3 mx-3 w-full sm:w-[400px] rounded-md drop-shadow-xl
    `,
    inputDiv: `flex flex-col my-3`,
    span: `text-2xl md:text-3xl font-bold my-2`,
    input: `p-2 text-1xl md:text-2xl rounded`,
    btnContainer: `flex items-center`,
    loginBtn: `bg-cyan-400 hover:bg-cyan-300 py-2 px-3 mr-3 text-2xl`,
    loading: `text-green-700 flex items-center`,
    error: `text-rose-600 my-3`,
};

const initialState = {
    email: "",
    password: "",
    isloading: false,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "beforeLogin":
            return { ...state, isloading: true };
        case "success":
            return {
                email: "",
                password: "",
                isloading: false,
                error: null,
            };
        case "error":
            return {
                ...state,
                error: action.errorMsg,
                isloading: false,
            };
        case "updateField":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "clearLogin":
            return {
                ...state,
                email: "",
                password: "",
                isloading: false,
            };
        case "clearError":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

const Login = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const loginHandler = () => {
        dispatch({ type: "beforeLogin" });

        axios
            .post("http://localhost:3001/users/login", {
                email: state.email,
                password: state.password,
            })
            .then((res) => {
                if (res.data["message"]) {
                    dispatch({ type: "error", errorMsg: res.data["message"] });
                } else {
                    setLoginStatus({
                        loggedIn: true,
                        user: {
                            user_id: res.data[0].user_id,
                            first_name: res.data[0].first_name,
                            last_name: res.data[0].last_name,
                            role_id: res.data[0].role_id,
                        },
                    });

                    if (res.data[0].role_id === 1) {
                        navigate("/adminDashboard");
                    } else {
                        navigate("/dashboard");
                    }

                    dispatch({ type: "success" });
                }
            })
            .catch((error) => {
                dispatch({
                    type: "error",
                    errorMsg: "Sorry, There's an error processing your data",
                });
            })
            .finally(() => {
                dispatch({ type: "clearLogin" });
                setTimeout(() => {
                    dispatch({ type: "clearError" });
                }, 4000);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:3001/users/login").then((res) => {
            if (res.data.loggedIn === true) {
                setLoginStatus({
                    loggedIn: true,
                    user: {
                        user_id: res.data.user[0]?.user_id,
                        first_name: res.data.user[0]?.first_name,
                        last_name: res.data.user[0]?.last_name,
                        role_id: res.data.user[0]?.role_id,
                    },
                });
            } else {
                setLoginStatus(res.data);
            }
        });
    }, []);

    return (
        <div className={style.wrapper}>
            <div className={style.leftContainer}>
                <img className={style.globe} src={globe} alt="globe particle" />
                <div className={style.overlay}></div>
                <img className={style.logo} src={logo} alt="logo" />
            </div>
            <div className={style.rightContainer}>
                <img className={style.logoSm} src={logo} alt="logo" />
                <div className={style.login}>
                    {state.error && (
                        <p className={style.error}>{state.error}</p>
                    )}
                    <div className={style.inputDiv}>
                        <span className={style.span}>Email</span>
                        <input
                            className={style.input}
                            type="text"
                            required
                            value={state.email}
                            onChange={(e) => {
                                dispatch({
                                    type: "updateField",
                                    field: "email",
                                    value: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <span className={style.span}>Password</span>
                        <input
                            className={style.input}
                            type="password"
                            required
                            value={state.password}
                            onChange={(e) => {
                                dispatch({
                                    type: "updateField",
                                    field: "password",
                                    value: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className={style.btnContainer}>
                        <button
                            className={style.loginBtn}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        {state.isloading && (
                            <div className={style.loading}>
                                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                                <span>Loading . . .</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
