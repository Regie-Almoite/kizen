import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    const { userId } = useParams();
    const [edit, setEdit] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        alert("submitted");
    };
    return (
        <div className="flex bg-[#16161a] p-4 h-screen">
            <Sidebar />
            <div className="m-4 p-4 w-full rounded-md flex justify-center items-center bg-[#fffffe]">
                <div className="w-[500px] h-[500px] p-4 rounded-md">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Employee ID:{" "}
                        <span className="font-light">{userId}</span>
                    </h1>
                    {edit ? (
                        <form onSubmit={submitHandler}>
                            <div className="flex flex-col my-4">
                                <span className="text-2xl md:text-3xl">
                                    First Name
                                </span>
                                <input
                                    className="text-1xl md:text-2xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col my-4">
                                <span className="text-2xl md:text-3xl">
                                    Last Name
                                </span>
                                <input
                                    className="text-1xl md:text-2xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                />
                            </div>
                            <button className="text-2xl md:text-3xl p-4 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md">
                                Update
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="flex my-4 items-center">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    First Name:
                                </h2>
                                <p
                                    className="text-2xl md:text-3xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    Regienald
                                </p>
                            </div>
                            <div className="flex my-4 items-center">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    Last Name:
                                </h2>
                                <p
                                    className="text-2xl md:text-3xl p-4 rounded-md border-[#010101]"
                                    type="text"
                                >
                                    Almoite
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <button className="text-2xl md:text-3xl p-4 cursor-pointer border-4 border-[#7f5af0] hover:border-[#9B80EC] rounded-md" onClick={() => setEdit(!edit)}>
                                    Edit name
                                </button>
                                <button className="text-2xl md:text-3xl p-4 text-[#fffffe] cursor-pointer bg-[#7f5af0] hover:bg-[#9B80EC] rounded-md">
                                    Change password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
