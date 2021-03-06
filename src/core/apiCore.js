import { API } from '../config'
import queryString from 'query-string'

export const getProducts = async (sortBy) => {
    try {
        const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch(`${API}/categories`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getFilteredProducts = async (skip, limit, filters = {}) => {
    const data = { limit, skip, filters }

    try {
        const response = await fetch(`${API}/products/by/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const list = async params => {
    const query = queryString.stringify(params)
    try {
        const response = await fetch(`${API}/products/search?${query}`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const read = async productId => {
    try {
        const response = await fetch(`${API}/product/${productId}`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const listRelated = async productId => {
    try {
        const response = await fetch(`${API}/products/related/${productId}`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getBraintreeClientToken = async (userId, token) => {
    try {
        const response = await fetch(`${API}/braintree/getToken/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const processPayment = async (userId, token, paymentData) => {
    try {
        const response = await fetch(`${API}/braintree/payment/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (userId, token, createOrderData) => {
    try {
        const response = await fetch(`${API}/order/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: createOrderData })
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}