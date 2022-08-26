import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Sidebar from "../components/Sidebar";

const StatusHistory = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [machineNumber, setMachineNumber] = useState("");
    const [date, setDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    axios.defaults.withCredentials = true;

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));

        if (!user) user = { loggedIn: false };
        if (user.loggedIn) {
            setLoginStatus(user);
        } else {
            navigate("/");
        }
        // axios.get("http://localhost:3001/users/login").then((res) => {
        //     if (res.data.loggedIn === true) {
        //         setLoginStatus({
        //             loggedIn: true,
        //             user: {
        //                 user_id: res.data.user[0]?.user_id,
        //                 first_name: res.data.user[0]?.first_name,
        //                 last_name: res.data.user[0]?.last_name,
        //                 role_id: res.data.user[0]?.role_id,
        //             },
        //         });
        //     } else {
        //         setLoginStatus(res.data);
        //         navigate("/");
        //     }
        // });
        axios.get("http://localhost:3001/records").then((res) => {
            setRecords(
                res.data.map((record) => {
                    const date = new Date(record.created_at);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const seconds = date.getSeconds();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const year = date.getFullYear();

                    return {
                        ...record,
                        time: `${hours < 10 ? "0" + hours : hours}:${
                            minutes < 10 ? "0" + minutes : minutes
                        }:${seconds < 10 ? "0" + seconds : seconds}`,
                        date: `${month < 10 ? "0" + month : month}/${
                            day < 10 ? "0" + day : day
                        }/${year}`,
                    };
                })
            );
        });
    }, []);
    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="bg-[#fffffe] rounded-md p-2 m-2 w-full overflow-y-auto">
                <div className="flex items-center my-2">
                    <input
                        className="w-full rounded-tl-md rounded-bl-md text-xl md:text-2xl"
                        type="number"
                        placeholder="Filter by Machine No."
                        onChange={(e) => setMachineNumber(e.target.value)}
                    />
                    <input
                        className="w-full text-xl md:text-2xl"
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                    <select
                        className="w-full rounded-tl-none rounded-bl-none"
                        name="filter"
                        id="filter"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Filter by status</option>
                        <option value="pr">Production Run</option>
                        <option value="su">Machine Setup</option>
                        <option value="pd">Production Down</option>
                        <option value="ed">Equipment Down</option>
                        <option value="id">Idle</option>
                    </select>
                </div>
                <div className="h-full ">
                    <table className="table-full w-full text-xl md:text-2xl text-center">
                        <thead>
                            <tr>
                                <th>Machine No</th>
                                <th>Error Description</th>
                                <th>Operator ID</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Comment</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records
                                .filter((record) => {
                                    return (
                                        record.date.includes(date) &&
                                        record.status_code
                                            .toLowerCase()
                                            .includes(
                                                filterStatus.toLowerCase()
                                            ) &&
                                        record.machine_id
                                            .toString()
                                            .includes(machineNumber)
                                    );
                                })
                                .map((record) => {
                                    return (
                                        <tr key={record.activity_records_id}>
                                            <td>MT-{record.machine_id}</td>
                                            <td>{record.error_description}</td>
                                            <td>{record.user_id}</td>
                                            <td>{record.time}</td>
                                            <td>{record.date}</td>
                                            <td>{record.comment}</td>
                                            <td
                                                className={`${
                                                    record.status_code === "PR"
                                                        ? "bg-green-500"
                                                        : record.status_code ===
                                                          "SU"
                                                        ? "bg-yellow-500"
                                                        : record.status_code ===
                                                          "PD"
                                                        ? "bg-rose-500"
                                                        : record.status_code ===
                                                          "ED"
                                                        ? "bg-blue-500"
                                                        : "bg-gray-500"
                                                }`}
                                            >
                                                {record.status_name}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatusHistory;
