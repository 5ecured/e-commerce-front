import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = async e => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        try {
            const data = await createCategory(user._id, token, { name })
            if (data.error) {
                setError(true)
            } else {
                setError('')
                setSuccess(true)
            }
        } catch (error) {

        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className='btn btn-outline-primary'>Create category</button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>Category "{name}" has been successfully created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className='text-danger'>Category "{name}" already exists. Categories should be unique</h3>
        }
    }

    const goBack = () => {
        return (
            <div className='mt-5'>
                <Link to='/admin/dashboard' className='text-warning'>Back to dashboard</Link>
            </div>
        )
    }

    return (
        <Layout title='Add a new category' description='Admin Dashboard'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory