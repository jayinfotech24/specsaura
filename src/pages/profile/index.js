import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/profile.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDownload, FaPrint } from 'react-icons/fa';
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

    const handleDownloadInvoice = (order, orderNumber) => {
        if (!order) return;

        const hasCoating = order.items?.some(item => item.coatingPrice && item.coatingPrice > 0);
        const totalAmount = order.totalAmount || order.items?.reduce((acc, item) => {
            const { gstIncl } = getGstInfo(item, GstRates);
            return acc + gstIncl * (item.quantity || 1);
        }, 0);

        const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Invoice - Order #${orderNumber} | SpecsAura</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; color: #333; padding: 30px; background: #fff; }
        .invoice { max-width: 780px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
        .header img { max-width: 140px; height: auto; margin-bottom: 8px; }
        .header h3 { font-size: 13px; color: #6b7280; font-weight: 400; margin-top: 4px; }
        .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 28px; }
        .meta-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; }
        .meta-item .label { font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .meta-item .value { font-size: 14px; color: #111827; font-weight: 500; }
        .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
            background: ${order.status?.toLowerCase() === 'delivered' ? '#d1fae5' : order.status?.toLowerCase() === 'cancelled' ? '#fee2e2' : '#fef3c7'};
            color: ${order.status?.toLowerCase() === 'delivered' ? '#065f46' : order.status?.toLowerCase() === 'cancelled' ? '#991b1b' : '#92400e'};
        }
        .section-title { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; }
        .items-table { width: 100%; border-collapse: collapse; table-layout: fixed; margin-bottom: 28px; }
        .items-table th, .items-table td { padding: 10px 10px; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 13px; word-wrap: break-word; overflow-wrap: break-word; vertical-align: top; }
        .items-table th { background: #f3f4f6; font-weight: 600; font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
        .col-item { width: 36%; }
        .col-price { width: 16%; }
        .col-lens { width: 14%; }
        .col-coat { width: 12%; }
        .col-gst { width: 9%; }
        .col-total { width: 13%; }
        .items-table tr:last-child td { border-bottom: none; }
        .summary-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 14px; color: #4b5563; }
        .summary-row.total { font-weight: 700; font-size: 16px; color: #111827; padding-top: 12px; margin-top: 6px; border-top: 1px solid #d1d5db; }
        .address-section { margin-bottom: 24px; }
        .address-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #374151; line-height: 1.7; }
        .footer { text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
        @media print { body { padding: 10px; } .invoice { max-width: 100%; } }
    </style>
</head>
<body>
<div class="invoice">
    <div class="header">
        <img src="https://specsaura.com/Images/logo2 (1).png" alt="SpecsAura Logo" onerror="this.style.display='none'" />
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin-bottom:2px;">TAX INVOICE</h2>
        <h3>Your Vision, Our Priority</h3>
    </div>

    <div class="meta-grid">
        <div class="meta-item">
            <div class="label">Order Number</div>
            <div class="value">#${orderNumber} &nbsp; (${order._id})</div>
        </div>
        <div class="meta-item">
            <div class="label">Date</div>
            <div class="value">${new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        </div>
        <div class="meta-item">
            <div class="label">Status</div>
            <div class="value"><span class="status-badge">${order.status}</span></div>
        </div>
        <div class="meta-item">
            <div class="label">Payment</div>
            <div class="value">${order.paymentMethod || 'Online'} &bull; ${order.paymentStatus || 'Paid'}</div>
        </div>
    </div>

    <div class="address-section">
        <div class="section-title">Shipping Address</div>
        <div class="address-box">
            <strong>${order.shippingAddress?.fullName || ''}</strong><br/>
            ${order.shippingAddress?.address || ''}<br/>
            ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.zipCode || ''}<br/>
            ${order.shippingAddress?.country || ''}<br/>
            Phone: ${order.shippingAddress?.phone || ''}
        </div>
    </div>

    <div class="section-title">Order Items</div>
    <table class="items-table">
        <colgroup>
            <col class="col-item" />
            <col class="col-price" />
            <col class="col-lens" />
            ${hasCoating ? '<col class="col-coat" />' : ''}
            <col class="col-gst" />
            <col class="col-total" />
        </colgroup>
        <thead>
            <tr>
                <th class="col-item">Item</th>
                <th class="col-price">Frame Price</th>
                <th class="col-lens">Lens Price</th>
                ${hasCoating ? '<th class="col-coat">Coating</th>' : ''}
                <th class="col-gst">GST</th>
                <th class="col-total">Total</th>
            </tr>
        </thead>
        <tbody>
            ${order.items?.map(item => {
                const { gstPercent, gstIncl } = getGstInfo(item, GstRates);
                const basePrice = item.product?.crossPrice != null ? item.product.crossPrice : (item.product?.price || 0);
                const lensPrice = item.lensPrice || 0;
                const coatingPrice = item.coatingPrice || 0;
                const totalWithGst = Math.floor(gstIncl * (item.quantity || 1));
                return `
                <tr>
                    <td class="col-item">${item.product?.name || 'Product'}</td>
                    <td class="col-price">&#8377;${basePrice.toLocaleString('en-IN')}</td>
                    <td class="col-lens">&#8377;${lensPrice.toLocaleString('en-IN')}</td>
                    ${hasCoating ? `<td class="col-coat">&#8377;${coatingPrice.toLocaleString('en-IN')}</td>` : ''}
                    <td class="col-gst">${gstPercent}%</td>
                    <td class="col-total">&#8377;${totalWithGst.toLocaleString('en-IN')}</td>
                </tr>`;
            }).join('')}
        </tbody>
    </table>

    <div class="summary-box">
        <div class="summary-row"><span>Subtotal</span><span>&#8377;${Math.floor(totalAmount).toLocaleString('en-IN')}</span></div>
        <div class="summary-row"><span>Shipping</span><span>Free</span></div>
        <div class="summary-row total"><span>Total Amount (incl. GST)</span><span>&#8377;${Math.floor(totalAmount).toLocaleString('en-IN')}</span></div>
    </div>

    <div class="footer">
        <p>Thank you for shopping with SpecsAura!</p>
        <p>For any queries, contact our customer support.</p>
        <p style="margin-top:8px;color:#d1d5db;font-size:11px;">This is a computer-generated invoice and does not require a signature.</p>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
    window.onload = function() {
        var opt = {
            margin: [8, 8, 8, 8],
            filename: 'Invoice_Order_${orderNumber}_SpecsAura.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(document.querySelector('.invoice')).save();
    };
</script>
</body>
</html>`;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlTemplate);
            printWindow.document.close();
        }
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
                            <div className={styles.modalHeaderActions}>
                                <button
                                    className={styles.downloadInvoiceBtn}
                                    onClick={() => handleDownloadInvoice(selectedOrder, selectedOrderNumber)}
                                    title="Download Invoice PDF"
                                >
                                    <FaDownload />
                                    <span>Invoice</span>
                                </button>
                                <button className={styles.closeButton} onClick={() => setSelectedOrder(null)}>✕</button>
                            </div>
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
