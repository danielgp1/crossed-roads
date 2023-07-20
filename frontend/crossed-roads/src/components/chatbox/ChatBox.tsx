import './ChatBox.css'
import default_pic from '../assets/default_pic.png'


export default function ChatBox() {
    return (
        <div className='chatbox-grid'>
            <div className='chatbox-status-container'>
                <div className='chatbox-status'></div>
            </div>
            <div className='chatbox-pic-container'>
                <img className='chatbox-pic' src={default_pic} alt='pic'></img>
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