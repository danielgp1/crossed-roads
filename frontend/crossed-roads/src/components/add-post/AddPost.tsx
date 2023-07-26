import './AddPost.css'

interface AddPostProps {
    setIsAddPostOpen: (isAddPostOpen: boolean) => void;
}

export default function AddPost({ setIsAddPostOpen }: AddPostProps) {


    const handleCloseChangePassword = () => {
        setIsAddPostOpen(false);
    };


    const post = (event: React.FormEvent) => {
        event.preventDefault();
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
                <textarea className="post-area" placeholder="What's on your mind?" />
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