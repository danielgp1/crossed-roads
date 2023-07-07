import { Link } from 'react-router-dom';
import './Homepage.css'


function Homepage() {
    return (
        <nav className="nav-horizontal">
            <div className="mask">
                <ul className="list">
                    <li className='homepage-li'><Link className='homepage-a' to="/homepage">Crossed Roads</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/service">Service</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/garage">Garage</Link></li>
                    <li className='homepage-li'><Link className='homepage-a' to="/">Crash Out</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Homepage;