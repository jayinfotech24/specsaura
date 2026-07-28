import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/orderDetails.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { CreateOrder, getCartDetail, DeleteFullCart, GetOrderById, GetSingleCart, DeleteCart, GetGstRates, calculateGstPrice, calculateOrderWithGst } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Preloader from '../../Component/Animated';
import { handlePayment } from '../../store/commonFunction';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MakePayment, VerifyPayment } from '../../store/authSlice';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

const OrderDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { from } = router.query;
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const [GstRates, setGstRates] = useState([])
    const [SummeryData, setSummeryData] = useState([])
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
        total: 0
    });

    useEffect(() => {
        if (!isRazorpayLoaded) {
            setTimeout(() => {
                setIsRazorpayLoaded(true)
            }, 2000)
        }
    }, [isRazorpayLoaded])


    //console.log("Orr", orderData)

    const GetGstData = () => {
        dispatch(GetGstRates()).then((res) => {
            //console.log("Res", res)
            if (res.payload.status == 200) {
                setGstRates(res.payload.items)
            }
        }).catch((err) => {
            consol.log("Err", err)
        })
    }


    useEffect(() => {
        GetGstData()
    }, [])

    useEffect(() => {
        const fetchOrderData = async () => {
            setIsLoading(true);
            try {
                const userId = localStorage.getItem("userId");

                if (from == "cart") {
                    // CASE 1
                    const response = await dispatch(getCartDetail(userId)).unwrap();
                    //console.log("Cart Response", response);

                    const total = response.items.reduce((acc, item) => {

                        ////console.log("Item", item)
                        const itemPrice = Number(item.productID.crossPrice != null ? item.productID.crossPrice : item.productID.price) || 0;
                        const lensTypePrice = item.lensType && item.lensType.price ? Number(item.lensType.price) : 0;
                        const lensCoatingPrice = item.lensCoating && item.lensCoating.price ? Number(item.lensCoating.price) : 0;
                        const itemQuantity = Number(item.numberOfItems) || 1;
                        return acc + ((itemPrice + lensTypePrice + lensCoatingPrice) * itemQuantity);
                    }, 0);

                    setOrderData({
                        items: response.items || [],
                        total: total
                    });

                } else if (from === "accessoryDirect") {
                    // CASE 2: Direct accessory purchase
                    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
                    const powerSunglassesOption = localStorage.getItem('powerSunglassesOption');

                    const basePrice = Number(selectedProduct.crossPrice != null ? selectedProduct.crossPrice : selectedProduct.price) || 0;
                    const total = basePrice;

                    setOrderData({
                        items: [
                            {
                                productID: {
                                    ...selectedProduct,
                                    powerSunglasses: powerSunglassesOption === "yes" ? true : false
                                }
                            }
                        ],
                        total: total
                    });

                } else if (from == "buy") {
                    // CASE 3: Original "buy" flow (for non-accessories requiring prescription)
                    const cartId = localStorage.getItem("cartId");
                    const specsData = JSON.parse(localStorage.getItem("specsData") || "{}");
                    const productId = localStorage.getItem("productId");

                    if (!cartId) throw new Error("Cart ID missing from localStorage");

                    const res = await dispatch(GetSingleCart(cartId)).unwrap();
                    console.log("Res", res)
                    const selectedProduct = res?.carts?.productID;

                    const basePrice = Number(selectedProduct.crossPrice != null ? selectedProduct.crossPrice : selectedProduct.price) || 0;
                    const lensTypePrice = res.carts.lensType && res.carts.lensType.price ? Number(res.carts.lensType.price) : 0;
                    const lensCoatingPrice = res.carts.lensCoating && res.carts.lensCoating.price ? Number(res.carts.lensCoating.price) : 0;
                    const additionalCost = Number(specsData.additionalCost) || 0;
                    const total = basePrice + lensTypePrice + lensCoatingPrice + additionalCost;

                    setOrderData({
                        items: [
                            {
                                productID: {
                                    ...selectedProduct,
                                    specs: specsData,
                                    productId: productId,
                                    cartId: cartId,
                                    prescription: res.carts.prescriptionID?._id
                                },
                                lensType: res.carts?.lensType,
                                lensCoating: res.carts?.lensCoating
                            }
                        ],
                        total: total
                    });

                } else {
                    // CASE 4: fallback
                    const specsData = JSON.parse(localStorage.getItem("specsData") || "{}");
                    const productId = localStorage.getItem("productId");
                    const cartId = localStorage.getItem("cartId");

                    const res = await dispatch(GetSingleCart(cartId)).unwrap();
                    console.log("Res", res)
                    const selectedProduct = res?.carts?.productID;

                    if (selectedProduct && selectedProduct.price) {
                        const basePrice = Number(selectedProduct.crossPrice != null ? selectedProduct.crossPrice : selectedProduct.price) || 0;
                        const lensTypePrice = res.carts.lensType && res.carts.lensType.price ? Number(res.carts.lensType.price) : 0;
                        const lensCoatingPrice = res.carts.lensCoating && res.carts.lensCoating.price ? Number(res.carts.lensCoating.price) : 0;
                        const additionalCost = Number(specsData.additionalCost) || 0;
                        const total = basePrice + lensTypePrice + lensCoatingPrice + additionalCost;

                        setOrderData({
                            items: [
                                {
                                    productID: {
                                        ...selectedProduct,
                                        specs: specsData,
                                        productId: productId,
                                        cartId: cartId,
                                        prescription: res.carts.prescriptionID?._id
                                    },
                                    lensType: res.carts?.lensType,
                                    lensCoating: res.carts?.lensCoating
                                }
                            ],
                            total: total
                        });
                    }
                }
            } catch (error) {
                console.error("Error setting up order data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderData();
    }, [dispatch, from]);





    useEffect(() => {
        ////////console.log("Ord", orderData)
    }, [orderData])


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


    //console.log("Cal", calculateOrderWithGst(orderData.items, GstRates));
    useEffect(() => {
        if (orderData) {

            const data = calculateOrderWithGst(orderData.items, GstRates)
            console.log("O", data)
            setSummeryData(calculateOrderWithGst(orderData.items, GstRates))
        }
    }, [orderData.items])

    const getGstTotalAmount = () => {
        return Math.round(
            (SummeryData || []).reduce((acc, item) => {
                const qty = item.numberOfItems || item.quantity || 1;
                return acc + (item.totalWithGst * qty);
            }, 0)
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const productId = localStorage.getItem("productId")
        const cartId = localStorage.getItem("cartId"

        )
        const prescriptionId = localStorage.getItem("PrescriptionId");

        try {
            if (!isRazorpayLoaded) {
                toast.error("Payment system is not ready. Please try again.");
                return;
            }


            ////////console.log("Is", isRazorpayLoaded)
            // Get the GST-inclusive total amount
            const amount = getGstTotalAmount();

            // Create payment order
            const result = await dispatch(MakePayment({ amount })).unwrap();

            if (!result || !result.id) {
                throw new Error("Invalid payment order response");
            }

            let razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                try {
                    const response = await fetch("/api/razorpay-key");
                    const data = await response.json();
                    razorpayKey = data?.key;
                } catch (err) {
                    console.error("Failed to fetch Razorpay key dynamically", err);
                }
            }

            if (!razorpayKey) {
                toast.error("Payment configuration error. Please contact support.");
                return;
            }

            // Initialize Razorpay
            const options = {
                key: razorpayKey,
                amount: amount * 100, // Convert to paise
                currency: "INR",
                name: "Specsaura",
                description: "Specsaura Order",
                order_id: result.id,
                handler: async function (response) {
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderData: orderData // Include order data for backend processing
                    };

                    try {
                        const verifyRes = await dispatch(VerifyPayment(payload)).unwrap();
                        ////////console.log("Verify Response", verifyRes);
                        let orderPayload;
                        if (from == "cart") {
                            orderPayload = {
                                user: localStorage.getItem("userId"),
                                items: orderData.items.map(item => ({
                                    product: item.productID._id,
                                    cart: item._id || item.productID._id, // Use product ID as cart ID if not from cart
                                    prescription: prescriptionId || null,
                                    quantity: from === 'cart' ? (item.numberOfItems || 1) : 1
                                })),
                                totalAmount: amount,
                                status: "Pending",
                                paymentStatus: "Completed",
                                paymentMethod: "Online",
                                shippingAddress: formData.shippingAddress
                            }

                        }
                        else {
                            orderPayload = {
                                user: localStorage.getItem("userId"),
                                items: orderData.items.map(item => ({
                                    product: productId,
                                    cart: cartId, // Use product ID as cart ID if not from cart
                                    prescription: item.productID.prescription || null,
                                    quantity: from === 'cart' ? (item.numberOfItems || 1) : 1
                                })),
                                totalAmount: amount,
                                status: "Pending",
                                paymentStatus: "Completed",
                                paymentMethod: "Online",
                                shippingAddress: formData.shippingAddress
                            }
                        }
                        // Create order after successful payment verification


                        ////////console.log("Order Payload", orderPayload);
                        try {

                            setIsLoading(true)
                            const orderRes = await dispatch(CreateOrder(orderPayload)).unwrap();
                            ////////console.log("Order created successfully", orderRes);

                            if (from == "cart") {
                                const productIds = orderData.items.map(item => item._id);
                                const cartPayload = {
                                    ids: productIds
                                };
                                await dispatch(DeleteFullCart(cartPayload)).then((res) => {
                                    ////////console.log("Cart cleared successfully", res);
                                }).catch((error) => {
                                    ////////console.log("Error clearing cart:", error);
                                });

                                toast.success("Payment successful!");
                                // Clear localStorage after successful payment
                                localStorage.removeItem('selectedProduct');
                                localStorage.removeItem('specsData');
                                localStorage.setItem("OrderData", JSON.stringify(orderData));
                                setIsLoading(false)
                                router.push('/order-confirmation');
                            } else {
                                const cartId = localStorage.getItem("cartId");
                                const res = await dispatch(DeleteCart(cartId)).unwrap();

                                ////////console.log("Delelele", res)

                                toast.success("Payment successful!");
                                // Clear localStorage after successful payment
                                localStorage.removeItem('selectedProduct');
                                localStorage.removeItem('specsData');
                                localStorage.setItem("OrderData", JSON.stringify(orderData));
                                setIsLoading(false)
                                router.push('/order-confirmation');
                            }

                        } catch (error) {
                            console.error("Error creating order:", error);
                            toast.error("Error creating order. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                // prefill: {
                //     name: "Mihir Yoganandi",
                //     email: "yoganandimihir@gmail.com",
                //     contact: "9313331856",
                // },
                theme: {
                    color: "#1A73E8",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error in payment or order creation:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const reloadRazorpayScript = () => {
        setIsRazorpayLoaded(false);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => setIsRazorpayLoaded(false);
        document.body.appendChild(script);
    };



    return (
        <div className={styles.main}>
            {
                isLoading && <Preloader />
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setIsRazorpayLoaded(true)}
                onError={() => {
                    console.error("Failed to load Razorpay script");
                    toast.error("Failed to load payment system. Please refresh the page.");
                }}
            />
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
                                        <img
                                            src={item.productID?.images && item.productID?.images?.length > 0 ? item.productID?.images[0] : item.productID?.url || '/Images/placeholder.png'}
                                            alt={item.productID?.name || 'Product'}
                                            className={styles.itemImage}
                                        />
                                        <div className={styles.itemDetails}>
                                            <h3>{item.productID?.name || 'Product Name'}</h3>
                                            {/* GST-inclusive price */}
                                            <div className={styles.gstPrice}>
                                                {(() => {
                                                    const gstType = item.productID?.category?.description?.toLowerCase();
                                                    const basePrice = item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price;
                                                    const gstObj = Array.isArray(GstRates) ? GstRates.find(rate => rate.name?.toLowerCase() === gstType) : null;
                                                    ////console.log("G", GstRates, item)
                                                    const gstPercent = gstObj?.gst || 8;
                                                    const gstIncl = calculateGstPrice(gstType, basePrice, GstRates);
                                                    return (
                                                        <>


                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            {from === 'cart' ? (
                                                <div className={styles.itemInfo}>
                                                    <span>Quantity: {item.quantity || 1}</span>
                                                    <span className={styles.price}>
                                                        ₹{((item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className={styles.itemInfo}>
                                                    {item.productID?.specs && (
                                                        <div className={styles.specsInfo}>
                                                            <span>Power Type: {item.productID.specs.powerType || 'Standard'}</span>
                                                            <span>Frame Type: {item.productID.specs.frameType || 'Standard'}</span>
                                                        </div>
                                                    )}
                                                    <span className={styles.price}>
                                                        ₹{(item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price)?.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            )}
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
                                {SummeryData.map((item, index) => (
                                    <div key={index} className={styles.itemSummary}>
                                        <div className={styles.summaryItem}>
                                            <span>{item.productName || 'Product'}</span>
                                            <span>
                                                ₹{item.totalWithGst.toLocaleString('en-IN')}
                                                <span style={{ fontSize: '12px', color: '#888', marginLeft: '4px' }}>
                                                    (incl. {item.gstPercent}% GST)
                                                </span>
                                            </span>
                                        </div>

                                        {/* Show frame price */}
                                        <div className={styles.summaryItem}>
                                            <span>Frame Price</span>
                                            <span>₹{item.framePrice.toLocaleString('en-IN')}</span>
                                        </div>

                                        {/* Show lens price only if hasLens is true and lensPrice > 0 */}
                                        {item.hasLens && item.lensPrice > 0 && (
                                            <div className={styles.summaryItem}>
                                                <span>Lens Price</span>
                                                <span>₹{item.lensPrice.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        {item.coatingPrice && item.coatingPrice > 0 && (
                                            <div className={styles.summaryItem}>
                                                <span>Coating Price</span>
                                                <span>₹{item.coatingPrice.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}

                                        {/* Optionally you could add quantity if your data supports it */}
                                        {/* {item.quantity && item.quantity > 1 && (
          <div className={styles.summaryItem}>
            <span>Quantity: {item.quantity}</span>
          </div>
        )} */}

                                        {index < orderData.items.length - 1 && <hr className={styles.summaryDivider} />}
                                    </div>
                                ))}

                                <div className={styles.summaryItem}>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>

                                <div className={styles.total}>
                                    <span>Total Amount</span>
                                    <span className={styles.totalAmount}>
                                        ₹
                                        {SummeryData.reduce((acc, item) => acc + (item.totalWithGst || 0), 0).toLocaleString('en-IN')}
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

                        {!isRazorpayLoaded && (
                            <div className={styles.alert}>
                                Payment system is not ready retry.
                                {/* Optionally, add a retry button */}

                            </div>
                        )}
                        <button
                            type="submit"
                            className={styles.payButton}
                            disabled={isLoading || !isRazorpayLoaded}
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