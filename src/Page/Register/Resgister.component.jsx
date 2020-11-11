import React, { Component } from 'react'
import './register.styles.css';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            email : '',
            password: '',
            confirmPassword: '',
            name: ''
        }

    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit = async event => {
        event.preventDefault();


        const { name, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Password don't match. Please check it again")
        }

        else {

            try {
                const { user } = await auth.createUserWithEmailAndPassword( email, password);

                createUserProfileDocument(user, {displayName: name});
                this.setState({ name:'', email:'', password:'', confirmPassword:''});
            } catch(err) {
                this.setState({firebaseErrors: err.message});
                console.error('something went wrong with sign up with email and password', err);
            }
        }
    };

    render(){
      if (this.props.user){
          this.props.history.push('/')
      }
        return (
            <div className="register-page">

                <div className="register-container">
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit} className="register-form">
                    <div className="text-field">
                        
                        <input
                            type="text"
                            name='name'
                            onChange={this.handleChange}
                            value={this.state.name}
                            required
                        />
                        <span className="form-label">Full Name</span>
                    </div>

                    <div className="text-field">
                        
                        <input
                            type="email"
                            name='email'
                            onChange={this.handleChange}
                            value={this.state.email}
                            required
                        />
                        <span className="form-label">Email Address</span>
                    </div>

                    <div className="text-field">
                        <input 
                            type="password"
                            name='password'
                            onChange={this.handleChange}
                            value={this.state.password}
                            required
                        />
                        <span className="form-label">Password</span>
                     </div>

                     <div className="text-field">
                        <input 
                            type="password"
                            name='confirmPassword'
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                            required
                        />
                        <span className="form-label">Confirm Password</span>
                     </div>


                    <button type="submit" className="register-button">Sign Up</button>
                    </form>
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

export default withRouter(connect(mapStateToProps)(Register))
