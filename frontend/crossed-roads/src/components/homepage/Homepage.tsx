import { Link } from 'react-router-dom';
import './Homepage.css'
import pic from './image.jpg'
import pic2 from './john.jpeg'



function Homepage() {
    return (
        <div className='homepage-body'>
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
            <div className="road">
                <div className="left-line"></div>
                <div className="car">
                    <div className="window">
                        <img className="pfp" src={pic} alt="profile_pic"></img>
                    </div>
                    <div className="body">
                        <div className="headlights">
                            <div className="headlight"></div>
                            <div className="headlight"></div>
                        </div>
                        <div className="car-plate">
                            <p>Daniel Petrov</p>
                        </div>
                    </div>
                    <div className="wheels">
                        <div className="wheel"></div>
                        <div className="wheel"></div>
                    </div>
                </div>
                <div className="lane-separator"></div>
                <div className="car">
                    <div className="window">
                        <img className="pfp" src={pic2} alt="profile_pic"></img>
                    </div>
                    <div className="body">
                        <div className="headlights">
                            <div className="headlight"></div>
                            <div className="headlight"></div>
                        </div>
                        <div className="car-plate">
                            <p>John Cena</p>
                        </div>
                    </div>
                    <div className="wheels">
                        <div className="wheel"></div>
                        <div className="wheel"></div>
                    </div>
                </div>
                <div className="right-line"></div>
            </div>
        </div>
    )
}

export default Homepage;