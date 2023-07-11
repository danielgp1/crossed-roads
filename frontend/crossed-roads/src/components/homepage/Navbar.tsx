import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="nav-horizontal">
            <div className="mask">
                <ul className="list">
                    <li className='homepage-li'><Link className='homepage-a' to="/">Crossed Roads</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/service">Service</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/garage">Garage</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/welcome">Crash Out</Link></li>
                </ul>
            </div>
        </nav>
    )
}