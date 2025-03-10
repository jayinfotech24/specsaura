import styles from "../../styles/terms.module.css"
import Header from "../../Component/Header"
import Footer from '../../Component/Footer'
import React from 'react'
const TermsAndConditions = () => {
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1>Terms and Conditions</h1>
                    <p>Welcome to SPECSAURA! These Terms and Conditions govern your use of our website, including the purchase of spectacles, goggles, powered glasses, and eye doctor services. By accessing or using our site, you agree to these terms.</p>

                    <h2>1. Definitions</h2>
                    <ul className={styles.list}>
                        <li><strong>"We," "Us," "Our"</strong> refers to SPECSAURA.</li>
                        <li><strong>"You," "User," "Customer"</strong> refers to any person accessing or using our website or services.</li>
                        <li><strong>"Products"</strong> include spectacles, goggles, powered glasses, and related accessories.</li>
                        <li><strong>"Services"</strong> include online eye tests, doctor consultations, and prescription glasses.</li>
                    </ul>

                    <h2>2. Eligibility</h2>
                    <p>You must be at least 18 years old or have parental consent to use our services. By using our website, you confirm that the information you provide is accurate.</p>

                    <h2>3. Ordering and Payment</h2>
                    <h3>3.1 Placing an Order</h3>
                    <p>Orders can be placed through our website. All orders are subject to availability and acceptance.</p>
                    <h3>3.2 Pricing and Payment</h3>
                    <ul className={styles.list}>
                        <li>Prices are listed in [your currency] and are subject to change.</li>
                        <li>We accept online payments through secure third-party payment gateways.</li>
                        <li>Your order will be processed only after successful payment.</li>
                    </ul>
                    <h3>3.3 Order Cancellation</h3>
                    <p>You may cancel an order before it is shipped. If already shipped, cancellations may not be possible.</p>

                    <h2>4. Shipping and Delivery</h2>
                    <p>We provide shipping services within specified locations. Estimated delivery times are displayed during checkout. We are not responsible for delays caused by third-party logistics providers.</p>

                    <h2>5. Returns and Refunds</h2>
                    <h3>5.1 Return Policy</h3>
                    <p>Returns are accepted within [X] days of delivery if the product is defective or incorrect. Prescription glasses cannot be returned unless they are incorrect or damaged upon arrival.</p>
                    <h3>5.2 Refund Policy</h3>
                    <p>Refunds are issued after product inspection. Refunds may take [X] business days to process.</p>

                    <h2>6. Eye Doctor Services</h2>
                    <p>Our eye doctor services are for general guidance and should not be considered a substitute for a full in-person eye exam. We are not responsible for misdiagnosis or incorrect prescriptions due to incomplete or inaccurate information provided by you.</p>

                    <h2>7. User Responsibilities</h2>
                    <p>By using our website, you agree:</p>
                    <ul className={styles.list}>
                        <li>Not to misuse our services.</li>
                        <li>Not to engage in fraudulent transactions.</li>
                        <li>To provide accurate prescription details for powered glasses.</li>
                    </ul>

                    <h2>8. Intellectual Property</h2>
                    <p>All content on this website, including logos, images, and text, is the property of SPECSAURA and cannot be copied or used without permission.</p>

                    <h2>9. Limitation of Liability</h2>
                    <p>We are not liable for any indirect, incidental, or consequential damages resulting from the use of our products or services. Our maximum liability is limited to the total purchase amount.</p>

                    <h2>10. Privacy Policy</h2>
                    <p>Your use of our website is also governed by our <a href="/privacy-policy">Privacy Policy</a>.</p>

                    <h2>11. Modifications to Terms</h2>
                    <p>We reserve the right to modify these Terms and Conditions at any time. The latest version will always be available on our website.</p>

                    <h2>12. Governing Law</h2>
                    <p>These Terms and Conditions are governed by the laws of [Your Country/State].</p>

                    <h2>13. Contact Us</h2>
                    <h4>Email: <span className={styles.email}>specsauraworks@gmail.com</span></h4>
                    <h4>Address: <span className={styles.address}>Shop no 30, Shardhadeep Complex, Near Laxmi Gathiya Rath, Opp. Anant Atila, Shastri nagar cross road, Ahmedabad, Gujarat, Pin code: 380063</span></h4>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
