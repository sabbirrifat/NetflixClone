import React, {useEffect, useState} from 'react';
import './navbar.css';

const Navbar = ({user}) => {
    const [handleShow, sethandleShow] = useState(false);
    const baseAvaterUrl = "https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
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
            
            {
                user ? 
                <div className="nav-elements">
                    <img className="nav_avatar" src={user.photoUrl} alt=""/>
                </div> :
                <div className="nav-elements">
                    <img className="nav_avatar" src={baseAvaterUrl} alt=""/>
                </div>


                
            }
            
            
        </div>
    )
}

export default Navbar
