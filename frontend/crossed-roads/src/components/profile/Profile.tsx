import Car from '../car/Car'
import './Profile.css'
import pic from './assets/john.jpeg'

export default function Profile() {
    return (
        <div className="profile-grid">
            <div className='profile-data'>
                <div className='profile-pic-container'>
                    <img className='profile-pic' alt='profile pic' src={pic} ></img>
                </div>
                <div className='profile-info'>
                    <span className='names'>John Cena</span> 
                    <div className='info-car'>
                        <div className='other-info'>
                            <div className="profile-field">
                                <label className='field-label'>Username:</label>
                                <span className='field-span'>johncena#1234</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Email:</label>
                                <span className='field-span'>john@mail.com</span>
                            </div>
                            <div className="profile-field">
                                <label className='field-label'>Birthday:</label>
                                <span className='field-span'>1969-01-20</span>
                            </div>
                        </div>
                        <div className='car-container'>
                            <Car color={"blue"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-buttons'>
  
                <button className='profile-button'>Edit Profile Data</button>
                <button className='profile-button'>Change Password</button>
                <button className='profile-button'>Create a Post</button>
                <button className='profile-button'>Manage Posts</button>
            </div>
        </div>
    )
}