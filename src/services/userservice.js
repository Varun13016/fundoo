import axios from 'axios'

export const login =(obj) => {
    let response = axios.post("http://fundoonotes.incubation.bridgelabz.com/api/user/login",obj)
    return response
}
export const SignUp =(obj) => {
    let response = axios.post("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",obj)
    return response
}
