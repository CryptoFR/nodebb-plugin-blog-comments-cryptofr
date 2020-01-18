import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './Modal';
import axios from 'axios';
import qs from 'querystring';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      _csrf: null,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userTaken: false,
      emailTaken: false,
      captcha: false
    };
    this.client = axios.create({
      baseURL: window.nodeBBURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    this.client.get('/comments/token')
      .then((res) => {
        this.setState({
          _csrf: res.data.token
        })
      })
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  shouldRegisterBeActivated = () => {
    return !this.state.userTaken && !this.state.emailTaken
      && this.state.password === this.state.confirmPassword
      && this.state.email
      && this.state.username
      && this.state.password
      && this.state.confirmPassword
      && this.state._csrf
      && this.state.captcha;
  }

  onBlurEmail = () => {
    this.client.get('/comments/plugin/email', {
      params: {
        email: this.state.email
      }
    }).then((res) => {
      this.setState({
        emailTaken: !res.data.results.available
      })
    })
  }

  onBlurUsername = () => {
    this.client.get('/comments/plugin/username', {
      params: {
        username: this.state.username
      }
    }).then((res) => {
      this.setState({
        userTaken: res.data.results.exists
      })
    })
  }
  
  handleCloseModal  = () => {
    this.setState({ 
      showModal: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userTaken: false,
      emailTaken: false,
      captcha: false
    });
  }
  onVerified = (response) => {
    this.setState({
      captcha: response
    })
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.client.post('/comments/plugin/register', qs.stringify({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      "password-confirm": this.state.passwordConfirm,
      _csrf: this.state._csrf,
      userLang: "fr",
      referrer: "",
      token: "",
      noscript: false,
      terms: true, // TODO Fix
      captcha: this.state.captcha
    }), {withCredentials: true}).then(() => {
      window.createSnackbar("Merci de confirmer votre inscription via le lien envoyé à votre email", true);
    }).catch(() => {
      window.createSnackbar("Register failed", false);
    }).then(() => {
      this.setState({
        showModal: false
      })
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>S'enregistrer</button>
        {this.state.showModal && <Modal 
          csrf={this.state._csrf}
          onVerified={this.onVerified}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          onChangeUsername={this.onChangeUsername}
          onChangePassword={this.onChangePassword}
          onChangeConfirmPassword={this.onChangeConfirmPassword}
          onChangeEmail={this.onChangeEmail}
          handleCloseModal={this.handleCloseModal}
          onSubmit={this.onSubmit}
          onBlurEmail={this.onBlurEmail}
          onBlurUsername={this.onBlurUsername}
          userTaken={this.state.userTaken}
          emailTaken={this.state.emailTaken}
          registerActivated={this.shouldRegisterBeActivated()}
        />}
      </div>
    );
  }
  
}

export default App;
