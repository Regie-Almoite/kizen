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

    useEffect(() => {
        axios.get("http://localhost:3001/machines").then((res) => {
            setMachines(res.data);
            console.log(res.data);
        });
        // axios.get("http://localhost:3001/login").then((res) => {
        //     if (res.data.loggedIn) {
        //         setLoginStatus({
        //             loggedIn: true,
        //             user: {
        //                 user_id: res.data.user[0].user_id,
        //                 first_name: res.data.user[0].first_name,
        //                 last_name: res.data.user[0].last_name,
        //                 role_id: res.data.user[0].role_id,
        //             },
        //         });
        //     } else {
        //         setLoginStatus(res.data);
        //     }
        // });
        // if (!loginStatus.loggedIn) {
        //     navigate("/");
        // } else if (loginStatus.user?.role_id === 1) {
        //     navigate("/adminDashboard");
        // } else {
        //     navigate("/dashboard");
        // }
    }, [
        loginStatus.loggedIn,
        loginStatus.user?.role_id,
        navigate,
        setLoginStatus,
    ]);

    return (
        <div className="flex bg-[#16161a] m-4 p-4 h-screen">
            <Sidebar />
            <div className="p-4 m-4 max-h-screen grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[20px] w-full bg-[#fffffe] overflow-auto rounded-md">
                {loginStatus.user.role_id === 2
                    ? machines.map((machine) => {
                          return (
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
                          );
                      })
                    : machines.map((machine) => {
                          return (
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
                              </Link>
                          );
                      })}
            </div>
        </div>
    );
};

export default Dashboard;
