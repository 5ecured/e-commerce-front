import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'
import Spinner from '../Spinner'

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const { user, token } = isAuthenticated()

    const init = async () => {
        try {
            const data = await getCategories()
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({
            ...values,
            [name]: value
        })
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
    }

    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input type='file' name='photo' accept='image/*' onChange={handleChange('photo')} />
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' value={name} onChange={handleChange('name')} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea className='form-control' value={description} onChange={handleChange('description')} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input type='number' className='form-control' value={price} onChange={handleChange('price')} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select className='form-control' onChange={handleChange('category')}>
                    <option>Please select</option>
                    {categories && categories.map((c, i) => {
                        return (
                            <option value={c._id} key={i}>{c.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select className='form-control' onChange={handleChange('shipping')}>
                    <option>Please select</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input type='number' className='form-control' value={quantity} onChange={handleChange('quantity')} />
            </div>

            <button className='btn btn-outline-primary'>Create product</button>
        </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct} has been successfully created`}</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className='alert alert-success'><Spinner /></div>)
    )

    return (
        <Layout title='Add a new product' description='Admin Dashboard'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct   