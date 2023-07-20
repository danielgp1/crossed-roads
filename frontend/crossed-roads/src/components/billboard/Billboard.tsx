import './Billboard.css'
import pfp from './assets/john.jpeg'

export default function Billboard() {
    return (
        <div className='billboard-grid'>
            <div className='billboard-content'>
                <div className='billboard-header'>
                    <div className='billboard-img-container'>
                        <img className='billboard-img' src={pfp} alt='pfp'></img>
                    </div>
                    <div className='billboard-info'>
                        <span className='billboard-names'>
                            John Cena
                        </span>
                        <span className='billboard-time'>2023-20-06 18:00</span>
                    </div>
                </div>
                <div className='billboard-text-container'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quos, dignissimos nihil distinctio deserunt nostrum dolores! Non impedit nam adipisci distinctio amet praesentium cumque deserunt, in dolorum perspiciatis, eaque neque?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quos, dignissimos nihil distinctio deserunt nostrum dolores! Non impedit nam adipisci distinctio amet praesentium cumque deserunt, in dolorum perspiciatis, eaque neque?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quos, dignissimos nihil distinctio deserunt nostrum dolores! Non impedit nam adipisci distinctio amet praesentium cumque deserunt, in dolorum perspiciatis, eaque neque?
                </div>
            </div>
            <div className='billboard-rect'></div>
        </div>
    )
}