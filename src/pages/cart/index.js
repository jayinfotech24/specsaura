import React, { useEffect, useState } from 'react'
import styles from "../../styles/cart.module.css"
import Header from "../../Component/Header"
import Footer from "../../Component/Footer"
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getCartDetail, getProductDetail, DeleteCart, DeleteFullCart, GetUser, isAccessoryCategory } from '../../store/authSlice'
import Preloader from '../../Component/Animated'
import AlertModal from '../../Component/AlertModal'
import { toast } from 'react-hot-toast'

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
    const [hasPrescriptionRequired, setHasPrescriptionRequired] = useState(false);
    const [prescriptionItems, setPrescriptionItems] = useState([]);

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

            ////////console.log("Array", productArray);
            setProductDetails(productArray);
            setIsLoading(false)
        };

        if (CartData?.length > 0) {
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
            ////////console.log("Err", error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getDeatail()
    }, [])
    const totalAmount = CartData?.reduce((acc, item) => {
        const itemPrice = Number(item.productID.price) || 0;
        const lensTypePrice = item.lensType && item.lensType.price ? Number(item.lensType.price) : 0;
        const lensCoatingPrice = item.lensCoating && item.lensCoating.price ? Number(item.lensCoating.price) : 0;
        const itemQuantity = Number(item.numberOfItems) || 1;
        const itemTotal = (itemPrice + lensTypePrice + lensCoatingPrice) * itemQuantity;
        return acc + itemTotal;
    }, 0);

    ////////console.log("Total Amount:", totalAmount);

    useEffect(() => {
        // Check if any items require prescription
        const prescriptionNeeded = CartData?.some(item => !item.isAllDataAdded && !isAccessoryCategory(item.productID)); // Modified line
        setHasPrescriptionRequired(prescriptionNeeded);

        // Get items that need prescription
        const itemsNeedingPrescription = CartData?.filter(item => !item.isAllDataAdded && !isAccessoryCategory(item.productID)); // Modified line
        setPrescriptionItems(itemsNeedingPrescription);
    }, [CartData]);

    const handlePrescriptionClick = (item) => {
        // Store the selected product in localStorage for the specs progress form
        localStorage.setItem('selectedProduct', JSON.stringify({
            id: item.productID._id,
            name: item.productID.name,
            price: item.productID.price,
            image: item.productID.url || '/Images/placeholder.webp',
            url: item.productID.url || '/Images/placeholder.webp',
            crossPrice: item.productID.crossPrice !== undefined ? item.productID.crossPrice : null
        }));

        // Store cart ID for updating later
        localStorage.setItem('cartId', item._id);

        // Redirect to specs progress form
        router.push({
            pathname: '/specProgress',
            query: { action: 'addToCart' }
        });
    };

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
                    ////////console.log("Delete successful:", res);

                    setAlertState(prev => ({
                        ...prev,
                        type: 'success',
                        title: 'Success',
                        message: 'Item removed successfully!',
                        onConfirm: null
                    }));

                    // Delay closing the modal by 1 second
                    setTimeout(() => {
                        setAlertState(prev => ({ ...prev, isOpen: false }));
                    }, 1000);

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

                    // Also auto-close error modal after 1 second
                    setTimeout(() => {
                        setAlertState(prev => ({ ...prev, isOpen: false }));
                    }, 1000);
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };



    const closeAlert = () => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }

    const handleProceedToCheckout = () => {
        router.push({
            pathname: '/order-details',
            query: { from: 'cart' }
        });
    };
    const handkeBuySingle = async (id) => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                toast.error("Please login to continue");
                router.push("/login");
                return;
            }

            const response = await dispatch(GetUser()).unwrap();
            if (response.status !== 200) {
                toast.error("Please login to continue");
                router.push("/login");
                return;
            }

            localStorage.setItem("cartId", id)
            router.push({
                pathname: '/order-details',
                query: { from: 'buy' }
            });
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('userToken');
                toast.error("Session expired. Please login again");
                router.push("/login");
                return;
            }
            console.error("Error in Buy Now:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleClearCart = async () => {
        try {
            const productIds = CartData?.map(item => item._id);
            ////////console.log("Product IDs", productIds);
            const payload = {
                ids: productIds
            };
            await dispatch(DeleteFullCart(payload)).then((res) => {
                ////////console.log("Cart cleared successfully", res);
                toast.success("Cart cleared successfully");
                getDeatail(); // Refresh cart data
            }).catch((error) => {
                ////////console.log("Error clearing cart:", error);
                toast.error("Failed to clear cart");
            });
        } catch (error) {
            console.error("Error clearing cart:", error);
            toast.error("Failed to clear cart");
        }
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
                    {CartData?.length === 0 ? (
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
                                        <td>Quantity</td>
                                        <td>Prescription</td>
                                        <td>Buy</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CartData?.map((item) => {
                                        ////////console.log("Item", item)
                                        const itemPrice = Number(item.productID.price) || 0;
                                        const lensTypePrice = item.lensType && item.lensType.price ? Number(item.lensType.price) : 0;
                                        const lensCoatingPrice = item.lensCoating && item.lensCoating.price ? Number(item.lensCoating.price) : 0;
                                        const itemQuantity = Number(item.numberOfItems) || 1;
                                        const itemTotal = (itemPrice) * itemQuantity;
                                        const needsPrescription = !item.isAllDataAdded && !isAccessoryCategory(item.productID); // Modified line

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
                                                    <h2 style={{ fontSize: '14px', color: "#000" }}>
                                                        {`₹${itemTotal?.toLocaleString('en-IN')}`}
                                                    </h2>
                                                </td>
                                                <td data-label="Quantity">
                                                    <div className={styles.quantity}>
                                                        <h2>{itemQuantity}</h2>
                                                    </div>
                                                </td>
                                                <td data-label="Prescription">
                                                    {isAccessoryCategory(item.productID) ? (
                                                        <span className={styles.noPrescription}>-</span>
                                                    ) : needsPrescription ? (
                                                        <button
                                                            onClick={() => handlePrescriptionClick(item)}
                                                            className={styles.prescriptionButton}
                                                        >
                                                            Eye Prescription Details
                                                        </button>
                                                    ) : (
                                                        <span className={styles.prescriptionAdded}>
                                                            ✓ Added
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => handkeBuySingle(item._id)}
                                                        className={styles.buyButton}
                                                        disabled={needsPrescription}
                                                    >
                                                        Buy Now
                                                    </button>
                                                </td>
                                                <td>
                                                    <svg style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(item._id)}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#000"
                                                        strokeWidth="1.75"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className={styles.deleteIcon}
                                                    >
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className={styles.buttonContainer}>
                                <button onClick={handleClearCart} className={styles.clearButton}>
                                    Clear Cart
                                </button>
                                <button
                                    onClick={handleProceedToCheckout}
                                    className={styles.button}
                                    disabled={hasPrescriptionRequired}
                                >
                                    {`Pay ₹${totalAmount?.toLocaleString('en-IN')}`}
                                </button>
                            </div>
                            {hasPrescriptionRequired && (
                                <div className={styles.prescriptionWarning}>
                                    <p>⚠️ Please add prescriptions for all required items before proceeding to checkout.</p>
                                </div>
                            )}
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
