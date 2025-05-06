import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/profile.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 1234567890',
        address: '123 Main Street, City, State',
        orders: [
            { id: 1, date: '2024-03-15', total: '₹2,499', status: 'Delivered' },
            { id: 2, date: '2024-03-10', total: '₹1,999', status: 'Processing' }
        ],
        wishlist: [
            { id: 1, name: 'Classic Black Frames', price: '₹1,499', image: '/Images/glasses1.jpg' },
            { id: 2, name: 'Designer Sunglasses', price: '₹2,999', image: '/Images/glasses2.jpg' }
        ]
    });

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

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            <FaUser size={40} />
                        </div>
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
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
                        <button
                            className={`${styles.navItem} ${activeTab === 'wishlist' ? styles.active : ''}`}
                            onClick={() => setActiveTab('wishlist')}
                        >
                            <FaHeart /> Wishlist
                        </button>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </nav>
                </div>

                <div className={styles.content}>
                    {activeTab === 'profile' && (
                        <div className={styles.profileSection}>
                            <h1>Profile Information</h1>
                            <div className={styles.infoCard}>
                                <div className={styles.infoItem}>
                                    <FaUser className={styles.icon} />
                                    <div>
                                        <h3>Full Name</h3>
                                        <p>{userData.name}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <FaEnvelope className={styles.icon} />
                                    <div>
                                        <h3>Email</h3>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <FaPhone className={styles.icon} />
                                    <div>
                                        <h3>Phone</h3>
                                        <p>{userData.phone}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <FaMapMarkerAlt className={styles.icon} />
                                    <div>
                                        <h3>Address</h3>
                                        <p>{userData.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className={styles.ordersSection}>
                            <h1>Order History</h1>
                            <div className={styles.ordersList}>
                                {userData.orders.map(order => (
                                    <div key={order.id} className={styles.orderCard}>
                                        <div className={styles.orderHeader}>
                                            <h3>Order #{order.id}</h3>
                                            <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className={styles.orderDetails}>
                                            <p>Date: {order.date}</p>
                                            <p>Total: {order.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div className={styles.wishlistSection}>
                            <h1>My Wishlist</h1>
                            <div className={styles.wishlistGrid}>
                                {userData.wishlist.map(item => (
                                    <div key={item.id} className={styles.wishlistCard}>
                                        <img src={item.image} alt={item.name} />
                                        <div className={styles.wishlistInfo}>
                                            <h3>{item.name}</h3>
                                            <p>{item.price}</p>
                                            <button className={styles.addToCartButton}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
