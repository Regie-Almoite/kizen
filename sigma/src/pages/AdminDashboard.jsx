import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Sidebar from "../components/Sidebar";

const schema = yup
    .object()
    .shape({
        first_name: yup.string().required("Your first name is required"),
        last_name: yup.string().required("Your last name is required"),
        email: yup
            .string()
            .email("Your email should be a valid email")
            .required("Email is required"),
        role_id: yup.string().required("Please select a role"),
        password: yup.string().required("Your password is required"),
    })
    .required();

const AdminDashboard = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [emailErr, setEmailErr] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const [users, setUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState("");
    const [cDelete, setCDelete] = useState(false);
    const [filterName, setFilterName] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    axios.defaults.withCredentials = true;

    const registerHandler = async (data) => {
        // e.preventDefault();
        try {
            await axios
                .post("http://localhost:3001/users/add", {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    role_id: data.role_id,
                    password: data.password,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        setEmailErr(res.data.error);
                    } else {
                        setEmailErr("");
                        setUsers([
                            ...users,
                            {
                                user_id: res.data[res.data.length - 1].user_id,
                                first_name:
                                    res.data[res.data.length - 1].first_name,
                                last_name:
                                    res.data[res.data.length - 1].last_name,
                                email: res.data[res.data.length - 1].email,
                            },
                        ]);
                    }
                    // console.log(res.data[res.data.length - 1]);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUserHandler = (id) => {
        try {
            const delUser = axios
                .delete(`http://localhost:3001/users/delete/${id}`)
                .then((res) => {
                    setUsers(
                        users.filter((user) => {
                            return user.user_id !== id;
                        })
                    );
                });
        } catch (err) {
            console.log(err);
        }

        setDeleteUser("");
        setCDelete(!cDelete);
    };

    const getRoles = async () => {
        await axios.get("http://localhost:3001/roles").then((res) => {
            setRoles(res.data);
        });
    };

    const getUsers = async () => {
        await axios.get("http://localhost:3001/users").then((res) => {
            console.log(res.data);
            setUsers(res.data);
        });
    };

    useEffect(() => {
        getRoles();
        getUsers();
    }, []);
    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="flex gap-2 bg-[#fffffe] p-2 m-2 rounded-md w-full relative">
                <div className="w-full">
                    <form onSubmit={handleSubmit(registerHandler)}>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">
                                First Name
                            </span>
                            <input
                                className="text-xl md:text-2xl border border-black p-2"
                                type="text"
                                // value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                                {...register("first_name")}
                            />
                            <p className="text-rose-500">
                                {errors.first_name?.message}
                            </p>
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">
                                Last Name
                            </span>
                            <input
                                className="text-xl md:text-2xl border border-black p-2"
                                type="text"
                                // value={lastName}
                                // onChange={(e) => setLastName(e.target.value)}
                                {...register("last_name")}
                            />
                            <p className="text-rose-500">
                                {errors.last_name?.message}
                            </p>
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">Email</span>
                            <input
                                className="text-xl md:text-2xl border border-black p-2"
                                type="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                {...register("email")}
                            />
                            <p className="text-rose-500">
                                {errors.email?.message}
                            </p>
                            {emailErr ? (
                                <p className="text-rose-500">{emailErr}</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">Role</span>
                            <select
                                className="text-xl md:text-2xl border border-black p-2"
                                // value={role}
                                // onChange={(e) => setRole(e.target.value)}
                                {...register("role_id")}
                            >
                                <option value="">--Select Role--</option>
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
                            <p className="text-rose-500">
                                {errors.role_id?.message}
                            </p>
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">
                                Password
                            </span>
                            <div className="relative">
                                <input
                                    className="w-full text-xl md:text-2xl border border-black p-2"
                                    type={seePassword ? "text" : "password"}
                                    // value={password}
                                    // onChange={(e) => {
                                    //     setPassword(e.target.value);
                                    // }}
                                    {...register("password")}
                                />
                                {seePassword ? (
                                    <AiFillEyeInvisible
                                        className="absolute top-[50%] translate-y-[-50%] right-2"
                                        size={20}
                                        onClick={() =>
                                            setSeePassword(!seePassword)
                                        }
                                    />
                                ) : (
                                    <AiFillEye
                                        className="absolute top-[50%] translate-y-[-50%] right-2 "
                                        size={20}
                                        onClick={() =>
                                            setSeePassword(!seePassword)
                                        }
                                    />
                                )}
                            </div>
                            <p className="text-rose-500">
                                {errors.password?.message}
                            </p>
                        </div>
                        <button className="text-xl md:text-2xl my-2 p-2 px-4 text-white cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md">
                            Register
                        </button>
                    </form>
                </div>
                <div className="w-full">
                    <div>
                        <input
                            className="text-xl md:text-2xl p-2 my-2 w-full"
                            type="text"
                            placeholder="Search by name"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-[500px] overflow-auto">
                        <table className="h-full">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter((user) => {
                                        return user.first_name
                                            .toLowerCase()
                                            .concat(
                                                " ",
                                                user.last_name.toLowerCase()
                                            )
                                            .includes(filterName.toLowerCase());
                                    })
                                    .map((user) => {
                                        return (
                                            <tr key={user.user_id}>
                                                <td>{user.user_id}</td>
                                                <td>
                                                    {user.first_name +
                                                        " " +
                                                        user.last_name}
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button
                                                        className="p-2 bg-rose-500 rounded-md hover:bg-rose-400"
                                                        onClick={() => {
                                                            setDeleteUser(
                                                                user.user_id
                                                            );
                                                            setCDelete(
                                                                !cDelete
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {cDelete ? (
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border border-black p-2 rounded-md bg-[#fffffe]">
                        <p className="text-xl md:text-2xl my-2">
                            Delete User with ID: <span>{deleteUser}</span>
                        </p>
                        <div className="flex gap-2 my-2">
                            <button
                                className="p-2 text-xl md:text-2xl bg-red-500 hover:bg-red-400 rounded-md w-full"
                                onClick={() => {
                                    setDeleteUser("");
                                    setCDelete(!cDelete);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="p-2 text-xl md:text-2xl bg-[#7f5af0] hover:bg-[#9B80EC] text-[#fffffe] rounded-md w-full"
                                onClick={() => deleteUserHandler(deleteUser)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
