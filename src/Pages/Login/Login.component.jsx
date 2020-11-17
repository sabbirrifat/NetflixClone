import React, { Component } from 'react'
import './login.styles.css';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email : '',
            password: ''
        }

    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password:' '});
        } catch (err) {
            this.setState({firebaseErrors: err.message});
            console.error('something went wrong with sign in with email and password', err);
        }
    }

    render(){
      if (this.props.user){
          this.props.history.push('/')
      }

      const {email, password} = this.state;
        return (
            <div className="login-page">

                <div className="login-container">
                    <h1>Sign In</h1>
                    <form onSubmit={this.handleSubmit} className='login-form'>
                    <div className={`text-field ${email ? 'focused' : ''}`}>
                        
                        <input
                            type="email"
                            name='email'
                            onChange={this.handleChange}
                            value={email}
                            required
                        />
                        <span className="form-label">Email Address</span>
                    </div>

                    <div className="text-field" className={`text-field ${password ? 'focused' : ''}`}>
                        <input 
                            type="password"
                            name='password'
                            onChange={this.handleChange}
                            value={password}
                            required
                        />
                        <span className="form-label">Password</span>
                     </div>
                    <button type="submit" className="login-button">Sign In</button>
                    </form>
                    <button className="google-sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
                    <p className="sign-up-text">New to Netflix? <span onClick={() => this.props.history.push('/register')}> Sign up now.</span></p>
                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                </div>
                <div className="black-overlay"></div>
                
            </div>
        )
    }
}


const mapStateToProps = ({user}) => ({
    user : user.currentUser
})

export default withRouter(connect(mapStateToProps)(Login))
