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

    axios.defaults.withCredentials = true;

    const updateHandler = async (e) => {
        e.preventDefault();
        let updateName = await axios
            .put(
                `http://localhost:3001/users/updateName/${loginStatus.user.user_id}`,
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

                navigate(`/profile/${userId}`);
            });
        setEdit(!edit);
    };

    const changePassHandler = async (e) => {
        e.preventDefault();
        let updatePassword = await axios
            .put(
                `http://localhost:3001/users/updatePassword/${loginStatus.user.user_id}`,
                {
                    password: password,
                }
            )
            .then((res) => console.log(res));
        setChangePass(!changePass);
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
                if (userId !== res.data.user[0]?.user_id) {
                    navigate(`/profile/${res.data.user[0]?.user_id}`);
                }
            } else {
                setLoginStatus(res.data);
                navigate("/");
            }
        });
    }, []);

    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="m-2 p-2 w-full rounded-md flex justify-center items-center bg-[#fffffe]">
                <div className="w-[500px] h-[500px] p-2 rounded-md">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Employee ID:{" "}
                        <span className="font-light">
                            {loginStatus.user?.user_id}
                        </span>
                    </h1>
                    {edit ? (
                        <form
                            onSubmit={updateHandler}
                            className="animate-appear"
                        >
                            <div className="flex flex-col my-2">
                                <span className="text-xl md:text-2xl">
                                    First Name
                                </span>
                                <input
                                    className="text-xl md:text-2xl p-2 rounded-md border-[#010101]"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <span className="text-xl md:text-2xl">
                                    Last Name
                                </span>
                                <input
                                    className="text-xl md:text-2xl p-2 rounded-md border-[#010101]"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <button
                                    className="text-xl w-full md:text-2xl p-2 bg-red-500 hover:bg-red-400 rounded-md"
                                    onClick={() => setEdit(!edit)}
                                >
                                    Cancel
                                </button>
                                <button className="text-xl w-full md:text-2xl p-2 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md">
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="relative animate-appear">
                            <div className="flex my-2 items-center">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    First Name:
                                </h2>
                                <p
                                    className="text-xl md:text-2xl p-2 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    {loginStatus.user?.first_name}
                                </p>
                            </div>
                            <div className="flex my-2 items-center">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Last Name:
                                </h2>
                                <p
                                    className="text-xl md:text-2xl p-2 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    {loginStatus.user?.last_name}
                                </p>
                            </div>
                            <div className="flex justify-between gap-2">
                                <button
                                    className=" w-full text-xl md:text-2xl p-2 cursor-pointer border-4 border-[#7f5af0] hover:border-[#9B80EC] rounded-md"
                                    onClick={() => setEdit(!edit)}
                                >
                                    Edit name
                                </button>
                                <button
                                    className=" w-full text-xl md:text-2xl p-2 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md"
                                    onClick={() => setChangePass(!changePass)}
                                >
                                    Change password
                                </button>
                            </div>

                            {changePass ? (
                                <div className="bg-[#fffffe] p-2 rounded-md absolute w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-[#010101] animate-appear">
                                    <form>
                                        <div className="relative my-2">
                                            <span className="text-xl md:text-2xl">
                                                New Password
                                            </span>
                                            <div className="relative">
                                                <input
                                                    className="text-xl md:text-2xl p-2 rounded-md border-[#010101] w-full"
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
                                        <div className="flex justify-between my-2">
                                            <button
                                                className="text-xl md:text-2xl p-2 bg-red-500 hover:bg-red-400 rounded-md"
                                                onClick={() =>
                                                    setChangePass(!changePass)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="text-xl md:text-2xl p-2 bg-[#7f5af0] hover:bg-[#9B80EC] text-[#fffffe] rounded-md"
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
