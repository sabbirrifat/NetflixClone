import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.component';
import HomePage from './HomePage.component';
import Login from './Page/Login/Login.component';
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
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
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomePage}  />
            <Route path="/login" component={Login} />
          </Switch>
      </div>
    );
  }
}

export default App;
