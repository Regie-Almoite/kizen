import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Sidebar from "../components/Sidebar";

const StatusHistory = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/records").then((res) => {
            setRecords(res.data);
        });
    }, []);
    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="bg-[#fffffe] rounded-md p-2 m-2 w-full overflow-x-auto">
                <table className="table-auto w-full text-xl md:text-2xl text-center">
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
                        {records.map((record) => {
                            const date = new Date(record.created_at);
                            const hours = date.getHours();
                            const minutes = date.getMinutes();
                            const seconds = date.getSeconds();
                            const month = date.getMonth();
                            const day = date.getDate() + 1;
                            const year = date.getFullYear();
                            return (
                                <tr key={record.activity_records_id}>
                                    <td>MT-{record.machine_id}</td>
                                    <td>{record.error_description}</td>
                                    <td>{record.user_id}</td>
                                    <td>{`${
                                        hours < 10 ? "0" + hours : hours
                                    } : ${
                                        minutes < 10 ? "0" + minutes : minutes
                                    } : ${
                                        seconds < 10 ? "0" + seconds : seconds
                                    }`}</td>
                                    <td>{`${month < 10 ? "0" + month : month}/${
                                        day < 10 ? "0" + day : day
                                    }/${year}`}</td>
                                    <td>{record.comment}</td>
                                    <td
                                        className={`${
                                            record.status_code === "PR"
                                                ? "bg-green-500"
                                                : record.status_code === "SU"
                                                ? "bg-yellow-500"
                                                : record.status_code === "PD"
                                                ? "bg-rose-500"
                                                : record.status_code === "ED"
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
    );
};

export default StatusHistory;
