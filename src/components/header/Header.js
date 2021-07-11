import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import './Header.css'
export default function Header() {
    return (
        <div className="header">
            <Topbar />
            <Navbar />
        </div>
    )
}
