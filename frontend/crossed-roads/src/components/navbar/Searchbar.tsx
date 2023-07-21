import './Searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Searchbar() {
    return (
        <div className="search-box">
            <FontAwesomeIcon className='search-icon' icon={faSearch} />
            <input type="text" className="input-search" placeholder="Search Crossed Roads"></input>
        </div>
    )
}