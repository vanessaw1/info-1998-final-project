import React, {Component} from 'react';
import './App.css';

class Login extends Component {

    state = {
        username: "",
        password: "",
        newUsername: "",
        newPassword: "",
        status: "",
    }

    handleSignUp = async e => {
        e.preventDefault();
        const resp = await fetch('/api/login/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.newUsername,
                password: this.state.newPassword
            })
        });
        const text = await resp.text();

        if (text === "SIGNUP_SUCCESS") {
            this.setState({status: "Successfully created a new account"});
            this.props.updateUsername(this.state.newUsername);
            this.props.updateLoggedIn(true);
        } else {
            this.setState({status: "Error: Username already exists"});
        }
    };
    
    handleSignIn = async e => {
        e.preventDefault();
        const resp = await fetch('/api/login/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });
        const text = await resp.text();

        if (text === "SIGNIN_SUCCESS") {
            this.setState({status: "Successfully logged in"});
            this.props.updateUsername(this.state.username);
            this.props.updateLoggedIn(true);
        } else if (text === "SIGNIN_INCORRECT_PASSWORD") {
            this.setState({status: "Error: Incorrect password"});
        } else {
            this.setState({status: "Error: Account not found"});
        }
    };

    render() {
        return (
            <>
                <div className="SignIn">
                    <form onSubmit={this.handleSignIn}>
                        <h1>Sign In</h1>
                        Username:
                        <input 
                            type="text" 
                            value={this.state.username} 
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                        <br/>
                        Password:
                        <input 
                            type="text" 
                            value={this.state.password} 
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="SignUp">
                <form onSubmit={this.handleSignUp}>
                    <h1>Sign Up</h1>
                    New Username:
                    <input 
                        type="text" 
                        value={this.state.newUsername} 
                        onChange={(e) => this.setState({newUsername: e.target.value})}
                    />
                    <br/>
                    New Password:
                    <input 
                        type="text" 
                        value={this.state.newPassword} 
                        onChange={(e) => this.setState({newPassword: e.target.value})}
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
                {this.state.status}
            </div>
        </>
        );
    }
}

export default Login;