import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Billboard from '../../billboard/Billboard';
import './PostsMain.css'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function PostsMain() {
    return (
        <div className='posts-main-grid'>
            <div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div>
            <div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div><div className='post-grid'>
                <Billboard />
                <div className='post-buttons-grid'>
                    <button className='post-button'><FontAwesomeIcon icon={faEdit} size='2x' color='#333333' /></button>
                    <button className='post-button'><FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' /></button>
                </div>
            </div>
        </div>
    );
}