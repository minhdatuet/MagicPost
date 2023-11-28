import React from 'react';
import './HeaderRole.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useState } from 'react';

function HeaderRole ({ btnText, onClick }) {
    const [isShowInfo, setShowInfo] = useState(false);

    return (
        <div className='dashboard-header-container'>
            {btnText && 
                <button className='dashboard-header-btn' onClick={onClick}>{btnText}</button>
            }

            <div className='dashboard-header-right'>
                <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashboard-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashboard-header-icon' />
                <img
                    className='dashboard-header-avatar'
                    src='https://reqres.in/img/faces/9-image.jpg'
                    onClick={() => setShowInfo(true)} />   
                    {isShowInfo && (
                        <div className='info-box'>
                            <p>This is additional information.</p>
                            <button onClick={() => setShowInfo(false)}>Close</button>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default HeaderRole;
