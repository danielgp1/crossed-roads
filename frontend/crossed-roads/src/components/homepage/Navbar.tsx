import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="nav-horizontal">
            <Link className='navbar-link' to="/">Crossed Roads</Link>
            <div className='navbar-funcs'>
                <Link className='navbar-link' to="/service">Service</Link>
                <Link className='navbar-link' to="/garage">Garage</Link>
            </div>
            <Link className='navbar-link' to="/welcome">Crash Out</Link>
        </nav>
    )
}