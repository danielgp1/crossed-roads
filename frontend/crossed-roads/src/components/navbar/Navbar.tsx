import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import logo from './assets/CR.png'
import { isLoggedIn } from '../auth/auth';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => { 
        navigate("/welcome");
        localStorage.clear()
    }

    const handleHome = () => {
        isLoggedIn() ? navigate("/") : handleLogout()
    }

    const handleService = () => {
        isLoggedIn() ? navigate("/service") : handleLogout()
    }

    const handleGarage = () => {
        isLoggedIn() ? navigate("/garage") : handleLogout()
    }

    return (
        <nav className="nav-horizontal">
            <div className='navbar-group1'>
                <img 
                    className='navbar-img' 
                    src={logo} 
                    alt="Crossed Roads"
                    onClick={handleHome}>
                </img>
                <Searchbar/ >
            </div>
            <div className='navbar-group2'>
                <button 
                    className='navbar-btn' 
                    type='button'
                    onClick={handleGarage}>
                    Garage
                </button>
                <button 
                    className='navbar-btn' 
                    type='button'
                    onClick={handleService}>
                    Service
                </button>
                <button 
                className='navbar-btn' 
                type='button'
                onClick={handleLogout}>
                Crash Out
            </button>
            </div>
        </nav>
    )
}