import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { AppContext } from "../App";

const Profile = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [edit, setEdit] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [firstName, setFirstName] = useState(loginStatus.user?.first_name);
    const [lastName, setLastName] = useState(loginStatus.user?.last_name);
    const [password, setPassword] = useState("");

    const updateHandler = async (e) => {
        e.preventDefault();
        let updateName = await axios
            .put(
                `http://localhost:3001/updateName/${loginStatus.user.user_id}`,
                {
                    first_name: firstName,
                    last_name: lastName,
                }
            )
            .then((res) => {
                setLoginStatus({
                    loggedIn: true,
                    user: {
                        user_id: res.data[0].user_id,
                        first_name: res.data[0].first_name,
                        last_name: res.data[0].last_name,
                        role_id: res.data[0].role_id,
                    },
                });
            });
        setEdit(!edit);
    };

    const changePassHandler = async (e) => {
        e.preventDefault();
        let updatePassword = await axios
            .put(
                `http://localhost:3001/updatePassword/${loginStatus.user.user_id}`,
                {
                    password: password,
                }
            )
            .then((res) => console.log(res));
        setChangePass(!changePass);
    };

    const getUserSession = async () => {
        const userSessionData = await axios
            .get("http://localhost:3001/login")
            .then((res) => {
                return res.data;
            });

        if (userSessionData.loggedIn) {
            setLoginStatus({
                loggedIn: userSessionData.loggedIn,
                user: {
                    user_id: userSessionData.user.user_id,
                    first_name: userSessionData.user.first_name,
                    last_name: userSessionData.user.last_name,
                    role_id: userSessionData.user.role_id,
                },
            });
        } else {
            // setLoginStatus(userSessionData);
        }
    };

    useEffect(() => {
        getUserSession();

        if (!loginStatus.loggedIn) {
            navigate("/");
        } else {
            navigate(`/profile/${loginStatus.user.user_id}`);
        }
    }, []);

    return (
        <div className="flex bg-[#16161a] p-4 h-screen">
            <Sidebar />
            <div className="m-4 p-4 w-full rounded-md flex justify-center items-center bg-[#fffffe]">
                <div className="w-[500px] h-[500px] p-4 rounded-md">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Employee ID:{" "}
                        <span className="font-light"> {userId}</span>
                    </h1>
                    {edit ? (
                        <form
                            onSubmit={updateHandler}
                            className="animate-appear"
                        >
                            <div className="flex flex-col my-4">
                                <span className="text-2xl md:text-3xl">
                                    First Name
                                </span>
                                <input
                                    className="text-1xl md:text-2xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col my-4">
                                <span className="text-2xl md:text-3xl">
                                    Last Name
                                </span>
                                <input
                                    className="text-1xl md:text-2xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    className="text-2xl md:text-3xl p-4 bg-red-500 hover:bg-red-400 rounded-md"
                                    onClick={() => setEdit(!edit)}
                                >
                                    Cancel
                                </button>
                                <button className="text-2xl md:text-3xl p-4 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md">
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="relative animate-appear">
                            <div className="flex my-4 items-center">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    First Name:
                                </h2>
                                <p
                                    className="text-2xl md:text-3xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    {loginStatus.user.first_name}
                                </p>
                            </div>
                            <div className="flex my-4 items-center">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    Last Name:
                                </h2>
                                <p
                                    className="text-2xl md:text-3xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    {loginStatus.user.last_name}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="text-2xl md:text-3xl p-4 cursor-pointer border-4 border-[#7f5af0] hover:border-[#9B80EC] rounded-md"
                                    onClick={() => setEdit(!edit)}
                                >
                                    Edit name
                                </button>
                                <button
                                    className="text-2xl md:text-3xl p-4 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md"
                                    onClick={() => setChangePass(!changePass)}
                                >
                                    Change password
                                </button>
                            </div>

                            {changePass ? (
                                <div className="bg-[#fffffe] p-4 rounded-md absolute w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-[#010101] animate-appear">
                                    <form>
                                        <div className="relative my-4">
                                            <span className="text-2xl md:text-3xl">
                                                New Password
                                            </span>
                                            <div className="relative">
                                                <input
                                                    className="text-1xl md:text-2xl p-4 rounded-md border-[#010101] w-full"
                                                    type={
                                                        showPass
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {showPass ? (
                                                    <AiFillEyeInvisible
                                                        size={30}
                                                        className="absolute right-[20px] top-[50%] translate-y-[-50%]"
                                                        onClick={() => {
                                                            setShowPass(
                                                                !showPass
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <AiFillEye
                                                        size={30}
                                                        className="absolute right-[20px] top-[50%] translate-y-[-50%]"
                                                        onClick={() => {
                                                            setShowPass(
                                                                !showPass
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between my-4">
                                            <button
                                                className="text-2xl md:text-3xl p-4 bg-red-500 hover:bg-red-400 rounded-md"
                                                onClick={() =>
                                                    setChangePass(!changePass)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="text-2xl md:text-3xl p-4 bg-[#7f5af0] hover:bg-[#9B80EC] text-[#fffffe] rounded-md"
                                                onClick={changePassHandler}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
