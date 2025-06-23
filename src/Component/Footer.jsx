import React from 'react'
import styles from "../styles/Footer.module.css"
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from 'next/router';


export default function Footer() {
    const router = useRouter()

    const handleAddressClick = () => {
        const address = "Shop no 30, Shardhadeep Complex, Near Laxmi Gathiya Rath, Opp. Anant Atila, Shastri nagar cross road, Ahmedabad, Gujarat, Pin code: 380063";
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }

    const handleGenderClick = (gender) => {
    const categoryId = router.query.categoryId || "67ec193b4c7e05897cf5586e";

    router.push({
        pathname: `/category/${categoryId}`,
        query: { gender }
    });
};



    return (
        <div className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.left}>
                    <div className={styles.leftContent}>
                        <div className={styles.logo} onClick={() => router.push("/")}>
                            <img src='/Images/logo2 (1).png' />
                        </div>
                        <p>Enhancing your vision with lenses that define your lifestyle.</p>
                        <div className={styles.icons}>
                            <FaXTwitter width={24} height={24} />
                            <FaInstagram />
                            <FaFacebookF />
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.container1}>
                        <h3>Help & Information</h3>
                        <ul>
                            <li onClick={() => router.push("/terms_condition")}>Terms & Condition</li>
                            <li onClick={() => router.push("/contact")}>Contact</li>
                            <li onClick={() => router.push("/returnpolicy")}>Return Policy</li>
                        </ul>
                    </div>
                    <div className={styles.container1}>
                        <h3>About Us</h3>
                        <ul>
                            <li onClick={() => router.push("/help-center")}>Help Center</li>
                            <li onClick={handleAddressClick} style={{ cursor: 'pointer' }}>Address Store</li>
                            <li onClick={() => router.push("/privacy_policy")}>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className={styles.container1}>
                        <h3>Categories</h3>
                        <ul>
                            <li onClick={() => handleGenderClick('Female')} style={{ cursor: 'pointer' }}>Women's Eyeglasses</li>
                            <li onClick={() => handleGenderClick('Male')} style={{ cursor: 'pointer' }}>Men's Eyeglasses</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
