import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.component';
import HomePage from './HomePage.component';
import Login from './Page/Login/Login.component';
import {Route, Switch} from 'react-router-dom'
import addUser from './redux/user/user-action';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        console.log(userAuth)
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.addUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      this.props.addUser(userAuth)
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  
  
  render(){
    return (
      <div className="app">
          <Navbar user={this.props.user}/>
          <Switch>
            <Route exact path="/" component={HomePage}  />
            <Route path="/login" component={Login} />
          </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => { dispatch(addUser(user))}
  })

const mapStateToProps = ({user}) => ({
  user : user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
