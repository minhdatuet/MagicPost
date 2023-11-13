import React from 'react'
import './AboutUs.css'
import avt1 from '../../assets/images/avt1.jpg'
import avt3 from '../../assets/images/avt3.jpg'

const AboutUs = () => {
    return(
        <div id = "list">
            <div id = "student">
                <img id ="avt1" src = {avt1} alt = ""></img>
                <p>Ngô Yến Vi</p>
            </div>
            <div id = "student">
                <img id ="avt1" src = {avt1} alt = ""></img>
                <p>Lê Minh Đạt <br></br>
                (Nhóm trưởng)</p>
            </div>
            <div id = "student">
                <img id ="avt1" src = {avt3} alt = ""></img>
                <p>Ngô Thảo Hương</p>
            </div>
        </div>
    )
}

export default AboutUs