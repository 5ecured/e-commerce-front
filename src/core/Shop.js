import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'
import { prices } from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const init = async () => {
        try {
            const data = await getCategories()
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadFilteredResults = async newFilters => {
        try {
            const data = await getFilteredProducts(skip, limit, newFilters)
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadMore = async () => {
        let toSkip = skip + limit
        try {
            const data = await getFilteredProducts(toSkip, limit, myFilters.filters)
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>Load more</button>
            )
        )
    }

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === 'price') {
            let pricevalues = handlePrice(filters)
            newFilters.filters[filterBy] = pricevalues
        }

        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === Number(value)) {
                array = data[key].array
            }
        }

        return array
    }

    return (
        <Layout title='Shopping' description='Browse our extensive list of products' classname='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => {
                            return handleFilters(filters, 'category')
                        }
                        } />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={filters => {
                            return handleFilters(filters, 'price')
                        }
                        } />
                    </div>
                </div>

                <div className='col-8'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {filteredResults.map((product, i) => (
                            <div key={i} className='col-4 mb-3'>
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop