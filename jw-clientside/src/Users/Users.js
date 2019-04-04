import React from 'react';
import axios from 'axios';
import requireAuth from '../Auth/requireAuth.js';

class Users extends React.Component {
    state = {
        users: [],
    };

    render() {
        return (
            <>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(user => (
                        <div>
                            <li key={user.id}>{user.username}</li>
                            <li>{user.department}</li>
                        </div>
                    ))}
                </ul>
            </>
        );
    }

    componentDidMount() {
        const endpoint = `/users`;
        axios
        .get(endpoint)
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(error => {
            console.error('USERS ERROR', error);
        });
    }
}

export default requireAuth(Users);