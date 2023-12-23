import React, { useEffect } from 'react'
import './Loading.css'
import avt1 from '../../assets/images/avt1.jpg'
import avt3 from '../../assets/images/avt3.jpg'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import runner from '../../assets/images/runner.gif'
import { useNavigate } from 'react-router-dom'

const Loading = () => {    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLogged} = useSelector(state => state.auth)
    const {userData} = useSelector(state => state.user)

    useEffect(() => {
        setTimeout(() => {
            isLogged && dispatch(actions.getUser())
        },500)
        
    },[isLogged])

    console.log(userData)
    let i = 0
    useEffect(() => {
            userData && setTimeout(() => {

                if (!(Object.keys(userData).length === 0) && !(userData.length === 0)) {
                    console.log(Object.keys(userData[0])[18]);
                    localStorage.setItem('role', userData[0].accountType);
                    localStorage.setItem('id', userData[0].id);
                    localStorage.setItem('name', userData[0].name);
                    localStorage.setItem('transactionPointId', Object.values(userData[0])[15] || '1')
                    localStorage.setItem('warehouseId', Object.values(userData[0])[18] || '1')
                    navigate('/boss/dashboard');
                    window.location.reload();
                }
                
                
            }, 1000);
    },[userData])
    
    return(
        <div className='loading'>
              <div className='loadingLogo'>
                <div className='loadingPost'>
                  <h1>Bạn có biết?</h1>
                  <br></br>
                  <p>Magic Post là đơn vị vận chuyển có số lượng người dùng trong năm 2023 cao nhất việt nam</p>
                </div>
                <img src={runner} alt="" />
              </div>
              <div className = "loader"></div> 
            </div>
    )
}

export default Loading 