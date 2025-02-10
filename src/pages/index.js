import React from 'react'
import Header from '../Component/Header'
import styles from "../styles/landingpage.module.css"
import { useState, useEffect } from 'react';
import { CarouselDarkVariantExample } from '../Component/Test';
import { motion } from 'framer-motion';
import VideoCarousle from '../Component/VideoCarousle';
import { style } from 'framer-motion/client';



export default function index() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [activeSlide, setActiveSlide] = useState(0);
    const captionVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    }
    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > lastScrollY) {
                setIsHeaderVisible(true);
            } else {

                setIsHeaderVisible(false);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const handleSlideChange = (eventKey, direction) => {
        console.log("Current Slide Index:", eventKey);
        console.log("Slide Direction:", direction);
        setActiveSlide(eventKey)
    };

    useEffect(() => {
        const interval = setTimeout(() => {
            setActiveSlide(prevIndex => (prevIndex === 0 ? 1 : 0)); // Toggle between 0 and 1
        }, 5000);
        return () => clearTimeout(interval);
    }, [activeSlide])

    return (
        <div className={styles.main}>
            {<Header isHeaderVisible={isHeaderVisible} />}
            <div className={styles.inner}>

                <div>
                    <div className={styles.carousleComponent} >
                        <CarouselDarkVariantExample handleSlideChange={handleSlideChange} activeSlide={activeSlide} />
                        {activeSlide == 0 && <motion.div initial="hidden"

                            animate="visible"
                            exit="hidden"
                            variants={captionVariants} className={styles.componentContent}>
                            <h1>New Trend</h1>
                            <p>Sunglasses fashion translucent sunglasses star</p>
                            <button>Shop Now</button>
                        </motion.div>}
                        {activeSlide == 1 && <motion.div initial="hidden"

                            animate="visible"
                            exit="hidden"
                            variants={captionVariants} className={styles.componentContent}>
                            <h1>New Collection</h1>
                            <p>Best glasses for women's heart shaped faces</p>
                            <button>Shop Now</button>
                        </motion.div>}
                    </div>
                </div>
                <div className={styles.secondComponent}>
                    <div className={styles.logoComponent}>
                        <div className={styles.imageContainer}>
                            <img src="/Images/logo1.webp" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src="/Images/logo2.webp" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src="/Images/logo3.webp" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src="/Images/logo4.webp" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src="/Images/logo5.webp" />
                        </div>
                    </div>
                </div>
                <div className={styles.collection}>
                    <h3>Our Collection</h3>

                    <div className={styles.collectionContent}>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass.avif" />
                            </div>
                            <h2>Aviator glasses</h2>
                        </div>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass2.avif" />
                            </div>
                            <h2>
                                Round Glasses
                            </h2>
                        </div>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass3.avif" />
                            </div>
                            <h2>
                                Model Glasses
                            </h2>
                        </div>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass4.avif" />
                            </div>
                            <h2>
                                Cat-Eyes Glasses
                            </h2>
                        </div>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass5.avif" />
                            </div>
                            <h2>
                                Classic Glasses
                            </h2>
                        </div>
                        <div className={styles.collectionCards}>
                            <div className={styles.imageContainer}>
                                <img src="/Images/glass6.avif" />
                            </div>
                            <h2>
                                Panda Glassess
                            </h2>
                        </div>


                    </div>

                </div>
                <div className={styles.VideoSlider}>
                    <VideoCarousle />
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.left}>
                            <div className={styles.leftContent}>
                                <div className={styles.logo}>
                                    <img src='/Images/logo2 (1).png' />
                                </div>
                                <p>Sophisticated simplicity for the independent mind</p>
                                <div className={styles.icons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.container1}>
                                <h3>Help & Information</h3>
                                <ul>
                                    <li>Pagination</li>
                                    <li>Terms & Condition</li>
                                    <li>Contact</li>
                                    <li>Accesories</li>

                                </ul>
                            </div>
                            <div className={styles.container1}>
                                <h3>About Us</h3>
                                <ul>
                                    <li>Help Center</li>
                                    <li>Address Store</li>
                                    <li>Privacy Policy</li>
                                    <li>Reciver & Amplifire</li>

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
            </div>
        </div>
    )
}
