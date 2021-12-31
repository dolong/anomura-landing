import { Link } from 'react-router-dom'
import "sass/components/navbar.css"
import MenuLogo from "img/logos/menu_logo.png";
import "nes.css/css/nes.min.css";
/**
 * The main navbar for the website.
 * @returns 
 */
export default function Navbar() {
    return (
        <div className="nav-menu container ">
            <div>
                <img src={MenuLogo} alt="" className="nav-logo" />
            </div>
            <div className="nav-list">
                <Link to="/" className="nav-item">Home</Link>
            </div>
            <div className="nav-icons">
                <i className="nes-icon instagram is-large"></i>
                <i className="nes-icon linkedin is-large"></i>
                <i className="nes-icon medium is-large"></i>
            </div>
        </div>
    )
}
