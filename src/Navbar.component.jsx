import React, {useEffect, useState} from 'react';
import './navbar.css';

const Navbar = () => {
    const [handleShow, sethandleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 150){
                sethandleShow(true)
            }
            else{
                sethandleShow(false)
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
        
    }, [])
    return (
        <div className={`navbar ${handleShow ? 'show' : ''}`}>
            <img className="nav_logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" alt=""/>
            <img className="nav_avatar" src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt=""/>
        </div>
    )
}

export default Navbar
