import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const style = {
    pr: `bg-clip-text text-transparent bg-green-500 animate-pulse`,
    su: `bg-clip-text text-transparent bg-yellow-500 animate-pulse`,
    pd: `bg-clip-text text-transparent bg-rose-500 `,
    ed: `bg-clip-text text-transparent bg-blue-500 animate-pulse`,
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
    // const [prCount, setPrCount] = useState(0);
    // const [suCount, setSuCount] = useState(0);
    // const [pdCount, setPdCount] = useState(0);
    // const [edCount, setEdCount] = useState(0);
    // const [idCount, setIdCount] = useState(0);
    // const [machinesCount, setMachinesCount] = useState(0);

    axios.defaults.withCredentials = true;

    const getMachines = async () => {
        await axios.get("http://localhost:3001/machines").then((res) => {
            setMachines(res.data);
            console.log(res.data);
        });
    };

    // const pr_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/pr")
    //         .then((res) => {
    //             setPrCount(res.data.pr_count);
    //         });
    // };
    // const su_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/su")
    //         .then((res) => {
    //             setSuCount(res.data.su_count);
    //         });
    // };
    // const pd_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/pd")
    //         .then((res) => {
    //             setPdCount(res.data.pd_count);
    //         });
    // };
    // const ed_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/ed")
    //         .then((res) => {
    //             setEdCount(res.data.ed_count);
    //         });
    // };
    // const id_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/id")
    //         .then((res) => {
    //             setIdCount(res.data.id_count);
    //         });
    // };

    // const machines_count = async () => {
    //     await axios
    //         .get("http://localhost:3001/machines/statusCount/machines_count")
    //         .then((res) => {
    //             setMachinesCount(res.data.machines_count);
    //         });
    // };

    useEffect(() => {
        // pr_count();
        // su_count();
        // pd_count();
        // ed_count();
        // id_count();
        // machines_count();
        axios.get("http://localhost:3001/users/login").then((res) => {
            console.log(res.data);
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

                if (res.data.user[0].role_id === 1) {
                    navigate("/adminDashboard");
                }
            } else {
                setLoginStatus(res.data);
                navigate("/");
            }
        });
        getMachines();
    }, []);

    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="bg-[#fffffe] p-2 m-2 overflow-auto relative rounded-md w-full">
                <div className="sticky top-0 flex items-center p-2">
                    <input
                        className="w-full p-2 text-xl md:text-2xl rounded-tl-md rounded-bl-md form-input "
                        type="number"
                        placeholder="Search by machine ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <select
                        className="w-[400px] p-2 text-xl md:text-2xl rounded-none form-select rounded-tr-md rounded-br-md"
                        name="filter"
                        id="filter"
                        value={filterStatus}
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
                <div className="p-2 max-h-screen grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full overflow-auto">
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
