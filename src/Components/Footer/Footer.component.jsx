import React from 'react'
import './footer.styles.css'

const Footer = () => {
    return (
        <div className="footer">
            <p>Questions? Contact us.</p>
            <div className="footer-row">
                <ul className="first-row">
                    <li>FAQ</li>
                    <li>Investor Relations</li>
                    <li>Privacy</li>
                    <li>Speed Test</li>
                </ul>
                <ul className="2nd-row">
                    <li>Help Center</li>
                    <li>Jobs</li>
                    <li>Cookie Preferences</li>
                    <li>Legal Notices</li>
                </ul>

                <ul className="3rd-row">
                    <li>Accout</li>
                    <li>Ways to Watch</li>
                    <li>Corporate Information</li>
                    <li>Netlfix Origianls</li>
                </ul>

                <ul className="4th-row">
                    <li>Media Center</li>
                    <li>Terms of Use</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
