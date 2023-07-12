import './Homepage.css'
import Navbar from '../navbar/Navbar'
import Road from './Road'

export default function Homepage() {
    return (
        <div className='home-body'>
            <Navbar />
            <Road />
        </div>
    )
}
