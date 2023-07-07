import './Homepage.css'

function Homepage() {
    return (
        <nav className="nav-horizontal">
            <div className="mask">
                <ul className="list">
                    <li className='homepage-li'><a className='homepage-a' href="/homepage">Crossed Roads</a></li>
                    <li className='homepage-li'><a className='homepage-a' href="/service">Service</a></li>
                    <li className='homepage-li'><a className='homepage-a' href="/garage">Garage</a></li>
                    <li className='homepage-li'><a className='homepage-a' href="/">Crash Out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Homepage;