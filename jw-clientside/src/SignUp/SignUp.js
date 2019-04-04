import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    render() {
        console.log(this.props)
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                <h2>Sign Up!</h2>
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
                    <label htmlFor="Department" />
                    <input 
                        name="department"
                        value={this.state.department}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="...department..."
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
                </form>
            </>
        )
    }

    handleSubmit = e => {
        e.preventDefault();
    
        const endpoint = 'http://localhost:5000/api/register';
        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log('Login Res', res)
                localStorage.setItem('token', res.data.token);
                //window.location.assign("http://localhost:3000/users")
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

export default SignUp;