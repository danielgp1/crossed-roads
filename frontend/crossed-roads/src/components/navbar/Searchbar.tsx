import './Searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import def from '../assets/default_pic.png'
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    profile_name: string;
    profile_pic_url: string;
}

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOpen(true);
        const value: string = event.target.value;
        const newValue = value.replace('#', "%23");
        setSearchQuery(value);
        performSearch(newValue);
    };

    const performSearch = (username: string) => {
        if (username.trim() === '') {
            setSearchResults([]);
            return;
        }
        const authToken = localStorage.getItem('userToken');

        axios
            .get(`http://localhost:8080/api/users/search?username=${username}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                const filteredResults = response.data.filter((user: User) => user.id !== parseInt(localStorage.getItem("userID")!));
                setSearchResults(filteredResults);
            })
            .catch((error) => {
                console.error('Error performing search:', error);
            });

    };
    const handleOpenProfilePage = (username: string) => () => {
        setSearchOpen(false);
        navigate(`/users/${username}`);
      };

    return (
        <div className="search-box">
            <FontAwesomeIcon className='search-icon' icon={faSearch} />
            <input
                type="text"
                className="input-search"
                placeholder="Search Crossed Roads"
                value={searchQuery}
                onChange={handleInputChange}
                onBlur={() => setSearchOpen(false)}
                onFocus={() => setSearchOpen(true)}
            >
            </input>
            {isSearchOpen && searchQuery !== '' && (
                <div className='search-results'>
                    {searchResults.length > 0 ? (
                        searchResults.map((user) => (
                            <div key={user.id} className="result-item"  onMouseDown={e => e.preventDefault()} onClick={handleOpenProfilePage(user.profile_name)}>
                                <img className="result-profile-pic" src={user.profile_pic_url ?? def} alt="Profile Pic" />
                                <div className="result-user-info">
                                    <span className="result-user-name">{user.first_name} {user.last_name}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No Results Found</div>
                    )}
                </div>
            )}

        </div>
    )
}