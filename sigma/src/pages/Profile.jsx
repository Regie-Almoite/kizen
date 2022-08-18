import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { userId } = useParams();

    return <h1>Profile of user : {userId}</h1>;
};

export default Profile;
