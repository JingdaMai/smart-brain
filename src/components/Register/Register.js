import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      error: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitRegister = () => {
    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
        this.setState({error: 'unable to register'})
      })
        .then(data => {
          if (data.userId && data.success === 'true') {
            this.saveAuthTokenInSession(data.token);
            fetch(`${process.env.REACT_APP_API_URL}/profile/${data.userId}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': data.token
              }
            })
              .then(resp => resp.json())
              .catch(err => {
                console.log(err);
                this.setState({error: 'unable to register'})
              })
              .then(user => {
                if (user && user.email) {
                  this.setState({error: ''})
                  this.props.loadUser(user);
                  this.props.onRouteChange('home');
                }
              })
              .catch(err => {
                console.log(err);
                this.setState({error: 'unable to register'})
              })
          } else {
            this.setState({error: 'unable to register'});
          }

        })
        .catch(err => {
          console.log(err);
          this.setState({error: 'unable to register'})
        })
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            {this.state.error && <p className='tc red'>{this.state.error}</p>}
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;