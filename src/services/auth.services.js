import axios from 'axios'
import {getItem, setItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL = 'http://localhost:8080/api/auth/'

export const signUp = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password
    })
}

export const login = (username, password) => {
    return axios
    .post(API_URL + 'signin', {
        username,
        password
    })
    .then(response => {
        // check to see if the user has the accessToken
        if(response.data.accessToken) {
            setItem('user', response.data)
        }
        return response.data
    })
}

// logout the user
export const logOut = () => {
    removeItem('user')
}

export const getCurrentUser = () => {
    return getItem('user')
}