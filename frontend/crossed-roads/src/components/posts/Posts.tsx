import Navbar from '../navbar/Navbar';
import './Posts.css'
import PostsMain from './main/PostsMain';

export default function Posts() {
    return (
        <div className="posts-body">
            <Navbar />
            <PostsMain />
        </div>
    );
}