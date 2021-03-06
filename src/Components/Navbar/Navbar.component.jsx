import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import './navbar.styles.css';

const Navbar = ({user}) => {
    const [handleShow, sethandleShow] = useState(false);
    const history = useHistory();
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
            <img className="nav_logo" onClick={() => history.push('/')} src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt=""/>
               
                <div className="nav-elements">
                    {
                     user ? 
                        <ul className={handleShow ? 'blackBack' : ''}>
                            <li className="nav-links" onClick={() => history.push('/mylist')}>My List</li>
                            <li className="nav-links" onClick={() => auth.signOut()} >Sign Out</li>
                            <li><img className="nav_avatar" src={user.photoUrl !== 'default' ? user.photoUrl : baseAvaterUrl} alt=""/></li>
                        </ul> :
                        <img className="nav_avatar" onClick={() => history.push('/login')} src={baseAvaterUrl} alt=""/>
                     }
                </div>
            
            
        </div>
    )
}

export default Navbar
