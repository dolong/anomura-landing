import { Link } from 'react-router-dom'


/**
 * The main navarb for the website.
 * @returns 
 */
export default function Navbar() {
    return (
        <div className="nav-menu">
            <div>
                <img src="" alt="" className="brand-logo" />
            </div>
            <div>
                <nav className="nav-list">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/" className="nav-item">Battle</Link>
                    <Link to="/" className="nav-item">Land</Link>
                    <Link to="/" className="nav-item">AXS</Link>
                    <Link to="/" className="nav-item">News</Link>
                    <Link to="/" className="nav-item">Marketplace</Link>
                    {/* //TODO: The below might need to be turned into a drop down menu.*/}
                    <Link to="/" className="nav-item">More</Link>
                </nav>
            </div>
        </div>
    )
}
