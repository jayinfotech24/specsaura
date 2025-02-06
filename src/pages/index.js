import React from 'react'
import Header from '../Component/Header'
import styles from "../styles/landingpage.module.css"
import { useState, useEffect } from 'react';
import { CarouselDarkVariantExample } from '../Component/Test';
import { motion } from 'framer-motion';
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

    return (
        <div className={styles.main}>
            {<Header isHeaderVisible={isHeaderVisible} />}
            <div className={styles.inner}>

                <div>
                    <div className={styles.carousleComponent} >
                        <CarouselDarkVariantExample handleSlideChange={handleSlideChange} />
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
            </div>
        </div>
    )
}
