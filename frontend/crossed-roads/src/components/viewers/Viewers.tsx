import { useEffect, useState } from 'react';
import ViewerObject from '../viewer-object/ViewerObject'
import './Viewers.css'
import axios from 'axios';

interface Visitor {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    current_color: string;
    profile_pic_url: string;
    visited_at: string;
}

export default function Viewers() {
    const [visitors, setVisitors] = useState<Visitor[] | null>(null);

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            axios
                .get(`http://localhost:8080/api/users/${userID}/visitors`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                })
                .then((response) => {
                    const sortedVisitors = response.data.sort((a: Visitor, b: Visitor) => {
                        const dateA = new Date(a.visited_at);
                        const dateB = new Date(b.visited_at);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setVisitors(sortedVisitors);
                })
                .catch((error) => console.error('Error fetching friends:', error));
        }
    }, []);

    console.log(visitors?.length);
    return (
        <div className='viewers-grid'>
            <div className='viewers-header'>Travellers Who Stopped By</div>
            {
                visitors === null ? <div className='viewers-no-viewers'></div> : (visitors as Visitor[]).length === 0 ? (
                    <div className='viewers-no-viewers'>No one, kinda sad :(</div>
                ) : (
                    <div className='viewers-container'>
                        {(visitors as Visitor[]).map((visitor) => (
                            <ViewerObject
                                key={visitor.id}
                                id={visitor.id}
                                first_name={visitor.first_name}
                                last_name={visitor.last_name}
                                profile_name={visitor.profile_name}
                                profile_pic_url={visitor.profile_pic_url}
                                visited_at={visitor.visited_at}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    )

}




// return (
//     <div className='viewers-grid'>
//         <div className='viewers-header'>Travellers Who Stopped By</div>
//         <div className='viewers-container'>
//             <ViewerObject id={1} first_name='Vistor' last_name='Visitor' profile_pic_url='' visited_at='' />
//         </div>
//     </div>
// )

// return (
//     <>
//         {
//             friends === null ? <div className='garage-no-friends'></div> : (friends as Friend[]).length === 0 ? (
//                 <div className='garage-no-friends'>Go Find Some Friends :(</div>
//             ) : (
//                 <div className='garage-main-grid'>
//                     {(friends as Friend[]).map((friend) => (
//                         <GarageObject
//                             key={friend.id}
//                             id={friend.id}
//                             first_name={friend.first_name}
//                             last_name={friend.last_name}
//                             profile_name={friend.profile_name}
//                             current_color={friend.current_color}
//                             profile_pic_url={friend.profile_pic_url}
//                         />
//                     ))}
//                 </div>
//             )}
//     </>
// )

