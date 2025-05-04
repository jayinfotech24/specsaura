import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/orderConfirmation.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { getCartDetail } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Preloader from '../../Component/Animated';
import { FaPrint } from 'react-icons/fa';

const OrderConfirmation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { amount } = router.query;

    const [orderData, setOrderData] = useState({
        items: [],
        totalAmount: amount ? parseFloat(amount) : 0,
        status: 'Pending',
        orderId: `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    });

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await dispatch(getCartDetail(userId)).unwrap();
                console.log("Response", response);
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

    // Calculate subtotal from items
    const calculateSubtotal = () => {
        return orderData.items.reduce((total, item) => {
            return total + (item.productID?.price || 0);
        }, 0);
    };

    if (isLoading) {
        return <Preloader />;
    }

    const subtotal = calculateSubtotal();

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Order Invoice - ${orderData.orderId}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                    }
                    .invoice {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                    }
                    .header {
                        margin-top: 20px;
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 20px;
                        position: relative;
                    }
                    .header img {
                        max-width: 150px;
                        height: auto;
                        margin-bottom: 10px;
                    }
                    .header p {
                        color: #666;
                        margin: 5px 0;
                    }
                    .title {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        text-align: right;
                        font-size: 14px;
                        color: #333;
                        font-weight: 500;
                    }
                    .orderId {
                        position: absolute;
                        top: 0;
                        right: 0;
                        text-align: right;
                        font-size: 16px;
                        color: #333;
                        font-weight: 500;
                    }
                    .invoiceNumber {
                        position: absolute;
                        top: 0;
                        right: 0;
                        text-align: right;
                        font-size: 14px;
                        color: #666;
                    }
                    .invoiceNumber strong {
                        display: block;
                        color: #333;
                        font-size: 16px;
                    }
                    .details {
                        margin-bottom: 30px;
                    }
                    .details-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    .detail-item {
                        margin-bottom: 10px;
                    }
                    .detail-item strong {
                        display: block;
                        color: #666;
                        font-size: 14px;
                    }
                    .items {
                        margin-bottom: 30px;
                        overflow-x: auto;
                    }
                    .items table {
                        width: 100%;
                        border-collapse: collapse;
                        min-width: 300px;
                    }
                    .items th, .items td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    .items th {
                        background-color: #f8f9fa;
                        font-weight: 500;
                    }
                    .summary {
                        margin-top: 30px;
                        border-top: 2px solid #ddd;
                        padding-top: 20px;
                    }
                    .summary-item {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                    }
                    .total {
                        font-weight: 600;
                        font-size: 18px;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        color: #666;
                        font-size: 14px;
                    }

                    /* Responsive Styles */
                    @media (max-width: 768px) {
                        body {
                            padding: 10px;
                        }
                        .invoice {
                            padding: 15px;
                        }
                        .header {
                            margin-top: 10px;
                            margin-bottom: 20px;
                        }
                        .header img {
                            max-width: 120px;
                        }
                        .title {
                            position: static;
                            text-align: center;
                            margin-bottom: 15px;
                        }
                        .details-grid {
                            grid-template-columns: 1fr;
                            gap: 15px;
                        }
                        .items th, .items td {
                            padding: 8px;
                            font-size: 14px;
                        }
                        .summary-item, .total {
                            font-size: 16px;
                        }
                    }

                    @media (max-width: 480px) {
                        body {
                            padding: 5px;
                        }
                        .invoice {
                            padding: 10px;
                        }
                        .header img {
                            max-width: 100px;
                        }
                        .items th, .items td {
                            padding: 6px;
                            font-size: 13px;
                        }
                        .summary-item, .total {
                            font-size: 15px;
                        }
                        .footer {
                            font-size: 12px;
                        }
                    }

                    @media print {
                        body {
                            padding: 0;
                        }
                        .invoice {
                            border: none;
                            padding: 0;
                        }
                        .header {
                            margin-top: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <div class="header">
                        <img src="/Images/logo2 (1).png" alt="SpecsAura Logo" />
                        <p>Your Vision, Our Priority</p>
                    </div>
                    
                    <div class="details">
                        <div class="details-grid">
                            <div class="detail-item">
                                <strong>Order Number</strong>
                                ${orderData.orderId}
                            </div>
                            <div class="detail-item">
                                <strong>Date</strong>
                                ${orderData.date}
                            </div>
                            <div class="detail-item">
                                <strong>Status</strong>
                                ${orderData.status}
                            </div>
                        </div>
                    </div>

                    <div class="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderData.items.map(item => `
                                    <tr>
                                        <td>${item.productID?.name || 'Product Name'}</td>
                                        <td>₹${item.productID?.price?.toLocaleString('en-IN') || '0'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="summary">
                        <div class="summary-item">
                            <span>Subtotal</span>
                            <span>₹${subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="summary-item">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="total">
                            <span>Total Amount</span>
                            <span>₹${subtotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Thank you for shopping with us!</p>
                        <p>For any queries, please contact our customer support.</p>
                    </div>
                </div>
                <script>
                    // Convert to PDF and download
                    window.onload = function() {
                        html2pdf().from(document.body).save('Order_${orderData.orderId}.pdf');
                    }
                </script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.container}>
                <div className={styles.successMessage}>
                    <div className={styles.checkmark}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1>Order Confirmed!</h1>
                    <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                </div>

                <div className={styles.orderDetails}>
                    <div className={styles.section}>
                        <h2>Order Information</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Order Number</span>
                                <span className={styles.value}>{orderData.orderId}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Date</span>
                                <span className={styles.value}>{orderData.date}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Status</span>
                                <span className={`${styles.value} ${styles.status} ${orderData.status.toLowerCase()}`}>
                                    {orderData.status}
                                </span>
                            </div>
                        </div>
                    </div>

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
                        <h2>Order Summary</h2>
                        <div className={styles.summary}>
                            <div className={styles.summaryItem}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className={styles.total}>
                                <span>Total Amount</span>
                                <span className={styles.totalAmount}>
                                    ₹{subtotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.printButton}
                        onClick={handlePrint}
                    >
                        <FaPrint /> Print Bill
                    </button>
                    <button
                        className={styles.trackButton}
                        onClick={() => router.push('/track-order')}
                    >
                        Track Order
                    </button>
                    <button
                        className={styles.continueButton}
                        onClick={() => router.push('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation; 