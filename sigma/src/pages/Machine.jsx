import React from "react";
import { Params, useParams } from "react-router-dom";

const Machine = () => {
    const { machineId } = useParams();
    return <h1>{machineId}</h1>;
};

export default Machine;
