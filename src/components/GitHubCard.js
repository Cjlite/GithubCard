import React, { useState } from 'react';
import './GitHubCard.css'; // Import the external CSS file

function GitHubCard() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
                setError(null);
            } else {
                const errorData = await response.json();
                setUserData(null);
                setError(errorData.message);
            }
        } catch (error) {
            setUserData(null);
            setError('An error occurred');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1 className="heading">GitHub User Card</h1>
                <input
                    type="text"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={handleChange}
                    className="input"
                />
                <button type="submit" className="button">
                    Show Card
                </button>
            </form>

            {userData && (
                <div className="card">
                    <img src={userData.avatar_url} alt="Avatar" className="avatar" />
                    <div className="card-content">
                        <p className="username">{userData.login}</p>
                        <p className="name">{userData.name}</p>
                        <div className="details">
                            <div className="repo-info">
                                <p className="label">Public Repositories</p>
                                <p className="value">{userData.public_repos}</p>
                            </div>
                            <div className="gist-info">
                                <p className="label">Public Gists</p>
                                <p className="value">{userData.public_gists}</p>
                            </div>
                        </div>
                        <p className="created-at">
                            Profile Created At: {new Date(userData.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default GitHubCard;
