import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import logo from "../assets/images/KaizenLogo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { FaList } from "react-icons/fa";

const Sidebar = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);

    const logout = () => {
        axios.post("http://localhost:3001/logout").then((res) => {
            console.log(res);
            setLoginStatus(res.data);
        });
    };

    return (
        <div className="bg-[#fffffe] rounded-md m-4 p-4 relative">
            <div>
                <img src={logo} alt="kizen Logo" />
            </div>
            <div className="flex flex-col my-4">
                <Link
                    to="/adminDashboard"
                    className="flex text-2xl md:text-3xl items-center p-4 hover:bg-gray-200"
                >
                    <MdOutlineDashboardCustomize size={30} className="mr-4" />
                    <span className="text-2xl md:text-3xl">Dashboard</span>
                </Link>
                <Link
                    to={`/profile/${loginStatus.user.user_id}`}
                    className="flex text-2xl md:text-3xl items-center p-4 hover:bg-gray-200"
                >
                    <CgProfile size={30} className="mr-4" />
                    <span className="text-2xl md:text-3xl">Profile</span>
                </Link>
                <Link
                    to="/history"
                    className="flex text-2xl md:text-3xl items-center p-4 hover:bg-gray-200"
                >
                    <FaList size={30} className="mr-4" />
                    <span className="text-2xl md:text-3xl">Status History</span>
                </Link>
                <Link
                    to="/"
                    onClick={logout}
                    className="flex text-2xl md:text-3xl items-center p-4 hover:bg-gray-200"
                >
                    <BiLogOut size={30} className="mr-4" />
                    <span className="text-2xl md:text-3xl">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
