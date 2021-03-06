
import React from 'react'
import UserSignupPage from '../pages/UserSignupPage'
import LoginPage from '../pages/LoginPage'
import ApiProgress from '../shared/ApiProgress'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { render } from '@testing-library/react'



class App extends React.Component {
 
  render(){
    const {isLoggedIn} = this.props//this.context.state.isLoggedIn

    return(
      <div className= "row">
        <Router>
          <TopBar />
          <Switch>
              <Route exact path="/" component={HomePage}/>
              {!isLoggedIn && (
                  <Route path="/login" component={ LoginPage }
                />
              )}
              <Route path="/signup" component={UserSignupPage}/>
              <Route path="/user/:username"
               component={UserPage}/>
              <Redirect to="/"/>
          </Switch>
        </Router>
      </div>
    )
  }

}


const mapStateToProps = (store) => { // redux store = state bilgisini top bar component. almayı sağlar.
  return{
      isLoggedIn: store.isLoggedIn,
  }
}

export default connect(mapStateToProps)(App);
