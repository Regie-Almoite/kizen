import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const style = {
    pr: `bg-clip-text text-transparent bg-green-500 animate-pulse`,
    su: `bg-clip-text text-transparent bg-yellow-500 animate-pulse`,
    pd: `bg-clip-text text-transparent bg-rose-500 `,
    ed: `bg-clip-text text-transparent bg-blue-500`,
    id: `bg-clip-text text-transparent bg-gray-500 animate-pulse`,
    divPr: `relative bg-[#16161a] flex items-center border-4 border-green-500 hover:scale-[1.03] hover:shadow-md hover:shadow-green-500 rounded-md cursor-pointer`,
    divSu: `relative bg-[#16161a] flex items-center border-4 border-yellow-500 hover:scale-[1.03] hover:shadow-md hover:shadow-yellow-500 rounded-md cursor-pointer`,
    divPd: `relative bg-[#16161a] flex items-center border-4 border-rose-500 hover:scale-[1.03] hover:shadow-md hover:shadow-rose-500 rounded-md cursor-pointer`,
    divEd: `relative bg-[#16161a] flex items-center border-4 border-blue-500 hover:scale-[1.03] hover:shadow-md hover:shadow-blue-500 rounded-md cursor-pointer`,
    divId: `relative bg-[#16161a] flex items-center border-4 border-gray-500 hover:scale-[1.03] hover:shadow-md hover:shadow-gray-500 rounded-md cursor-pointer`,
};

const Dashboard = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const navigate = useNavigate();
    const [machines, setMachines] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [prCount, setPrCount] = useState("");
    const [suCount, setSuCount] = useState("");
    const [pdCount, setPdCount] = useState("");
    const [edCount, setEdCount] = useState("");
    const [idCount, setIdCount] = useState("");
    const [machinesCount, setMachinesCount] = useState("");

    axios.defaults.withCredentials = true;

    const getMachines = async () => {
        await axios.get("http://localhost:3001/machines").then((res) => {
            setMachines(res.data);
        });
    };

    const pr_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/pr")
            .then((res) => {
                setPrCount(res.data.pr_count);
            });
    };
    const su_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/su")
            .then((res) => {
                setSuCount(res.data.su_count);
            });
    };
    const pd_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/pd")
            .then((res) => {
                setPdCount(res.data.pd_count);
            });
    };
    const ed_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/ed")
            .then((res) => {
                setEdCount(res.data.ed_count);
            });
    };
    const id_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/id")
            .then((res) => {
                setIdCount(res.data.id_count);
            });
    };

    const machines_count = async () => {
        await axios
            .get("http://localhost:3001/machines/statusCount/machines_count")
            .then((res) => {
                setMachinesCount(res.data.machines_count);
            });
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) user = { loggedIn: false };
        if (user.loggedIn) {
            setLoginStatus(user);
            user.user.role_id === 1 && navigate("/adminDashboard");
        } else {
            navigate("/");
        }
        // axios.get("http://localhost:3001/users/login").then((res) => {
        //     console.log(res.data);
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

        //         if (res.data.user[0].role_id === 1) {
        //             navigate("/adminDashboard");
        //         }
        //     } else {
        //         setLoginStatus(res.data);
        //         navigate("/");
        //     }
        // });
        getMachines();
        pr_count();
        su_count();
        pd_count();
        ed_count();
        id_count();
        machines_count();
    }, []);

    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="rounded-md w-full flex flex-col m-2 justify-between gap-5">
                <div className="grid grid-cols-5 gap-5 rounded-md ">
                    <div className="h-[200px] flex flex-col justify-center items-center text-xl md:text-2xl font-bold text-[#fffffe] bg-gradient-to-tr from-green-600 via-green-500 to-green-400 rounded-md">
                        <p>{(prCount / machinesCount) * 100 + "%"}</p>
                        <p>Production Run</p>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center text-xl md:text-2xl font-bold text-[#fffffe] bg-gradient-to-tr from-yellow-600 via-yellow-500 to-yellow-400 rounded-md">
                        <p>{(suCount / machinesCount) * 100 + "%"}</p>
                        <p>Machine Setup</p>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center text-xl md:text-2xl font-bold text-[#fffffe] bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 rounded-md">
                        <p>{(pdCount / machinesCount) * 100 + "%"}</p>
                        <p>Production Down</p>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center text-xl md:text-2xl font-bold text-[#fffffe] bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 rounded-md">
                        <p>{(edCount / machinesCount) * 100 + "%"}</p>
                        <p>Equipment Down</p>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center text-xl md:text-2xl font-bold text-[#fffffe] bg-gradient-to-tr from-gray-600 via-gray-500 to-gray-400 rounded-md">
                        <p>{(idCount / machinesCount) * 100 + "%"}</p>
                        <p>Idle</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5 bg-[#fffffe] p-2 rounded-md overflow-auto h-full">
                    {machines
                        .filter((machine) => {
                            return (
                                machine.machine_id
                                    .toString()
                                    .includes(searchId) &&
                                machine.status_code
                                    .toLowerCase()
                                    .includes(filterStatus)
                            );
                        })
                        .map((machine) => {
                            return loginStatus.user?.role_id === 2 ? (
                                <div
                                    key={machine.machine_id}
                                    className={
                                        machine.status_code === "PR"
                                            ? style.divPr
                                            : machine.status_code === "SU"
                                            ? style.divSu
                                            : machine.status_code === "PD"
                                            ? style.divPd
                                            : machine.status_code === "ED"
                                            ? style.divEd
                                            : style.divId
                                    }
                                >
                                    <div className="w-full p-4">
                                        <div className="my-4">
                                            <p className="text-[#fffffe]">
                                                EQUIPMENT NO:
                                            </p>
                                            <p className="text-[#94a1b2] pl-4">
                                                MT-{machine.machine_id}
                                            </p>
                                        </div>
                                        <div className="my-4">
                                            <p className="text-[#fffffe]">
                                                STATUS:
                                            </p>
                                            <div
                                                className={
                                                    machine.status_code === "PR"
                                                        ? style.pr
                                                        : machine.status_code ===
                                                          "SU"
                                                        ? style.su
                                                        : machine.status_code ===
                                                          "PD"
                                                        ? style.pd
                                                        : machine.status_code ===
                                                          "ED"
                                                        ? style.ed
                                                        : style.id
                                                }
                                            >
                                                <p className=" pl-4">
                                                    {machine.status_name}. . .
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={`/machine/${machine.machine_id}`}
                                    key={machine.machine_id}
                                    className={
                                        machine.status_code === "PR"
                                            ? style.divPr
                                            : machine.status_code === "SU"
                                            ? style.divSu
                                            : machine.status_code === "PD"
                                            ? style.divPd
                                            : machine.status_code === "ED"
                                            ? style.divEd
                                            : style.divId
                                    }
                                >
                                    <div className="w-full p-4">
                                        <div className="my-4">
                                            <p className="text-[#fffffe] text-2xl">
                                                EQUIPMENT NO:
                                            </p>
                                            <p className="text-[#94a1b2] pl-4 text-2xl">
                                                MT-{machine.machine_id}
                                            </p>
                                        </div>
                                        <div className="my-4">
                                            <p className="text-[#fffffe] text-2xl">
                                                STATUS:
                                            </p>
                                            <div
                                                className={
                                                    machine.status_code === "PR"
                                                        ? style.pr
                                                        : machine.status_code ===
                                                          "SU"
                                                        ? style.su
                                                        : machine.status_code ===
                                                          "PD"
                                                        ? style.pd
                                                        : machine.status_code ===
                                                          "ED"
                                                        ? style.ed
                                                        : style.id
                                                }
                                            >
                                                <p className=" pl-4 text-2xl">
                                                    {machine.status_name}. . .
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
