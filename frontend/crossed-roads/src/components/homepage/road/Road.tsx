import Car from "../../car/Car"
import './Road.css'


export default function Road() {
    return (
        <div className="road">
            <div className="grid-item">
                <div className="your-car">
                    <Car color="red" direction="#f9d71c" name='' pfp=''/>
                </div>
            </div>
            <div className="grid-item">
                <div className="line-separator"></div>
            </div>
            <div className="grid-item">
                <div className="oncoming-traffic">
                    <div className="person">
                        <Car color="maroon" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="yellow" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="green" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="blue" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="white" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="purple" direction="red" name='' pfp=''/>
                    </div>
                    <div className="person">
                        <Car color="cyan" direction="red" name='' pfp=''/>
                    </div>
                </div>
            </div>
        </div>
    )
}