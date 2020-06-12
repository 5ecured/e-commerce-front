import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { emptyCart } from './cartHelpers'
import Card from './Card'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import Spinner from '../Spinner'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = async (userId, token) => {
        try {
            const data = await getBraintreeClientToken(userId, token)
            if (data.error) {
                setData({ ...data, error: data.error })
            } else {
                setData({ clientToken: data.clientToken })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = e => {
        setData({ ...data, address: e.target.value })
    }

    const getTotal = () => {
        return products.reduce((curValue, nextValue) => {
            return curValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                <div>{showDropIn()}</div>
            ) : (
                    <Link to='/signin'>
                        <button className='btn btn-primary'>Sign in to checkout</button>
                    </Link>
                )
        )
    }

    let deliveryAddress = data.address

    const buy = () => {
        setData({ loading: true })
        //send the nonce to the backend
        //nonce is the data.instance.requestPaymentMethod()
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                //once you have nonce (card type/card number etc.) send nonce as 'paymentMethodNonce' to backend along with total to be charged

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(response => {
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        }

                        //create the order itself to be sent to backend
                        createOrder(userId, token, createOrderData)

                        setData({ ...data, success: response.success })

                        //empty cart
                        emptyCart(() => {
                            setRun(!run) // update parent state
                            console.log('done!');
                            setData({
                                loading: false,
                                success: true
                            });
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        setData({ loading: false })
                    })
            })
            .catch(error => {
                setData({ ...data, error: error.message })
            })
    }

    const showDropIn = () => {
        return (
            <div onBlur={() => setData({ ...data, error: '' })}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className='form-group mb-3'>
                            <label className='text-muted'>Delivery address:</label>
                            <textarea
                                onChange={handleAddress}
                                className='form-control'
                                value={data.address}
                                placeholder='Enter delivery address'
                            />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }} onInstance={instance => data.instance = instance} />
                        <button onClick={buy} className='btn btn-success btn-block'>Confirm payment</button>
                    </div>
                ) : null}
            </div>
        )
    }

    const showError = error => {
        return (
            <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        )
    }

    const showSuccess = success => {
        return (
            <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
                Payment successful. Thank you for your purchase
            </div>
        )
    }

    const showLoading = loading => {
        return (
            loading && <Spinner />
        )
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout