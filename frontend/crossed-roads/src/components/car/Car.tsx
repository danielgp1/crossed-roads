import pic from './assets/john.jpeg'
import './Car.css'

interface CarProps {
    color: string;
}

const Car: React.FC<CarProps> = ({ color }) => {
    return (
        <div className="car">
            <div className="window">
                <img className="pfp" src={pic} alt="profile_pic"></img>
            </div>
            <div className="body" style={{ backgroundColor: color }}>
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
    )
}

export default Car;