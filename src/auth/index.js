import { API } from '../config'

export const signup = async user => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const signin = async user => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}