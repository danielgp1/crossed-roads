import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ViewerObject.css'
import default_pic from '../assets/default_pic.png'
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function ViewerObject() {
    return (
        <div className='viewer-object'>
            <div className='viewer-header'>
                John Cena
            </div>
            <div className='viewer-pic-container'>
                <img className='viewer-profile-pic' src={default_pic} alt='pfp'></img>
            </div>
            <div className='viewer-object-buttons-container'>
                <button className='viewer-object-button'><FontAwesomeIcon icon={faUser} size='2x' color='#333333' /></button>
                <button className='viewer-object-button'><FontAwesomeIcon icon={faUserPlus} size='2x' color='#333333' /></button>
            </div>
        </div>
    )
}