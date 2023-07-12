import pic from './assets/image.jpg'
import './Car.css'

export default function Car() {
    return (
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
    )
}