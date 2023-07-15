import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.push('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showErrorMsg: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const urlPath = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(urlPath, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          value={username}
          onChange={this.onChangeUsername}
          id="username"
          placeholder="Username"
          className="input-text"
          type="text"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          value={password}
          onChange={this.onChangePassword}
          id="password"
          placeholder="Password"
          className="input-text"
          type="password"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    return (
      <div className="login-form-main-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            className="jobby-app-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="label-input-container">{this.renderUsername()}</div>
          <div className="label-input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="show-error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
