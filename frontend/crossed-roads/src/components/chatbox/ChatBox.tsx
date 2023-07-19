import './ChatBox.css'
import img from './assets/john.jpeg'

export default function ChatBox() {
    return (
        <div className='chatbox-grid'>
            <div className='chatbox-status-container'>
                <div className='chatbox-status'></div>
            </div>
            <div className='chatbox-pic-container'>
                <img className='chatbox-pic' src={img} alt='pic'></img>
            </div>
            <div className='chatbox-content-wrapper'>
                <div className='chatbox-content'>
                    <span className='chatbox-names'>John Cena</span>
                    <span className='chatbox-last-msg'>Now you see me now you don't.</span>
                </div>
            </div>
        </div>
    )
}