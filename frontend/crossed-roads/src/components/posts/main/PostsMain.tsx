import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Billboard from '../../billboard/Billboard';
import './PostsMain.css'
import { faEdit, faSave, faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';
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
    const [userPosts, setUserPosts] = useState<Post[] | null>(null);
    const [editablePostId, setEditablePostId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState('');

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const userToken = localStorage.getItem('userToken');
                const userID = localStorage.getItem('userID')
                if (!userToken) {
                    console.error('User token not found in localStorage');
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${userToken}`,
                };

                const response = await axios.get(`http://10.16.6.25:8080/api/posts/users/${userID}`, { headers });
                const sortedPosts = response.data.sort((a: Post, b: Post) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB.getTime() - dateA.getTime();
                });
                setUserPosts(sortedPosts)
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

    const handleDeletePost = (postId: number) => () => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            console.error('User token not found in localStorage');
            return;
        }

        const headers = {
            Authorization: `Bearer ${userToken}`,
        };

        axios
            .delete(`http://10.16.6.25:8080/api/posts/${postId}`, { headers })
            .then(() => {
                setUserPosts((prevPosts) => prevPosts!.filter((post) => post.post_id !== postId));
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const handleSavePost = (postId: number, editedContent: string) => async () => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            console.error('User token not found in localStorage');
            return;
        }

        const headers = {
            Authorization: `Bearer ${userToken}`,
        };

        if (editedContent.trim() === '') {
            setEditablePostId(null);
            setIsEditing(false);
            return;
        }

        try {
            await axios.put(
                `http://10.16.6.25:8080/api/posts/${postId}`,
                { content: editedContent },
                { headers }
            );

            setUserPosts((prevPosts) =>
                prevPosts?.map((post) =>
                    post.post_id === postId ? { ...post, content: editedContent } : post
                ) ?? []
            );

            setEditablePostId(null);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDiscardChanges = () => {
        setEditablePostId(null);
        setIsEditing(false);
    }

    return (
        <>
            {
                userPosts === null ? <div className='posts-no-posts'></div> : (userPosts as Post[]).length === 0 ? (
                    <div className='posts-no-posts'>You Haven't Posted Anything Yet</div>
                ) : (
                    <div className='posts-main-grid'>
                        {userPosts.map((post) => (
                            <div key={post.post_id} className='post-grid'>
                                <Billboard
                                    first_name={user?.first_name!}
                                    last_name={user?.last_name!}
                                    profile_picture_url={user?.profile_pic_url ?? def}
                                    created_at={formatDateTime(post.created_at)}
                                    content={post.content}
                                    editable={editablePostId === post.post_id}
                                    onContentChange={(editedContent) => setEditedPostContent(editedContent)}
                                />

                                {editablePostId === post.post_id && isEditing ? (
                                    <div className='post-buttons-grid'>
                                        <button className='post-button' onClick={handleSavePost(post.post_id, editedPostContent)}>
                                            <FontAwesomeIcon icon={faSave} size='2x' color='#333333' />
                                        </button>
                                        <button className='post-button' onClick={handleDiscardChanges}>
                                            <FontAwesomeIcon icon={faUndo} size='2x' color='#333333' />
                                        </button>
                                    </div>
                                ) : (
                                    <div className='post-buttons-grid'>
                                        <button
                                            className='post-button'
                                            onClick={() => {
                                                setEditablePostId(isEditing ? null : post.post_id);
                                                setIsEditing(!isEditing);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} size='2x' color='#333333' />
                                        </button>
                                        <button className='post-button' onClick={handleDeletePost(post.post_id)}>
                                            <FontAwesomeIcon icon={faTrashCan} size='2x' color='#333333' />
                                        </button>
                                    </div>

                                )}

                            </div>
                        ))}
                    </div>
                )};
        </>
    )
}