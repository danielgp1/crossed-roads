import { useUserContext } from "../../../contexts/UserContext";
import Car from "../../car/Car"
import './Road.css'
import def from '../../assets/default_pic.png'

export default function Road() {
    const { user } = useUserContext();
    return (
        <div className="road">
            <div className="grid-item">
                <div className="your-car">
                    <Car color={user?.current_color!} direction="#f9d71c" name={user?.first_name!} pfp={user?.profile_pic_url || def}/>
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