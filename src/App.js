import React, { Component } from 'react';
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage"
import HomePage from './components/pages/HomePage'
import DashboardPage from './components/pages/DashboardPage'
import TopNavigation from './components/navigation/TopNavigation'
import {fetchCurrentUserAction} from './actions/user'
import { connect } from "react-redux";
import Loader from "react-loader"



class App extends Component {

  componentDidMount(){
    if(this.props.isAuthenticated) this.props.fetchCurrentUserAction();
  }



  render() {
      const { location, isAuthenticated,loaded } = this.props;
    return (
      <div >
        <Loader loaded={loaded}>
        {
            typeof localStorage.bookwormJWT !== "undefined" && <TopNavigation />
          }
         <Route  path="/" exact component={HomePage} />
         <GuestRoute location={location} path="/login" exact component={LoginPage} />
         <GuestRoute  location={location} path="/signup" exact component={SignupPage} />
         <UserRoute  location={location} path="/dashboard" exact component={DashboardPage} />
       </Loader>

      </div>
    );
  }
}


App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserAction:PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    loaded: state.user.loaded
  };
}


export default connect(mapStateToProps,{fetchCurrentUserAction})(App);
