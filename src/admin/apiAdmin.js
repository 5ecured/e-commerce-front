import { API } from '../config'

export const createCategory = async (userId, token, category) => {
    try {
        const response = await fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        })
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

export const listOrders = async (userId, token) => {
    try {
        const response = await fetch(`${API}/order/list/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getStatusValues = async (userId, token) => {
    try {
        const response = await fetch(`${API}/order/status-values/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}


export const updateOrderStatus = async (userId, token, orderId, status) => {
    try {
        const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status, orderId })
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

/*
To do CRUD (not that we already have a separate page for creating a category/product) on admin's "Manage products" page, we need:
get all products
get a single product
update single product
delete single product
*/

export const getProducts = async () => {
    try {
        const response = await fetch(`${API}/products?limit=undefined`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (productId, userId, token) => {
    try {
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async productId => {
    try {
        const response = await fetch(`${API}/product/${productId}`, { method: 'GET' })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (productId, userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}