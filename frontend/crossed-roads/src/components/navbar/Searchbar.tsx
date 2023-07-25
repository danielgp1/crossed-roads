import './Searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import def from '../assets/default_pic.png'

interface User {
    id: number;
    first_name: string;
    last_name: string;
    profile_pic_url: string;
}

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="search-box">
            <FontAwesomeIcon className='search-icon' icon={faSearch} />
            <input
                type="text"
                className="input-search"
                placeholder="Search Crossed Roads"
                value={searchQuery}
                onChange={handleInputChange}
            >
            </input>
            {searchQuery !== '' && (
                <div className='search-results'>
                    {searchResults.length > 0 ? (
                        searchResults.map((user) => (
                            <div key={user.id} className="result-item">
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