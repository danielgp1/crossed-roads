import Chat from "../../chat/Chat";
import Road from "../road/Road";
import './Main.css'

export default function Main() {
    return (
        <div className="grass">
            <div className="billboard"></div>
            <Road />
            <div className="billboard"></div>
            <Chat />
        </div>
    )
}