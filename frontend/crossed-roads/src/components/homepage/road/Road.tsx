import Car from "../../car/Car"
import './Road.css'


export default function Road() {
    return (
        <div className="road">
            <div className="grid-item">
                <div className="your-car">
                    <Car color={"red"} direction={"#f9d71c"}/>
                </div>
            </div>
            <div className="grid-item">
                <div className="line-separator"></div>
            </div>
            <div className="grid-item">
                <div className="oncoming-traffic">
                    <div className="person">
                        <Car color={"maroon"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"yellow"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"green"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"blue"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"white"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"purple"} direction={"red"}/>
                    </div>
                    <div className="person">
                        <Car color={"cyan"} direction={"red"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}