import React from 'react'
import Header from '../Component/Header'
import styles from "../styles/landingpage.module.css"
import { useState, useEffect } from 'react';
import { CarouselDarkVariantExample } from '../Component/Test';
import { motion } from 'framer-motion';
import VideoCarousle from '../Component/VideoCarousle';



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
            </div>
        </div>
    )
}
