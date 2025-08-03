import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/orderConfirmation.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { calculateOrderWithGst, getCartDetail, GetGstRates } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Preloader from '../../Component/Animated';
import { FaPrint } from 'react-icons/fa';
import { sendOrder } from '../../store/authSlice'; // Adjust the path as needed
import { calculateGstPrice } from '../../store/authSlice';


const OrderConfirmation = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [GstRates, setGstRates] = useState([])
    const { amount } = router.query;
    const [SummeryData, setSummeryData] = useState([])

    const [orderData, setOrderData] = useState({
        items: [],  // you can fill this with real item data from props or localStorage if needed
        total: 0,
        orderId: '',
        date: ''
    });


    const getDetail = () => {
        const data = localStorage.getItem("OrderData");
        if (data) {
            const parsed = JSON.parse(data);
            setOrderData(prev => ({
                ...prev,
                ...parsed
            }));
        }
    };

    const GetGstData = () => {
        dispatch(GetGstRates()).then((res) => {
            ////console.log("Res", res)
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
        const savedOrder = JSON.parse(localStorage.getItem("OrderData")); // your actual source
        const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        const currentDate = new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        ////////console.log("DD", savedOrder)

        if (savedOrder) {
            setOrderData({
                ...savedOrder,
                orderId: generatedOrderId,
                date: currentDate
            });
        }
    }, []);


    useEffect(() => {
        ////////console.log("ORderData", orderData)
    }, [orderData])
    // useEffect(() => {
    //     if (amount) {
    //         setOrderData(prev => ({
    //             ...prev,
    //             totalAmount: parseFloat(amount)
    //         }));
    //     }
    // }, [amount]);

    // Calculate subtotal from items
    const calculateSubtotal = () => {
        return orderData?.items?.reduce((total, item) => {
            const productPrice = item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price || 0;
            const lensTypePrice = item.lensType && item.lensType.price ? Number(item.lensType.price) : 0;
            const lensCoatingPrice = item.lensCoating && item.lensCoating.price ? Number(item.lensCoating.price) : 0;
            return total + productPrice + lensTypePrice + lensCoatingPrice;
        }, 0);
    };

    // Helper to get GST percent and GST-inclusive price for a product
    const getGstInfo = (item, gstRates) => {
        const gstType = item.productID?.category?.description?.toLowerCase();

        const basePrice = item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price;
        const gstObj = Array.isArray(gstRates) ? gstRates.find(rate => rate.name?.toLowerCase() === gstType) : null;
        const gstPercent = gstObj?.gst || 8;
        const gstIncl = calculateGstPrice(gstType, basePrice, gstRates || []);
        return { gstPercent, gstIncl };
    };

    // Calculate GST-inclusive total
    const gstTotal = Math.round(
        (SummeryData || []).reduce((acc, item) => {
            const qty = item.numberOfItems || item.quantity || 1;
            return acc + (item.totalWithGst * qty);
        }, 0)
    );


    useEffect(() => {
        if (orderData && orderData.orderId && orderData.items.length > 0) {
            // Get customer email from orderData or localStorage
            const customerEmail = orderData.items[0]?.productID?.customerEmail || "customer@example.com"; // Replace with actual email logic
            const email = localStorage.getItem("email")
            // Build the HTML template
            const htmlTemplate = `
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
                        <img src="https://res.cloudinary.com/dbujlyfyn/image/upload/v1745037884/uploads/mcueefshi08tjnzydxx4.png " alt="SpecsAura Logo" />
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

                        </div>
                    </div>

                    <div class="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Product Price</th>
                                    <th>Lens Price</th>
                                    <th>Coating Price</th>
                                    <th>Total</th>
                                    <th>GST %</th>
                                    <th>GST Incl.</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderData.items.map(item => {
                const productPrice = item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price || 0;
                const lensTypePrice = item.lensType && item.lensType.price ? Number(item.lensType.price) : 0;
                const lensCoatingPrice = item.lensCoating && item.lensCoating.price ? Number(item.lensCoating.price) : 0;
                const itemTotal = productPrice + lensTypePrice + lensCoatingPrice;
                const gstType = item.productID?.category?.description?.toLowerCase();
                const gstObj = Array.isArray(orderData.gstRates) ? orderData.gstRates.find(rate => rate.name?.toLowerCase() === gstType) : null;
                const gstPercent = gstObj?.gst || 8;
                const gstIncl = calculateGstPrice(gstType, productPrice, orderData.gstRates || []);
                return `
                                    <tr>
                                        <td>${item.productID?.name || 'Product Name'}</td>
                                        <td>₹${productPrice.toLocaleString('en-IN')}</td>
                                        <td>₹${lensTypePrice ? lensTypePrice.toLocaleString('en-IN') : '0'}</td>
                                        <td>₹${lensCoatingPrice ? lensCoatingPrice.toLocaleString('en-IN') : '0'}</td>
                                        <td>₹${itemTotal.toLocaleString('en-IN')}</td>
                                        <td>${gstPercent}%</td>
                                        <td>₹${gstIncl.toLocaleString('en-IN')}</td>
                                    </tr>
                                    `;
            }).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="summary">
                        <div class="summary-item">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="total">
                            <span>Total Amount (incl. GST)</span>
                            <span>₹${gstTotal.toLocaleString('en-IN')}</span>
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
            `;


            const jsonObject = {
                email: email,
                htmlTemplate,
                orderId: orderData.orderId
            }

            ////////console.log("Ob", jsonObject)
            dispatch(sendOrder(jsonObject)).then((res) => {
                ////////console.log("Res", res)
                // Optionally show a toast or log success
                ////////console.log('Order confirmation email sent!');
            }).catch((err) => {
                // Optionally handle error
                console.error('Failed to send order email:', err);
            });
            // Call the API

        }
    }, [orderData]);

    useEffect(() => {
        //console.log("Cooo", calculateOrderWithGst(orderData.items, GstRates))
        setSummeryData(calculateOrderWithGst(orderData.items, GstRates))
    }, [orderData])

    if (isLoading) {
        return <Preloader />;
    }

    const subtotal = calculateSubtotal();
    const hasCoating = SummeryData?.some(item => item.coatingPrice && item.coatingPrice > 0);


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
                                    <th>Product Price</th>
                                    <th>Lens Price</th>
                                   ${hasCoating ? '<th>Coating Price</th>' : ''}
                                      <th>GST</th>
                                    <th>Total</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
  ${SummeryData.map(item => {
            const framePrice = item.framePrice || 0;
            const lensPrice = item.lensPrice || 0;
            const gstPercent = item.gstPercent || 0;
            const totalWithGst = item.totalWithGst || 0;

            return `
      <tr>
        <td>${item.productName || 'Product Name'}</td>
        <td>₹${framePrice.toLocaleString('en-IN')}</td>
        <td>₹${lensPrice.toLocaleString('en-IN')}</td>
        <td>${gstPercent}%</td>
        <td>₹${totalWithGst.toLocaleString('en-IN')}</td>
      </tr>
    `;
        }).join('')}
</tbody>

                        </table>
                    </div>

                    <div class="summary">
                        <div class="summary-item">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="total">
                            <span>Total Amount (incl. GST)</span>
                            <span>₹${gstTotal.toLocaleString('en-IN')}</span>
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
                                <span className={`${styles.value} ${styles.status} ${orderData.status}`}>
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
                                            <span className={styles.price}>₹{(item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price)?.toLocaleString('en-IN') || '0'}</span>
                                            {/* {(() => {
                                                const gstType = item.productID?.category?.description?.toLowerCase();
                                                const basePrice = item.productID?.crossPrice != null ? item.productID.crossPrice : item.productID?.price;
                                                const gstObj = Array.isArray(orderData.gstRates) ? orderData.gstRates.find(rate => rate.name?.toLowerCase() === gstType) : null;
                                                const gstPercent = gstObj?.gst || 8;
                                                const gstIncl = basePrice;
                                                return (
                                                    <span className={styles.gstPrice}>
                                                        ₹{gstIncl.toLocaleString('en-IN')}
                                                    </span>
                                                );
                                            })()} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Order Summary</h2>
                        <div className={styles.summary}>
                            {SummeryData.map((item, index) => (
                                <div key={index} className={styles.itemSummary}>
                                    {/* Product Name and total price with GST */}
                                    <div className={styles.summaryItem}>
                                        <span>{item.productName || 'Product'}</span>
                                        <span>
                                            ₹{item.totalWithGst.toLocaleString('en-IN')}
                                            <span style={{ fontSize: '12px', color: '#888', marginLeft: '4px' }}>
                                                (incl. {item.gstPercent}% GST)
                                            </span>
                                        </span>
                                    </div>

                                    {/* Frame Price */}
                                    <div className={styles.summaryItem}>
                                        <span>Frame Price</span>
                                        <span>₹{item.framePrice.toLocaleString('en-IN')}</span>
                                    </div>

                                    {/* Lens Price (if present and > 0) */}
                                    {item.hasLens && item.lensPrice > 0 && (
                                        <div className={styles.summaryItem}>
                                            <span>Lens Price</span>
                                            <span>₹{item.lensPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}

                                    {/* Accessories Price if present */}
                                    {item.accessoriesPrice > 0 && (
                                        <div className={styles.summaryItem}>
                                            <span>Accessories Price</span>
                                            <span>₹{item.accessoriesPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}

                                    {/* Quantity if available */}
                                    {item.quantity && item.quantity > 1 && (
                                        <div className={styles.summaryItem}>
                                            <span>Quantity: {item.quantity}</span>
                                            <span>₹{(item.totalWithGst * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    )}

                                    {/* Divider except for last item */}
                                    {index < SummeryData.length - 1 && <hr className={styles.summaryDivider} />}
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
                                    {SummeryData
                                        .reduce((acc, item) => acc + (item.totalWithGst || 0) * (item.quantity || 1), 0)
                                        .toLocaleString('en-IN')}
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