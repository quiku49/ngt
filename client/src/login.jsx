import React from "react"

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.state = {
            username: '',
            password: ''
        }
    }
    handleInput(event) {

        if (event.target.name == 'username') {
            this.setState({
                username: event.target.value
            })
        }
        else if (event.target.name == 'password') {
            //result = sha256(event.target.value);
            this.setState({
                password: event.target.value
            })
        }


    }
    handleSubmit(event) {
        event.preventDefault()
        if (this.checkLogin()) {
            return true
        }
    }
    checkLogin() {
        return 0;
    }
    render() {
        return (
            <div className="login">
                <h2>Login</h2>
                <form action="" onSubmit={this.handleSubmit}>
                    <div className="input">
                        <label htmlFor=""><strong>Username</strong></label>
                        <input type="text" onChange={this.handleInput} name="username" />
                    </div>
                    <br />
                    <div className="input">
                        <label htmlFor=""><strong>Password</strong></label>
                        <input type="password" onChange={this.handleInput} name="password" />
                    </div>
                    <button type="submit"> Log in </button>
                </form>
            </div>
        )
    }
}