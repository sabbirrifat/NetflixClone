import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.component';
import HomePage from './Pages/Home/HomePage.component';
import Login from './Pages/Login/Login.component';
import {Route, Switch} from 'react-router-dom'
import addUser from './redux/user/user-action';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Register from './Pages/Register/Resgister.component'
import Mylist from './Pages/Mylist/mylist.component';
import Footer from './Components/Footer/Footer.component';

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
            <Route path="/register" component={Register} />
            <Route path="/mylist" component={Mylist} />
          </Switch>
          <Footer/>
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
