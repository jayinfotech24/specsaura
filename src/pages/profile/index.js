import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/profile.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import UpdateProfileForm from '../../Component/UpdateProfileForm';
import { GetGstRates, GetOrderById } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { GetUser } from '../../store/authSlice';
import { UpdateUser } from '../../store/authSlice';
import Pagination from '../../Component/Pagination';

const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [GstRates, setGstRates] = useState([]);
    const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
    const [totalOrdersPages, setTotalOrdersPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        router.push('/');
    };

    const handleProfileUpdate = (updatedData) => {
        if (!userData?._id) return;

        const updatePayload = {
            email: userData?.email,
            name: updatedData?.name,
            number: updatedData?.number,
            address: updatedData?.address,
        };

        dispatch(UpdateUser(updatePayload)).then((res) => {
            if (res.payload.status === 200) {
                setUserData(res.payload.user);
            }
        }).catch((error) => {
            console.error('Error updating user:', error);
        });
    };

    const GetUserDetails = async () => {
        try {
            setIsLoading(true);
            const response = await dispatch(GetUser()).unwrap();
            if (response.status === 200) {
                setUserData(response.mainUser);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const GetOrderDetail = async (userId, page = 1) => {
        if (!userId) return;

        try {
            const response = await dispatch(GetOrderById({ userId, page, limit: 10 })).unwrap();
            if (response.status === 200 || response.items) {
                setOrderData(response.items || []);
                setTotalOrdersPages(response.totalPages || 1);
                setCurrentOrdersPage(response.page || page);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleOrdersPageChange = (page) => {
        setCurrentOrdersPage(page);
        if (userData?._id) {
            GetOrderDetail(userData._id, page);
        }
    };

    useEffect(() => {
        GetUserDetails();
    }, []);

    function calculateGstPrice(type, originalPrice, gstRates = []) {
        let gstRate = 8;
        if (Array.isArray(gstRates) && type) {
            const found = gstRates.find(rate => rate.name === type);
            if (found && found.gst) {
                gstRate = found.gst;
            }
        }
        const gstAmount = (originalPrice * gstRate) / 100;
        return originalPrice + gstAmount;
    }

    useEffect(() => {
        if (userData?._id) {
            GetOrderDetail(userData._id);
        }
    }, [userData]);

    const GetGstData = () => {
        dispatch(GetGstRates()).then((res) => {
            if (res.payload.status == 200) {
                setGstRates(res.payload.items)
            }
        }).catch((err) => {
            console.log("Err", err)
        })
    }

    useEffect(() => {
        GetGstData()
    }, [])

    const getGstInfo = (item, gstRates) => {
        const gstType = item.product?.category?.description?.toLowerCase();
        const basePrice = item.product?.crossPrice != null ? item.product.crossPrice : item.product?.price;
        const gstObj = Array.isArray(gstRates) ? gstRates.find(rate => rate.name?.toLowerCase() === gstType) : null;
        const gstPercent = gstObj?.gst || 8;
        const gstIncl = calculateGstPrice(gstType, basePrice, gstRates || []);
        return { gstPercent, gstIncl };
    };

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            <FaUser />
                        </div>
                        <h2>{userData?.name || 'User'}</h2>
                        <p>{userData?.email}</p>
                    </div>
                    <nav className={styles.nav}>
                        <button
                            className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FaUser /> Profile
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <FaShoppingBag /> Orders
                        </button>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </nav>
                </div>

                <div className={styles.content}>
                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : (
                        <>
                            {activeTab === 'profile' && (
                                <UpdateProfileForm
                                    userData={userData}
                                    onUpdate={handleProfileUpdate}
                                />
                            )}

                            {activeTab === 'orders' && (
                                <div className={styles.ordersSection}>
                                    <h1>My Orders</h1>
                                    <div className={styles.ordersList}>
                                        {orderData && orderData.length > 0 ? (
                                            orderData.map((order, index) => (
                                                <div 
                                                    key={order._id} 
                                                    className={styles.minimalOrderCard}
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setSelectedOrderNumber(orderData.length - index);
                                                    }}
                                                >
                                                    <div className={styles.minimalOrderHeader}>
                                                        <div>
                                                            <span className={styles.orderNumberTitle}>Order #{orderData.length - index}</span>
                                                            <span className={styles.orderDateText}> • {new Date(order.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <span className={`${styles.status} ${styles[order.status?.toLowerCase()]}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className={styles.minimalItemsRow}>
                                                        {order.items?.map(item => (
                                                            <div key={item._id} className={styles.minimalItem}>
                                                                <img
                                                                    src={item.product?.url || '/Images/placeholder.webp'}
                                                                    alt={item.product?.name || 'Product'}
                                                                    className={styles.smallItemImage}
                                                                />
                                                                <span className={styles.minimalItemName}>{item.product?.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className={styles.viewDetailsPrompt}>
                                                        <span>Click to view details</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={styles.noOrders}>No orders found</div>
                                        )}
                                    </div>
                                    <Pagination
                                        currentPage={currentOrdersPage}
                                        totalPages={totalOrdersPages}
                                        onPageChange={handleOrdersPageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Order Details Modal Popup */}
            {selectedOrder && (
                <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Order Details #{selectedOrderNumber}</h2>
                            <button className={styles.closeButton} onClick={() => setSelectedOrder(null)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalMetaRow}>
                                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                                <span className={`${styles.status} ${styles[selectedOrder.status?.toLowerCase()]}`}>
                                    {selectedOrder.status}
                                </span>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Shipping Address</h4>
                                <p><strong>{selectedOrder.shippingAddress?.fullName}</strong></p>
                                <p>{selectedOrder.shippingAddress?.address}</p>
                                <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.zipCode}</p>
                                <p>{selectedOrder.shippingAddress?.country}</p>
                                <p>Phone: {selectedOrder.shippingAddress?.phone}</p>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Items ({selectedOrder.items?.length || 0})</h4>
                                <div className={styles.modalItemsList}>
                                    {selectedOrder.items?.map(item => (
                                        <div key={item._id} className={styles.modalItemCard}>
                                            <img
                                                src={item.product?.url || '/Images/placeholder.webp'}
                                                alt={item.product?.name || 'Product'}
                                                className={styles.modalItemImage}
                                            />
                                            <div className={styles.modalItemInfo}>
                                                <p className={styles.modalItemName}>{item.product?.name}</p>
                                                <p className={styles.modalItemPrice}>₹{Math.floor(getGstInfo(item, GstRates).gstIncl)}</p>
                                                <p className={styles.modalItemQuantity}>Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Payment Information</h4>
                                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                                <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Profile;
