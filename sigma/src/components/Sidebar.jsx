import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import logo from "../assets/images/KaizenLogo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { FaList } from "react-icons/fa";

const Sidebar = ({ loginStatus, setLoginStatus }) => {
    const logout = () => {
        axios.post("http://localhost:3001/users/logout").then((res) => {
            setLoginStatus(res.data);
        });
    };
    return (
        <div className="bg-[#fffffe] rounded-md m-2 p-2 relative">
            <div>
                <img src={logo} alt="kizen Logo" />
            </div>
            <div className="flex flex-col my-4">
                <Link
                    to={
                        loginStatus.user?.role_id === 1
                            ? "/adminDashboard"
                            : "/dashboard"
                    }
                    className="flex text-xl md:text-xl items-center p-4 hover:bg-gray-200"
                >
                    <MdOutlineDashboardCustomize size={30} className="mr-2" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to={`/profile/${loginStatus.user?.user_id}`}
                    className="flex text-xl md:text-xl items-center p-4 hover:bg-gray-200"
                >
                    <CgProfile size={30} className="mr-2" />
                    <span>Profile</span>
                </Link>
                <Link
                    to="/history"
                    className="flex text-xl md:text-xl items-center p-4 hover:bg-gray-200"
                >
                    <FaList size={30} className="mr-2" />
                    <span>Status History</span>
                </Link>
                <Link
                    to="/"
                    onClick={logout}
                    className="flex text-xl md:text-xl items-center p-4 hover:bg-gray-200"
                >
                    <BiLogOut size={30} className="mr-2" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
