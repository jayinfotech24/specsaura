import React, { useEffect, useState } from 'react'
import styles from "../../styles/cart.module.css"
import Header from "../../Component/Header"
import Footer from "../../Component/Footer"
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getCartDetail, getProductDetail, DeleteCart } from '../../store/authSlice'
import Preloader from '../../Component/Animated'
import AlertModal from '../../Component/AlertModal'

export default function index() {

    const router = useRouter()
    const dispatch = useDispatch()
    const [IsLoading, setIsLoading] = useState(false)
    const [productDetails, setProductDetails] = useState([]);
    const [CartData, setCartData] = useState([])
    const [alertState, setAlertState] = useState({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        onConfirm: null
    });

    useEffect(() => {

        const fetchProductsOneByOne = async () => {
            const productArray = [];

            for (const item of CartData) {
                try {
                    const res = await dispatch(getProductDetail(item.productID)).unwrap();
                    productArray.push(res.product); // make sure `res` has `product`

                } catch (err) {
                    console.error(`Error fetching product ${item.productID}:`, err);
                }
            }

            console.log("Array", productArray);
            setProductDetails(productArray);
            setIsLoading(false)
        };

        if (CartData.length > 0) {
            fetchProductsOneByOne();
        }
    }, [CartData]);

    useEffect(() => {
        Validate(router)
    }, [])

    const Payment = async (amount) => {
        // Convert amount to number and validate
        const sendAmount = Number(amount);
        if (isNaN(sendAmount)) {
            console.error('Invalid amount provided');
            return;
        }

        setIsLoading(true);
        try {
            await handlePayment(dispatch, sendAmount);
        } catch (error) {
            console.error('Payment failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const getDeatail = () => {

        const userId = localStorage.getItem("userId");
        dispatch(getCartDetail(userId)).then((res) => {
            console.log("Res", res)
            setCartData(res.payload.items);
            setIsLoading(false)
        }).catch((error) => {
            console.log("Err", error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getDeatail()
    }, [])
    const totalAmount = CartData.reduce((acc, item) => {
        return acc + (Number(item.productID.price));
    }, 0);

    console.log("Total Amount:", totalAmount); // For debugging


    const handleDelete = async (id) => {
        setAlertState({
            isOpen: true,
            type: 'info',
            title: 'Remove Item',
            message: 'Are you sure you want to remove this item from your cart?',
            onConfirm: async () => {
                try {
                    setIsLoading(true);
                    const res = await dispatch(DeleteCart(id)).unwrap();
                    console.log("Delete successful:", res);
                    setAlertState({
                        isOpen: true,
                        type: 'success',
                        title: 'Success',
                        message: 'Item removed successfully!',
                        onConfirm: null
                    });
                    getDeatail();
                } catch (error) {
                    console.error("Error deleting item:", error);
                    setAlertState({
                        isOpen: true,
                        type: 'error',
                        title: 'Error',
                        message: 'Failed to remove item. Please try again.',
                        onConfirm: null
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    const closeAlert = () => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }

    const handlePayment = () => {
        const totalAmount = CartData.reduce((sum, item) => sum + (Number(item.productID.price)), 0);
        router.push({
            pathname: '/order-details',
            query: { amount: totalAmount }
        });
    };

    return (
        <div className={styles.main}>
            {
                IsLoading && (
                    <Preloader />
                )
            }
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.poster}>
                    <img src='/Images/cart_bg.webp' />
                    <div className={styles.posterContent}>
                        <h1>Cart</h1>
                    </div>
                </div>
                <div className={styles.listContainer}>
                    {CartData.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <img src="/Images/empty-cart.svg" alt="Empty Cart" className={styles.emptyCartImage} />
                            <h2>Your Cart is Empty</h2>
                            <p>Looks like you haven't added any items to your cart yet.</p>
                            <button
                                onClick={() => router.push('/')}
                                className={styles.shopNowButton}
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Product name</td>
                                        <td>Price</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CartData.map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <td data-label="Product">
                                                    <div className={styles.product}>
                                                        <img src={item.productID.url} alt={item.productID.name} />
                                                        <div className={styles.productContent}>
                                                            <h2>{item.productID.name}</h2>
                                                            <p>{item.productID.color}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-label="Price">
                                                    <h2 style={{ fontSize: '14px' }}>{`₹${IncreasePrice(Number(item.productID.price))}`}</h2>
                                                </td>
                                                <td data-label="Action">
                                                    <svg style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(item._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={styles.deleteIcon}>
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button onClick={handlePayment} className={styles.button}>
                                {`Pay ₹${totalAmount.toLocaleString('en-IN')}`}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Footer />
            <AlertModal
                isOpen={alertState.isOpen}
                onClose={closeAlert}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onConfirm={alertState.onConfirm}
            />
        </div>
    )
}
