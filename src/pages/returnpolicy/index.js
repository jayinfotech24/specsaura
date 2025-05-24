import React from 'react';
import styles from "../../styles/returnpolicy.module.css";
import Header from "../../Component/Header";
import Footer from '../../Component/Footer';
import Link from 'next/link';

const ReturnPolicy = () => {
    return (
        <div className={styles.main}>
            <div className={styles.hero}>
                <Header isHeaderVisible={true} />
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Return & Exchange Policy</h1>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link> &gt; <span>Return & Exchange Policy</span>
                    </div>
                </div>
            </div>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1>Return & Exchange Policy</h1>
                    <h2>1. Eligibility for Returns & Exchange</h2>
                    <p>We accept returns & exchange under the following conditions:</p>
                    <ul className={styles.list}>
                        <li>The product is unused, in original condition, and with all original packaging and tags.</li>
                        <li>The Return/ Exchange request is made within 10 days of delivery for power eyeglass and power sunglass and within 2 days for Non power sunglass, Ready Blue cut spectacle and Contact lens.</li>
                    </ul>
                    <h2>2. Non-Returnable Products</h2>
                    <ul className={styles.list}>
                        <li>Contact lenses products - unless sealed and unused</li>
                        <li>Accessories unless it is defective or damaged during delivery.</li>
                        <li>Gift cards and promotional items</li>
                    </ul>
                    <h2>3. How to Initiate a Return/Exchange</h2>
                    <p>To initiate a return:</p>
                    <ul className={styles.list}>
                        <li>Email us at <span className={styles.email}>support@specsaura.com</span> within 10 days of receiving your power eyeglass and sunglass and 2 days of receiving your non power eyeglass, ready blue cut spectacle & contact lens.</li>
                        <li>Include your order number, reason for return, and clear images if the item is defective/damaged.</li>
                        <li>Our team will review and provide return instructions.</li>
                    </ul>
                    <h2>4. Refund Process</h2>
                    <ul className={styles.list}>
                        <li>Once we receive and inspect the returned item, we'll notify you of the approval or rejection of your refund.</li>
                        <li>Approved refunds will be processed to the original payment method within 7–10 business days.</li>
                    </ul>
                    <h2>5. Damaged or Incorrect Products</h2>
                    <ul className={styles.list}>
                        <li>If you receive a damaged or incorrect item, notify us within 48 hours of delivery with images.</li>
                        <li>We will replace the product at no extra cost or provide a refund upon return.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReturnPolicy;