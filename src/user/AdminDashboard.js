import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>
                    Admin links
                </h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/create/category' className='nav-link'>Create category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>Create product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/orders'>View orders</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/products'>Manage products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>Admin information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        {name}
                    </li>
                    <li className='list-group-item'>
                        {email}
                    </li>
                    <li className='list-group-item'>
                        {role === 1 ? 'Admin' : 'Registered user'}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title={`Hello, ${name}`} description='Admin Dashboard' classname='container-fluid'>
            <div className='row'>
                <div className='col-3'>
                    {adminLinks()}
                </div>
                <div className='col-9'>
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard