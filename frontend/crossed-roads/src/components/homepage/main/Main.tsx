import Chat from "../../chat/Chat";
import Road from "../road/Road";
import './Main.css'

export default function Main() {
    return (
        <div className="main-grid">
            <div className="main-content">
                <div className="billboards-container-left">
                    {/* <div className="post-left">
                        <Billboard />
                    </div>
                    <div className="post-left">
                        <Billboard />
                    </div>
                    <div className="post-left">
                        <Billboard />
                    </div>
                    <div className="post-left">
                        <Billboard />
                    </div>
                    <div className="post-left">
                        <Billboard />
                    </div> */}
                </div>
                <Road />
                <div className="billboards-container-right">
                    {/* <div className="post-right">
                        <Billboard />
                    </div>
                    <div className="post-right">
                        <Billboard />
                    </div>
                    <div className="post-right">
                        <Billboard />
                    </div>
                    <div className="post-right">
                        <Billboard />
                    </div>
                    <div className="post-right">
                        <Billboard />
                    </div> */}
                </div>
            </div>
            <Chat />
        </div>
    )
}