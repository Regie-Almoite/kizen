import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../App";

const style = {
    pr: `bg-clip-text text-transparent bg-green-500 animate-pulse`,
    su: `bg-clip-text text-transparent bg-yellow-500 animate-pulse`,
    pd: `bg-clip-text text-transparent bg-rose-500 `,
    ed: `bg-clip-text text-transparent bg-blue-500 animate-pulse`,
    id: `bg-clip-text text-transparent bg-gray-500 animate-pulse`,
    divPr: `relative bg-[#16161a] flex items-center border-4 border-green-500  rounded-md`,
    divSu: `relative bg-[#16161a] flex items-center border-4 border-yellow-500 rounded-md`,
    divPd: `relative bg-[#16161a] flex items-center border-4 border-rose-500 rounded-md`,
    divEd: `relative bg-[#16161a] flex items-center border-4 border-blue-500 rounded-md`,
    divId: `relative bg-[#16161a] flex items-center border-4 border-gray-500 rounded-md`,
};

const Machine = () => {
    const { machineId } = useParams();
    const { loginStatus, setLoginStatus } = useContext(AppContext);
    const [machine, setMachine] = useState({});
    const [machineUpdate, setMachineUpdate] = useState({});
    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [error, setError] = useState(6);
    const [product, setProduct] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const getMachine = async () => {
        try {
            const machineData = await axios
                .get(`http://localhost:3001/machines/${machineId}`)
                .then((res) => {
                    console.log(res.data[0]);
                    return res.data[0];
                });
            setNewStatus(machineData.status_id);
            setMachine(machineData);
        } catch (err) {
            console.log(err);
        }
    };

    const getStatus = async () => {
        try {
            const status = await axios
                .get("http://localhost:3001/status")
                .then((res) => {
                    console.log(res.data);
                    setStatus(res.data);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const getErrors = async () => {
        try {
            const errors = await axios
                .get("http://localhost:3001/errors")
                .then((res) => {
                    console.log(res.data);
                    setErrors(res.data);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const updateMachineHandler = async (e) => {
        e.preventDefault();
        console.log(newStatus, error, product, comment);
        try {
            let updateMachineStatus = await axios
                .put(`http://localhost:3001/machines/${machine?.machine_id}`, {
                    newStatus: newStatus,
                })
                .then((res) => {
                    setMachineUpdate({
                        ...machine,
                        status_id: newStatus,
                    });
                    setMachine({ ...machine, status_id: newStatus });
                    console.log(res.data);
                });

            let addRecord = await axios
                .post("http://localhost:3001/records", {
                    error_id: error,
                    status_id: newStatus,
                    comment: comment,
                    user_id: loginStatus.user?.user_id,
                    machine_id: machine.machine_id,
                    product: product,
                })
                .then((res) => {
                    console.log(res);
                });
        } catch (err) {
            console.log(err);
        }
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

    useEffect(() => {
        getMachine();
        getStatus();
        getErrors();
    }, [machineUpdate]);

    return (
        <div className="flex bg-[#16161a] p-2 h-screen">
            <Sidebar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <div className="m-2 p-2 bg-[#fffffe] rounded-md w-full">
                <div
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
                        <div className="my-2">
                            <p className="text-[#fffffe] text-2xl">
                                EQUIPMENT NO:
                            </p>
                            <p className="text-[#94a1b2] pl-4 text-2xl">
                                MT-{machine.machine_id}
                            </p>
                        </div>
                        <div className="my-2">
                            <p className="text-[#fffffe] text-2xl">STATUS:</p>
                            <div
                                className={
                                    machine.status_code === "PR"
                                        ? style.pr
                                        : machine.status_code === "SU"
                                        ? style.su
                                        : machine.status_code === "PD"
                                        ? style.pd
                                        : machine.status_code === "ED"
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
                </div>
                <div className="my-2 p-2">
                    <form
                        className="max-w-[50%] mx-auto h-full"
                        onSubmit={updateMachineHandler}
                    >
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">
                                Operator ID
                            </span>
                            <input
                                className="p-2 text-xl md:text-2xl"
                                type="number"
                                disabled
                                value={loginStatus.user?.user_id}
                            />
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">Status</span>
                            <select
                                className="p-2 border border-black text-xl md:text-2xl"
                                value={newStatus}
                                onChange={(e) => {
                                    setNewStatus(e.target.value);
                                }}
                            >
                                {status.map((item) => {
                                    return (
                                        <option
                                            key={item.status_id}
                                            value={item.status_id}
                                        >
                                            {item.status_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <span className=" mr-4 text-xl md:text-2xl">
                                Error
                            </span>
                            <select
                                className="p-2 border border-black text-xl md:text-2xl"
                                value={error}
                                onChange={(e) => setError(e.target.value)}
                            >
                                {errors.map((error) => {
                                    return (
                                        <option
                                            key={error.error_id}
                                            value={error.error_id}
                                        >
                                            {error.error_description}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">Product</span>
                            <input
                                className="p-2 border border-black text-xl md:text-2xl"
                                type="text"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col my-2">
                            <span className="text-xl md:text-2xl">Comment</span>
                            <textarea
                                className="p-2 border border-black text-xl md:text-2xl"
                                value={comment}
                                rows="3"
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <button className="py-2 px-4 text-xl md:text-2xl text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md ">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Machine;
