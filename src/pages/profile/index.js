import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/profile.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import UpdateProfileForm from '../../Component/UpdateProfileForm';
import { GetOrderById } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { GetUser } from '../../store/authSlice';
import { UpdateUser } from '../../store/authSlice';


const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            router.push('/login');
        }
    }, [router]);


    const handleLogout = () => {
        localStorage.removeItem('userToken');
        router.push('/login');
    };

    const handleProfileUpdate = (updatedData) => {
        if (!userData?._id) return;

        const updatePayload = {
            email: userData?.email,
            name: updatedData?.name,
            number: updatedData?.number,
            address: updatedData?.address,
        };
        console.log("UpdatedData", updatePayload);

        dispatch(UpdateUser(updatePayload)).then((res) => {
            console.log("ResponseUpdate", res);
            if (res.payload.status === 200) {
                setUserData(res.payload.mainUser);
            }
        }).catch((error) => {
            console.error('Error updating user:', error);
        });
    };

    const GetUserDetails = async () => {
        try {
            setIsLoading(true);
            const response = await dispatch(GetUser()).unwrap();
            console.log(response);
            if (response.status === 200) {
                setUserData(response.mainUser);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const GetOrderDetail = async (userId) => {
        console.log("Call", userId);
        if (!userId) return;

        try {
            const response = await dispatch(GetOrderById(userId)).unwrap();
            console.log(response);
            if (response.status === 200) {

                setOrderData(response.items || []);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        GetUserDetails();
    }, []);

    // Fetch order data when userData is available
    useEffect(() => {
        if (userData?._id) {
            GetOrderDetail(userData._id);
        }
    }, [userData]);

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
                                            orderData.map(order => (
                                                <div key={order._id} className={styles.orderCard}>
                                                    <div className={styles.orderHeader}>
                                                        <h3>Order #{order._id}</h3>
                                                        <span className={`${styles.status} ${styles[order.status?.toLowerCase()]}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className={styles.orderDetails}>
                                                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                                        <p>Total: ₹{order.totalAmount}</p>
                                                        <div className={styles.shippingInfo}>
                                                            <h4>Shipping Address:</h4>
                                                            <p>{order.shippingAddress?.fullName}</p>
                                                            <p>{order.shippingAddress?.address}</p>
                                                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}</p>
                                                            <p>{order.shippingAddress?.country}</p>
                                                            <p>Phone: {order.shippingAddress?.phone}</p>
                                                        </div>
                                                        <div className={styles.itemsList}>
                                                            <h4>Items:</h4>
                                                            {order.items?.map(item => (
                                                                <div key={item._id} className={styles.orderItem}>
                                                                    <img
                                                                        src={item.product?.url}
                                                                        alt={item.product?.name}
                                                                        className={styles.itemImage}
                                                                    />
                                                                    <div className={styles.itemDetails}>
                                                                        <p className={styles.itemName}>{item.product?.name}</p>
                                                                        <p className={styles.itemPrice}>₹{item.product?.price}</p>
                                                                        <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className={styles.paymentInfo}>
                                                            <p>Payment Method: {order.paymentMethod}</p>
                                                            <p>Payment Status: {order.paymentStatus}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={styles.noOrders}>No orders found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
