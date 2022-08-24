import React from "react";
import desert from "../assets/images/desert.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <img src={desert} alt="desert" />
            <p>Oops, looks like you're in the middle of nowhere.</p>
            <p>
                Let me guide you{" "}
                <Link to="/" className="text-blue-500">
                    back to home
                </Link>
            </p>
        </div>
    );
};

export default PageNotFound;
