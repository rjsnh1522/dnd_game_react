import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../utils/types";
import api from '../utils/api'
import setAuthorizationHeader from '../utils/setAuthorizationHeader'





export const userLoggedIn = user => ({
  type :USER_LOGGED_IN,
  user

})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});


export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};





export const loginAction = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn({...user, loaded: true}));
  })
