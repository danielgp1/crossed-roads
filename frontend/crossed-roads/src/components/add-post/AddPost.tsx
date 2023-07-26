import { useState } from 'react';
import './AddPost.css'
import axios from 'axios';

interface AddPostProps {
    setIsAddPostOpen: (isAddPostOpen: boolean) => void;
}

export default function AddPost({ setIsAddPostOpen }: AddPostProps) {
    const [postContent, setPostContent] = useState('');

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleCloseChangePassword = () => {
        setIsAddPostOpen(false);
    };


    const post = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const authToken = localStorage.getItem('userToken');
            const userID = localStorage.getItem('userID');
            const postData = {
                user_id: userID,
                content: postContent,
            };
            await axios.post('http://localhost:8080/api/posts', postData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
        } catch (error: any) {
            console.error("Error posting:", error);
        }
        handleCloseChangePassword();
    }

    return (
        <div className="add-post-form-overlay">
            <form className="add-post-form-container" onSubmit={post}>
                <button
                    className="close-button"
                    onClick={handleCloseChangePassword}
                >
                    Close
                </button>
                <label className="post-lbl">Share Your Wisdom</label>
                <textarea
                    required
                    className="post-area"
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={handlePostChange}
                />
                <button
                    className='change-button'
                    type="submit"
                >
                    Post
                </button>
            </form>
        </div>
    )
}