import { useEffect, useState } from "react";
import Chat from "../../chat/Chat";
import Road from "../road/Road";
import './Main.css'
import axios from "axios";
import Billboard from "../../billboard/Billboard";

interface FriendPost {
    post_id: number,
    user_id: number,
    first_name: string,
    last_name: string,
    profile_pic_url: string,
    content: string,
    created_at: string,
    updated_at: string,
}

export default function Main() {
    const [friendsPosts, setFriendsPosts] = useState<FriendPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const authToken = localStorage.getItem('userToken');
            const userID = localStorage.getItem("userID")

            await axios
                .get(`http://10.16.6.25:8080/api/posts/users/${userID}/friends-posts`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then(async (response) => {
                    const sortedPosts = response.data.sort((a: FriendPost, b: FriendPost) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setFriendsPosts(sortedPosts)
                })
                .catch((error) => {
                    console.error('Error fetching friends posts:', error);
                });
        }
        fetchPosts();
    }, []);

    const leftPosts: FriendPost[] = [];
    const rightPosts: FriendPost[] = [];
    friendsPosts.forEach((post, index) => {
        if (index % 2 === 0) {
            leftPosts.push(post);
        } else {
            rightPosts.push(post);
        }
    });

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
        <div className="main-grid">
            <div className="main-content">
                <div className="billboards-container-left">
                    {leftPosts.map((post) => (
                        <div className="post-left" key={post.post_id}>
                            <Billboard
                                first_name={post.first_name}
                                last_name={post.last_name}
                                profile_picture_url={post.profile_pic_url}
                                created_at={formatDateTime(post.created_at)}
                                content={post.content}
                            />
                        </div>
                    ))}
                </div>
                <Road />
                <div className="billboards-container-right">
                    {rightPosts.map((post) => (
                        <div className="post-right" key={post.post_id}>
                            <Billboard
                                first_name={post.first_name}
                                last_name={post.last_name}
                                profile_picture_url={post.profile_pic_url}
                                created_at={formatDateTime(post.created_at)}
                                content={post.content}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Chat />
        </div>
    )
}