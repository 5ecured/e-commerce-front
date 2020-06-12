import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const { token } = isAuthenticated()

    const { name, email, password, error, success } = values

    const init = async userId => {
        try {
            const data = await read(userId, token)
            setValues({ ...values, name: data.name, email: data.email })
        } catch (error) {
            setValues({ ...values, error: true })
        }
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = async e => {
        e.preventDefault()
        try {
            const data = await update(match.params.userId, token, { name, email, password })
            if (data.error) {
                console.log(data.error)
            }
            //when we update profile, we not only have to update the backend. we update localStorage too so users wont have to signout and signin to see the change
            updateUser(data, () => {
                setValues({ ...values, name: data.name, email: data.email, success: true })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const redirectUser = success => {
        if (success) {
            return <Redirect to='/cart' />
        }
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' onChange={handleChange('name')} className='form-control' value={name} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input type='email' onChange={handleChange('email')} className='form-control' value={email} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input type='password' onChange={handleChange('password')} className='form-control' value={password} />
            </div>

            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )

    return (
        <Layout title='Profile' description='Update your profile' classname='container-fluid'>
            <h2 className='mb-4'>Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}

export default Profile