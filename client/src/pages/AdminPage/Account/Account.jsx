import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { apiLogin, apiRegister } from "../../../services/auth";

const Account = () => {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        name: 'Dat',
        phone: '0393516207',
        password: 'Minhdat1234',
        address: 'Thai Nguyen',
        accountType: 'POINT_STAFF',
        positionId: '1'
      })

    const handleSubmit = async () => {
        console.log(payload)
        const response = dispatch(actions.register(payload))
        console.log(response)
      }

    return (
        <div>
            <h1 style={{textAlign: "center", margin: "auto"} }>Account</h1>
            <button onClick={() => handleSubmit()}>Click Me!</button>
        </div>
    );
};

export default Account;