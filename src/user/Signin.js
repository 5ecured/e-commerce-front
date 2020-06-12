import React, { useState } from 'react'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth/index'
import { Redirect } from 'react-router-dom'
import Spinner from '../Spinner'

const Signin = () => {
    const [values, setValues] = useState({
        email: 'ryan@gmail.com',
        password: 'rrrrrr9',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const { email, password, error, loading, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const clickSubmit = async e => {
        e.preventDefault()
        setValues({ ...values, error: false, loading: true })
        const data = await signin({ email, password })
        if (data.error) {
            setValues({ ...values, error: data.error, loading: false })
        } else {
            authenticate(data, () => {
                setValues({ ...values, redirectToReferrer: true })
            })
        }
    }

    const signInForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control' value={email} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control' value={password} />
            </div>

            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className='alert alert-info'>
            <Spinner />
        </div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    return (
        <Layout title='Sign in' description='Sign in to MERN E-commerce app' classname='container col-md-8 offset-md-2'>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin