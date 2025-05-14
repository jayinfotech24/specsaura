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

    const handleCategoryClick = (gender) => {
        router.push(`/category/f?gender=${gender}`);
    }

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
                            <li>Accesories</li>
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
                            <li onClick={() => handleCategoryClick('women')} style={{ cursor: 'pointer' }}>Women's Eyeglasses</li>
                            <li onClick={() => handleCategoryClick('men')} style={{ cursor: 'pointer' }}>Men's Eyeglasses</li>
                            {/* <li onClick={() => handleCategoryClick('rayban')} style={{ cursor: 'pointer' }}>Ray Ban Eyeglasses</li> */}
                            {/* <li onClick={() => handleCategoryClick('designer')} style={{ cursor: 'pointer' }}>Designer Eyelasses</li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
