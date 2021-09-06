import React from 'react'
import './Navbar.css'
export default function Navbar() {
    return (
        <div className="navbar d-flex">
            <div className="navbar__brand d-flex" onClick={()=> window.location.replace('/')}>
                <p>HappyTour</p>
                {/* <img alt="pt" src=""/> */}
                <p className="ml-2"> 😙</p>
            </div>
            <ul className="navbar__menu">
                <li>Home</li>
                <li>Tour list</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}
