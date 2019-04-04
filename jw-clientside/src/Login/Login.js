import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                <h2>Log In!</h2>
                <div>
                    <label htmlFor="Name" />
                    <input 
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="...name..."
                    />
                </div>
                <div>
                    <label htmlFor="Password" />
                    <input 
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        placeholder="...password..."
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
                </form>
            </>
        )
    }

    handleSubmit = e => {
        e.preventDefault();
    
        const endpoint = 'http://localhost:5000/api/login';
        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log('Login Res', res);
                localStorage.setItem('token', res.data.token);
                this.props.history.push("/users");
            })
            
            .catch(error => {
                console.error('Login Err', error);
            });
        };
    
        handleChange = e => {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        };
}

export default Login;