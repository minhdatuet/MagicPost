import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
    const {warehouses} = useSelector(state => state.warehouse)
    console.log(warehouses)
    return (
        <div>
            <h1 style={{textAlign: "center", margin: "auto"} }>Account</h1>
        </div>
    );
};

export default Account;