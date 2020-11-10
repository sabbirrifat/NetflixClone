import React, { Component } from 'react';
import './mylist.styles.css';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';
import Row from '../../Row.component';
import CircularProgress from '@material-ui/core/CircularProgress';

export class Mylist extends Component {

    constructor(){
        super()
        this.state = {
            movieList: [],
            userID: ''
        }
    }
    componentDidMount(){

        if(this.props.user){

            const userRef = firestore.collection(`users/${this.props.user.id}/mylist`);

            userRef.onSnapshot(async snapshot => {
                const data = snapshot.docs;
                const movieData = data.map((doc) => {
                    return doc.data().movie
                })

                this.setState({movieList: movieData})
            })

            this.setState({userID: this.props.user.id})

        }

    }

    componentDidUpdate(prevProp, prevState){
        let user = this.props.user;

        if(user.id && prevState.userID !== user.id){
            this.setState({userID: user.id});
            const userRef = firestore.collection(`users/${this.props.user.id}/mylist`);

            userRef.onSnapshot(async snapshot => {
                const data = snapshot.docs;
                const movieData = data.map((doc) => {
                    return doc.data().movie
                })

                this.setState({movieList: movieData})
            })
            
        }
        
    }
    render() {
        return (
            <div className="mylist">
                {
                    this.props.user ?
                        <div className="mylist-items">
                        {
                            this.state.movieList.length > 0 ?
                            <Row title="My List" fetchUrl="" movieData={this.state.movieList} /> :
                            null
                        } </div> :

                        <div className="spinner">
                            <CircularProgress color="secondary" />
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser
})

export default connect(mapStateToProps)(Mylist)
