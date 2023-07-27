import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ViewerObject.css'
import default_pic from '../assets/default_pic.png'
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


interface ViewerObjectProps {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    profile_pic_url: string;
    visited_at: string;
}

const ViewerObject: React.FC<ViewerObjectProps> = ({ id, first_name, last_name, profile_name, profile_pic_url, visited_at }: ViewerObjectProps) => {
    const navigate = useNavigate();

    const handleOpenProfilePage = () => {
        navigate(`/users/${profile_name}`);
    };
    
    const formatDateTime = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + (date.getHours() + 3)).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${day}.${month}.${year} at ${hours}:${minutes}`;
    };

    return (
        <div className='viewer-object'>
            <div className='viewer-header-grid'>
                <div className='viewer-names'>{first_name} {last_name}</div>
                <div className='viewer-time'>{formatDateTime(visited_at)}</div>
            </div>
            <div className='viewer-pic-container'>
                <img className='viewer-profile-pic' src={profile_pic_url ?? default_pic} alt='pfp'></img>
            </div>
            <div className='viewer-object-buttons-container'>
                <button className='viewer-object-button' onClick={handleOpenProfilePage}><FontAwesomeIcon icon={faUser} size='2x' color='#333333' /></button>
                <button className='viewer-object-button'><FontAwesomeIcon icon={faUserPlus} size='2x' color='#333333' /></button>
            </div>
        </div>
    )
}

export default ViewerObject;