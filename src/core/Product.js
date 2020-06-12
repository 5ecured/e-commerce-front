import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = async productId => {
        try {
            const data = await read(productId)
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                //ONLY after loading a single product, do we fetch related products
                const data2 = await listRelated(data._id)
                if (data2.error) {
                    setError(data2.error)
                } else {
                    setRelatedProducts(data2)
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} classname='container-fluid'>
            <h2 className='mb-4'>Product information</h2>
            <div className='row'>
                <div className='col-8'>
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>
                <div className='col-4'>
                    <h4>Related products</h4>
                    {relatedProducts.map((p, i) => (
                        <div key={i} className='mb-3'>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product