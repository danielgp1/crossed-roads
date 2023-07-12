import './Homepage.css'
import Navbar from '../navbar/Navbar'
import Main from './main/Main'

export default function Homepage() {
    return (
        <div className='home-body'>
            <Navbar />
            <Main />
        </div>
    )
}
