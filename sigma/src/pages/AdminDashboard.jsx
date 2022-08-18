import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState();
    const [seePassword, setSeePassword] = useState(false);

    axios.defaults.withCredentials = true;

    const submitHandler = (e) => {
        e.preventDefault();
        alert("HEllo");
    };

    useEffect(() => {
        axios.get("http://localhost:3001/getRoles").then((res) => {
            setRoles(res.data);
        });

        axios.get("http://localhost:3001/login").then((res) => {
            if (res.data.loggedIn) {
                setLoginStatus({
                    loggedIn: true,
                    user: {
                        user_id: res.data.user[0].user_id,
                        first_name: res.data.user[0].first_name,
                        last_name: res.data.user[0].last_name,
                        role_id: res.data.user[0].role_id,
                    },
                });
            } else {
                setLoginStatus(res.data);
            }
        });
        if (!loginStatus.loggedIn) {
            navigate("/");
        } else if (loginStatus.user?.role_id === 1) {
            navigate("/adminDashboard");
        } else {
            navigate("/dashboard");
        }
    }, [
        loginStatus.loggedIn,
        loginStatus.user?.role_id,
        navigate,
        setLoginStatus,
    ]);
    return (
        <div>
            <Sidebar />
            <div>
                <div>
                    <form>
                        <div>
                            <span>First Name</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Last Name</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Email</span>
                            <input type="email" />
                        </div>
                        <div>
                            <span>Role</span>
                            <select name="roles" id="roles">
                                <option value="">SELECT - ROLE</option>
                                {roles.map((role) => {
                                    return (
                                        <option
                                            key={role.role_id}
                                            value={role.role_id}
                                        >
                                            {role.role_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <span>Password</span>
                            <div>
                                {seePassword ? (
                                    <input type="text" />
                                ) : (
                                    <input type="password" />
                                )}
                                {seePassword ? (
                                    <AiFillEyeInvisible
                                        size={30}
                                        onClick={() =>
                                            setSeePassword(!seePassword)
                                        }
                                    />
                                ) : (
                                    <AiFillEye
                                        size={30}
                                        onClick={() =>
                                            setSeePassword(!seePassword)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <span>Confirm password</span>
                            <input type="password" />
                        </div>
                        <button onClick={submitHandler}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
