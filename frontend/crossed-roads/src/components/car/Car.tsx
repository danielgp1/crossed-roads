import './Car.css'

interface CarProps {
    color: string;
    direction: string;
    name: string;
    pfp: string;
}

const Car: React.FC<CarProps> = ({ color, direction, name, pfp }:CarProps) => {
    return (
        <div className="car">
            <div className="window">
                <img className="pfp" src={pfp} alt="profile_pic"></img>
            </div>
            <div className="body" style={{ backgroundColor: color }}>
                <div className="headlights">
                    <div className="headlight" style={{backgroundColor: direction}}></div>
                    <div className="headlight" style={{backgroundColor: direction}}></div>
                </div>
                <div className="car-plate">
                    <p>{name}</p>
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