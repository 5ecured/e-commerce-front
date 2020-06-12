import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const loadProducts = async () => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const destroy = async productId => {
        try {
            await deleteProduct(productId, user._id, token)
            loadProducts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Layout title='Manage products' description='Update your products here' classname='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>Total products: {products.length}</h2>
                    <hr />
                    <ul className='list-group'>
                        {products.map((p, i) => (
                            <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className='badge badge-warning'>
                                        Update product
                                    </span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className='badge badge-danger badge-pill'>
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts