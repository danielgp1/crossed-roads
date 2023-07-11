import './Homepage.css'
import Car from './Car'
import Navbar from './Navbar'

export default function Homepage() {
    return (
        <div className='home-body'>
            <Navbar />
            <div className="road">
                <Car />
                <div className="lane-separator"></div>
                <Car />
            </div>
        </div>
    )
}
