import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
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
    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState("");
    const [newStatus, setNewStatus] = useState(null);
    const [error, setError] = useState(1);
    const [product, setProduct] = useState("");

    const getMachine = async () => {
        try {
            const machineData = await axios
                .get(`http://localhost:3001/machine/${machineId}`)
                .then((res) => {
                    console.log(res.data[0]);
                    return res.data[0];
                });

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

    useEffect(() => {
        getMachine();
        getStatus();
        getErrors();
    }, []);

    return (
        <div className="flex bg-[#16161a] p-4 h-screen">
            <Sidebar />
            <div className="m-4 p-4 bg-[#fffffe] rounded-md w-full">
                <div>
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
                            <div className="my-4">
                                <p className="text-[#fffffe]">EQUIPMENT NO:</p>
                                <p className="text-[#94a1b2] pl-4">
                                    MT-{machine.machine_id}
                                </p>
                            </div>
                            <div className="my-4">
                                <p className="text-[#fffffe]">STATUS:</p>
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
                                    <p className=" pl-4">
                                        {machine.status_name}. . .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form>
                    <div>
                        <span>Operator ID</span>
                        <input
                            type="number"
                            disabled
                            value={loginStatus.user?.user_id}
                        />
                    </div>
                    <div>
                        <span>Status</span>
                        <select
                            value={machine.status_id}
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
                    <div>
                        <span>Error</span>
                        <select
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
                    <div>
                        <span>Product</span>
                        <input
                            type="text"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Comment</span>
                        <textarea
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Machine;
