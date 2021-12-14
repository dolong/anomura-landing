import { Link } from 'react-router-dom'
import "sass/components/navbar.css"

/**
 * The main navarb for the website.
 * @returns 
 */
export default function Navbar() {
    return (
        <div className="nav-menu container d-flex">
            <div>
                <img src="" alt="" className="brand-logo" />
            </div>
            <div className="nav-list">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/" className="nav-item">Battle</Link>
                <Link to="/" className="nav-item">Land</Link>
                <Link to="/" className="nav-item">AXS</Link>
                <Link to="/" className="nav-item">News</Link>
                <Link to="/" className="nav-item">Marketplace</Link>
                {/* //TODO: The below might need to be turned into a drop down menu.*/}
                <Link to="/" className="nav-item">More</Link>
            </div>
        </div>
    )
}
