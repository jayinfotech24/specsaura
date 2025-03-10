import React from 'react'
import styles from "../styles/Footer.module.css"
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from 'next/router';
export default function Footer() {

    const router = useRouter()
    return (
        <div className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.left}>
                    <div className={styles.leftContent}>
                        <div className={styles.logo} onClick={() => router.push("/")}>
                            <img src='/Images/logo2 (1).png' />
                        </div>
                        <p>Sophisticated simplicity for the independent mind</p>
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

                            <li onClick={() => router.push("/terms_condition")}  >Terms & Condition</li>
                            <li onClick={() => router.push("/contact")}>Contact</li>
                            <li>Accesories</li>

                        </ul>
                    </div>
                    <div className={styles.container1}>
                        <h3>About Us</h3>
                        <ul>
                            <li>Help Center</li>
                            <li>Address Store</li>
                            <li onClick={() => router.push("/privacy_policy")}>Privacy Policy</li>


                        </ul>
                    </div>
                    <div className={styles.container1}>
                        <h3>
                            Categories</h3>
                        <ul>
                            <li>Women's Eyeglasses</li>
                            <li>Men's Eyeglasses</li>
                            <li>Ray Ban Eyeglasses</li>
                            <li>Designer Eyelasses</li>

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
