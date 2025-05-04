import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/orderDetails.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { CreateOrder, getCartDetail } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Preloader from '../../Component/Animated';
import { handlePayment } from '../../store/commonFunction';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { amount } = router.query;

    const [formData, setFormData] = useState({
        shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: ''
        }
    });

    const [orderData, setOrderData] = useState({
        items: [],
        totalAmount: amount ? parseFloat(amount) : 0
    });

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await dispatch(getCartDetail(userId)).unwrap();
                console.log("Response", response)
                setOrderData(prev => ({
                    ...prev,
                    items: response.items || []
                }));
            } catch (error) {
                console.error("Error fetching cart details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartDetails();
    }, [dispatch]);

    useEffect(() => {
        if (amount) {
            setOrderData(prev => ({
                ...prev,
                totalAmount: parseFloat(amount)
            }));
        }
    }, [amount]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Process payment and get verification response
            const Amount = Math.abs(orderData.totalAmount / 100);
            const paymentResponse = await handlePayment(dispatch, Amount);
            console.log("Payment Response", paymentResponse);

            if (paymentResponse && paymentResponse.status == 200) {
                // Create order after successful payment verification
                const orderPayload = {
                    user: localStorage.getItem("userId"),
                    items: orderData.items.map(item => ({
                        product: item.productID._id,
                        cart: item._id,

                        quantity: 1
                    })),
                    totalAmount: orderData.totalAmount,
                    status: "Pending",
                    paymentStatus: "Fulfilled",
                    paymentMethod: "Online",
                    shippingAddress: formData.shippingAddress,

                };

                console.log("Order Payload", orderPayload)
                const orderResponse = await dispatch(CreateOrder(orderPayload)).unwrap();
                console.log("Order Response", orderResponse);

                if (orderResponse.status == 201) {
                    toast.success("Order created successfully!");
                    // Redirect to order confirmation with order ID and amount
                    router.push({
                        pathname: '/order-confirmation',
                        // query: {
                        //     orderId: orderResponse.data.order._id,
                        //     amount: orderData.totalAmount,
                        //     paymentId: paymentResponse.paymentId
                        // }
                    });
                }
            }
        } catch (error) {
            console.error("Error in payment or order creation:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Order Details</h1>
                    <p>Please fill in your shipping details</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.orderSummary}>
                        <div className={styles.section}>
                            <h2>Order Items</h2>
                            <div className={styles.itemsList}>
                                {orderData.items.map((item, index) => (
                                    <div key={index} className={styles.item}>
                                        <img src={item.productID?.url || '/Images/placeholder.png'} alt={item.productID?.name || 'Product'} className={styles.itemImage} />
                                        <div className={styles.itemDetails}>
                                            <h3>{item.productID?.name || 'Product Name'}</h3>
                                            <div className={styles.itemInfo}>
                                                <span>Color: {item.productID?.color || 'N/A'}</span>
                                                <span className={styles.price}>₹{item.productID?.price?.toLocaleString('en-IN') || '0'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Shipping Details</h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="shippingAddress.fullName"
                                    value={formData.shippingAddress.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="shippingAddress.address"
                                    value={formData.shippingAddress.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="shippingAddress.city"
                                        value={formData.shippingAddress.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="shippingAddress.state"
                                        value={formData.shippingAddress.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="zipCode">ZIP Code</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="shippingAddress.zipCode"
                                        value={formData.shippingAddress.zipCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="country">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="shippingAddress.country"
                                        value={formData.shippingAddress.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="shippingAddress.phone"
                                    value={formData.shippingAddress.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Order Summary</h2>
                            <div className={styles.summary}>
                                <div className={styles.summaryItem}>
                                    <span>Subtotal</span>
                                    <span>₹{orderData.totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                {/* <div className={styles.summaryItem}>
                                    <span>Tax (18%)</span>
                                    <span>₹{(orderData.totalAmount * 0.18).toLocaleString('en-IN')}</span>
                                </div> */}
                                <div className={styles.total}>
                                    <span>Total Amount</span>
                                    <span className={styles.totalAmount}>
                                        ₹{(orderData.totalAmount).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => router.back()}
                        >
                            Back to Cart
                        </button>
                        <button
                            type="submit"
                            className={styles.payButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default OrderDetails; 