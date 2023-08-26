import axios from "axios";

export const registerUser = ({ username, password }) => {
    
  axios.post('http://localhost:3001/auth/register/'
    , {
      username, password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}