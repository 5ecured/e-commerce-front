import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = async () => {
        try {
            const data = await getProducts('sold')
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadProductsByArrival = async () => {
        try {
            const data = await getProducts('createdAt')
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout title='Welcome' description='MERN E-commerce app' classname='container-fluid'>
            <Search />
            <h2 className='mb-4'>New arrivals</h2>
            <div className='row'>
                {productsByArrival.map((product, i) => (
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className='mb-4'>Best sellers</h2>
            <div className='row'>
                {productsBySell.map((product, i) => (
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Home