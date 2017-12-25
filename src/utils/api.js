import axios from "axios";
const url = `http://localhost:4000`;



export default {
  user: {
    signup: user =>
      axios.post(url+"/users",{user}).then((res) => (res.data.user)),
    login: credentials =>
      axios.post(url+"/users/sign_in",{credentials}).then((res) => (res.data.user)),
    fetchCurrentUser: () =>
      axios.get(url+"/users/current_logged_in_user").then((res) => (res.data.user))
  }
}
