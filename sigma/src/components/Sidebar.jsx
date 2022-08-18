import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import logo from "../assets/images/KaizenLogo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
    const { loginStatus, setLoginStatus } = useContext(AppContext);

    const logout = () => {
        axios.post("http://localhost:3001/logout").then((res) => {
            console.log(res);
            setLoginStatus(res.data);
        });
    };

    return (
        <div className="bg-[#fffffe] rounded-md m-4">
            <div>
                <img src={logo} alt="kizen Logo" />
            </div>
            <div>
                <Link to="/adminDashboard">
                    <MdOutlineDashboardCustomize size={30} />
                    <span>Dashboard</span>
                </Link>
                <Link to={`/profile/${loginStatus.user_id}`}>
                    <CgProfile size={30} />
                    <span>Profile</span>
                </Link>
                <Link to="/" onClick={logout}>
                    <BiLogOut size={30} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
