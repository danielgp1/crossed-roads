import './Searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

interface User {
    id:number;
    first_name:string;
    last_name:string;
}

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        const newValue = value.replace('#', "\%23");
        setSearchQuery(value);
        performSearch(newValue);
    };

    const performSearch = (username: string) => {
        const authToken = localStorage.getItem('userToken');

        axios
        .get(`http://localhost:8080/api/users/search?username=${username}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
              },
        })
        .then((response) => {
          setSearchResults(response.data);
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
            <ul>
                {searchResults.map((user) => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}