import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Billboard from '../../billboard/Billboard';
import './PostsMain.css'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../../../contexts/UserContext';
import def from '../../assets/default_pic.png'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
    post_id: number,
    created_at: string;
    content: string;
}

export default function PostsMain() {
    const { user } = useUserContext();
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const userToken = localStorage.getItem('userToken');
                if (!userToken) {
                    console.error('User token not found in localStorage');
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${userToken}`,
                };

                const response = await axios.get(`http://localhost:8080/api/posts`, { headers });
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };
        fetchUserPosts();
    }, []);


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
        <div className='posts-main-grid'>
            {userPosts.map((post) => (
                <div key={post.post_id} className='post-grid'>
                    <Billboard
                        first_name={user?.first_name!}
                        last_name={user?.last_name!}
                        profile_picture_url={user?.profile_pic_url ?? def}
                        created_at={formatDateTime(post.created_at)}
                        content={post.content}
                    />
                    <div className='post-buttons-grid'>
                        <button className='post-button'>
                            <FontAwesomeIcon icon={faEdit} size='2x' color='#333333' />
                        </button>
                        <button className='post-button'>
                            <FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}