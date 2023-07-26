import './Billboard.css'
import default_pic from '../assets/default_pic.png'


interface BillboardProps {
    first_name: string;
    last_name: string;
    profile_picture_url: string;
    created_at: string;
    content: string;
}


const Billboard: React.FC<BillboardProps> = ({ first_name, last_name, profile_picture_url, created_at, content }:BillboardProps) => {
    return (
        <div className='billboard-grid'>
            <div className='billboard-content'>
                <div className='billboard-header'>
                    <div className='billboard-img-container'>
                        <img className='billboard-img' src={profile_picture_url ?? default_pic} alt='pfp'></img>
                    </div>
                    <div className='billboard-info'>
                        <span className='billboard-names'>
                            {first_name} {last_name}
                        </span>
                        <span className='billboard-time'>{created_at}</span>
                    </div>
                </div>
                <div className='billboard-text-container'>
                  {content}
                </div>
            </div>
            <div className='billboard-rect'></div>
        </div>
    )
}

export default Billboard;