import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import Login from './Login/Login.js';
import Users from './Users/Users.js';
import SignUp from './SignUp/SignUp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavLink to="/">Home</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
          &nbsp; | &nbsp;
          <button onClick={this.logout}>Log Out</button>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={SignUp} />
        </main>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('token');
  };

}
    function Home(props) {
      return <h1>Josh's Home Page</h1>
    }

export default App;
