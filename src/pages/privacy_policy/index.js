import React from 'react'
import styles from "../../styles/privacy_policy.module.css"
import Header from "../../Component/Header"
import Footer from '../../Component/Footer'
export default function index() {
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1>Privacy Policy</h1>
                    <p>Welcome to SPECSAURA! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website , purchase products, or use our services.</p>
                    <h2>1. Information We Collect</h2>
                    <p>
                        When you make a purchase or use our services, we may collect:</p>
                    <h3>1.1 Personal Information</h3>
                    <p>When you make a purchase or use our services, we may collect:</p>
                    <ul className={styles.list}>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Shipping and billing address</li>
                        <li>Payment details (processed securely via third-party payment processors)</li>
                    </ul>
                    <h3>1.2 Health Information</h3>
                    <p>If you use our eye doctor services or order powered glasses, we may collect:</p>
                    <ul className={styles.list}>
                        <li>Prescription details</li>
                        <li>Eye health-related information (if provided by you)</li>

                    </ul>
                    <h3>1.3 Automatically Collected Information</h3>
                    <p>When you visit our website, we may automatically collect:</p>
                    <ul className={styles.list}>
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Cookies and usage data</li>

                    </ul>
                    <h2>2. How We Use Your Information</h2>
                    <p>We use your information for:</p>
                    <ul className={styles.list}>
                        <li>Processing orders and payments</li>
                        <li>Providing customer support</li>
                        <li>Personalizing your shopping experience</li>
                        <li>Offering eye doctor services</li>
                        <li>Sending updates, promotions, and marketing communications (you can opt out anytime)</li>
                        <li>Improving our website and services</li>
                    </ul>
                    <h2>3. Sharing Your Information</h2>
                    <p>We do not sell or rent your personal data. However, we may share your information with:</p>
                    <ul className={styles.list}>
                        <li>Payment Processors (to process transactions securely)</li>
                        <li>Shipping Partners (to deliver your orders)</li>
                        <li>Healthcare Professionals (if you use our eye doctor services)</li>
                        <li>Legal Authorities (if required by law)</li>

                    </ul>
                    <h2>4. Cookies and Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to improve your browsing experience. You can manage cookie preferences through your browser settings.</p>
                    <h2>5. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
                    <h2>6. Your Rights</h2>
                    <p>Depending on your location, you may have rights to:</p>
                    <ul className={styles.list}>
                        <li>Access, update, or delete your data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Personalizing your shopping experience</li>
                        <li>Request a copy of your stored information</li>

                    </ul>
                    <p>To exercise your rights, contact us at  <span>specsauraworks@gmail.com</span>.</p>
                    <h2>7. Third-Party Links</h2>
                    <p>Our website may contain links to third-party sites. We are not responsible for their privacy policies.</p>
                    <h2>8. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. The latest version will always be available on our website.</p>
                    <h2>9. Contact Us</h2>
                    <p>For any questions about this Privacy Policy, contact us at:</p>
                    <h4>Email: <span className={styles.email}>specsauraworks@gmail.com</span></h4>
                    <h4>Address: <span className={styles.address}>Shop no 30,  Shardhadeep Complex, Near Laxmi Gathiya Rath, Opp. Anant Atila,
                        Shastri nagar cross road.  Ahmedabad ,
                        Gujarat.
                        Pin code : 380063
                    </span></h4>
                </div>
            </div>
            <Footer />
        </div>
    )
}
