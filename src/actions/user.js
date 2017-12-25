import api from '../utils/api'
import {userLoggedIn} from './auth'
import {USER_FETCHED} from '../utils/types'




export const userFetched = (user) => ({
  type: USER_FETCHED,
  user
})


export const signupAction = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });


export const fetchCurrentUserAction = () => dispatch =>
  api.user.fetchCurrentUser().then(user => {dispatch(userFetched(user))})
