import { useEffect, useState } from "react";
import "./UserProfileMain.css"
import axios from "axios";
import PageNotFound from "../../page-not-found/PageNotFound";
import ServiceMain from "../../service/main/ServiceMain";
import Car from "../../car/Car";
import default_pic from '../../assets/default_pic.png'
import Billboard from "../../billboard/Billboard";

interface UserProfileMainProps {
    username: string;
}

interface User {
    id: number,
    first_name: string,
    last_name: string,
    profile_name: string,
    current_color: string,
    date_of_birth: string,
    profile_pic_url: string,
}

interface Post {
    post_id: number,
    created_at: string;
    content: string;
}

export default function UserProfileMain({ username }: UserProfileMainProps) {
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [areFriends, setAreFriends] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [userPosts, setUserPosts] = useState<Post[]>([]);


    useEffect(() => {
        const fetchUserInfo = async () => {
            const authToken = localStorage.getItem('userToken');
            const userID = localStorage.getItem("userID");

            await axios
                .get(`http://10.16.6.25:8080/api/users/search?username=${username}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then(async (response) => {
                    setSearchResults(response.data);
                    const targetUserId = response.data[0].id;

                    await axios
                        .get(`http://10.16.6.25:8080/api/friendships/users/${userID}/friends/${targetUserId}`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        })
                        .then((response2) => {
                            setAreFriends(response2.data);
                        })
                        .catch((error) => {
                            console.error('Error checking friendship status:', error);
                            setProfileLoaded(true);
                        });

                    await axios
                        .get(`http://10.16.6.25:8080/api/posts/users/${targetUserId}`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        })
                        .then((response3) => {
                            const sortedPosts = response3.data.sort((a: Post, b: Post) => {
                                const dateA = new Date(a.created_at);
                                const dateB = new Date(b.created_at);
                                return dateB.getTime() - dateA.getTime();
                            });
                            setUserPosts(sortedPosts)
                            setProfileLoaded(true);
                        })
                        .catch((error) => {
                            console.error('Error checking friendship status:', error);
                            setProfileLoaded(true);
                        });

                        try {
                            const visitData = {
                                visited_id: targetUserId,
                                visitor_id: userID
                            };
                            await axios.post('http://10.16.6.25:8080/api/visits', visitData, {
                                headers: {
                                    Authorization: `Bearer ${authToken}`,
                                },
                            });
                        } catch (error: any) {
                            console.error("Error visiting:", error);
                        }


                })
                .catch((error) => {
                    console.error('Error performing search:', error);
                    setProfileLoaded(true);
                });
        }
        fetchUserInfo();

    }, [username]);


    const handleAddFriend = () => {
        const authToken = localStorage.getItem('userToken');
        const userID = localStorage.getItem("userID");

        const targetUserId = searchResults[0]?.id;
        if (!targetUserId) {
            console.error('No user found to add as a friend.');
            return;
        }

        axios.post(
            "http://10.16.6.25:8080/api/friendships",
            {
                user1_id: userID,
                user2_id: targetUserId,
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then(() => {
                setAreFriends(true);
            })
            .catch((error) => {
                console.error('Error adding friendship:', error);
            });
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


    const firstUser = searchResults.length === 1 ? searchResults[0] : null;

    if (firstUser && firstUser.id === Number(localStorage.getItem("userID"))) {
        return <ServiceMain />;
    }

    return (
        <div className="user-profile-main">
            {!profileLoaded ? (
                <div>Loading...</div>
            ) : (
                <>
                    {firstUser ? (
                        <div className="profile-main-info-container">
                            <div className="profile-data-wrapper">
                                <div className='profile-data-2'>
                                    <div className='profile-pic-container-2'>
                                        <img
                                            className='profile-pic-2'
                                            alt='profile pic'
                                            src={firstUser.profile_pic_url ?? default_pic}
                                        />
                                    </div>
                                    <div className='profile-info'>
                                        <span className='names'>{firstUser.first_name} {firstUser.last_name}</span>
                                        <div className='info-car'>
                                            <div className='other-info'>
                                                <div className="profile-field">
                                                    <label className='field-label'>Username:</label>
                                                    <span className='field-span'>{firstUser.profile_name}</span>
                                                </div>
                                                <div className="profile-field">
                                                    <label className='field-label'>Birthday:</label>
                                                    <span className='field-span'>{firstUser.date_of_birth}</span>
                                                </div>
                                                {areFriends ? "" : <button onClick={handleAddFriend} className="add-friend-btn">Cross Roads</button>}
                                            </div>
                                            <div className='car-container'>
                                                <Car color={firstUser.current_color} direction={"#f9d71c"} name={firstUser.first_name} pfp={firstUser.profile_pic_url ?? default_pic} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="user-wisdom">{firstUser.first_name}'s Posts</span>
                            <div className="user-posts-grid">
                                {userPosts.map((post) => (
                                    <div key={post.post_id} className='user-post'>
                                        <Billboard
                                            first_name={firstUser.first_name!}
                                            last_name={firstUser.last_name!}
                                            profile_picture_url={firstUser.profile_pic_url}
                                            created_at={formatDateTime(post.created_at)}
                                            content={post.content}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <PageNotFound />
                    )}
                </>
            )}
        </div>
    );
}
