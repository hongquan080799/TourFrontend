import React from 'react'
import './Topbar.css'
export default function Topbar() {
    return (
        <div className="topbar d-flex justify-content-between align-content-center">
            <div className="topbar__contact d-flex justify-content-around">
                <p><i className="fas fa-envelope"></i> <span>hongquan080799@gmail.com</span></p>
                <p><i className="fas fa-phone"></i> <span>Hotline: 0336781801</span></p>
            </div>
            <div className="topbar__utils d-flex justify-content-around">
                <p><i className="fas fa-sign-in-alt"></i> <span>Login</span></p>
                <p><i className="fas fa-bell"></i> <span>Notification</span></p>
            </div>
        </div>
    )
}
