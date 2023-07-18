import ViewerObject from '../viewer-object/ViewerObject'
import './Viewers.css'

export default function Viewers() {
    return (
        <div className='viewers-grid'>
            <div className='viewers-header'>Travellers Who Stopped By</div>
            <div className='viewers-container'>
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
                <ViewerObject />
            </div>
        </div>
    )
}