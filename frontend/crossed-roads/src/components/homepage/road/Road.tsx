import Car from "../../car/Car"
import './Road.css'


export default function Road() {
    return (
        <div className="road">
            <div className="grid-item">
                <Car />
            </div>
            <div className="grid-item">
                <div className="line-separator"></div>
            </div>
            <div className="grid-item">
            </div>
        </div>
    )
}