import React, { useRef } from 'react'
import Header from '../Component/Header'
import styles from "../styles/landingpage.module.css"
import { useState, useEffect } from 'react';
import { CarouselDarkVariantExample } from '../Component/Test';
import { motion } from 'framer-motion';
import VideoCarousle from '../Component/VideoCarousle';
import { style } from 'framer-motion/client';
import CardComponent from '../Component/CardComponent';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import CustomCarousle from '../Component/CustomCarousle';
import Footer from '../Component/Footer';
import { useRouter } from 'next/router';
import Preloader from "../Component/Animated"
import { useDispatch } from 'react-redux';
import { CategoryList } from '../store/authSlice';
export default function index() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const carouselRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Category, setCategory] = useState([])
    const router = useRouter();
    // useEffect(() => {
    //     //console.log("Scroll", window.scrollY, carouselRef.current.offsetHeight)
    // }, [lastScrollY])
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])



    const GetCategory = () => {
        dispatch(CategoryList()).then((res) => {
            console.log("res", res.payload.items)
            setCategory(res.payload.items)

        })
    }

    useEffect(() => {
        GetCategory()
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (!carouselRef.current) return; // Ensure ref is assigned

            const carouselHeight = carouselRef.current.offsetHeight - 100; // Get carousel height

            if (window.scrollY > carouselHeight) {

                if (window.scrollY < carouselHeight) {
                    setIsHeaderVisible(false); // Hide on scroll down
                } else {
                    setIsHeaderVisible(true); // Show on scroll up
                }
            }
            else {
                setIsHeaderVisible(false);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleSlideChange = (eventKey, direction) => {
        //console.log("Current Slide Index:", eventKey);
        //console.log("Slide Direction:", direction);
        setActiveSlide(eventKey)
    };

    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setActiveSlide(prevIndex => (prevIndex === 0 ? 1 : 0)); // Toggle between 0 and 1
    //     }, 5000);
    //     return () => clearTimeout(interval);
    // }, [activeSlide])

    return (
        <div className={styles.main}>
            {
                isLoading && (
                    <Preloader />
                )

            }
            {<Header isHeaderVisible={isHeaderVisible} />}
            <div className={styles.inner}>

                <div ref={carouselRef}>
                    <div className={styles.carousleComponent} >


                        <CustomCarousle />



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

                        {
                            Category.map((item) => {
                                return (
                                    <div className={styles.collectionCards}>
                                        <div className={styles.imageContainer} onClick={() => router.push("//category/f")}>
                                            <img src={item.url} />
                                        </div>
                                        <h2>{item.title}</h2>
                                    </div>
                                )
                            })
                        }




                    </div>

                </div>
                <div className={styles.VideoSlider}>
                    <VideoCarousle />
                </div>
                <div className={styles.cardComponent}>
                    <div className={styles.heading}>
                        <h1>Our Best Seller</h1>
                    </div>
                    <div className={styles.cardInner}>

                        <CardComponent src={"/Images/Round-Glasses.webp"} name={"Round Glasses"} price={"$28.00"} />
                        <CardComponent src={"/Images/glasses2.webp"} name={"Rectangle SunGlasses"} price={"$59.00"} />
                        <CardComponent src={"/Images/glasses3.webp"} name={"Rectangle-SunGlasses-S"} price={"$15.00"} />
                        <CardComponent src={"/Images/glasses4.webp"} name={"Premium-SunGlasses-S"} price={"$20.00"} />

                    </div>
                </div>
                {/* <div className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.left}>
                            <div className={styles.leftContent}>
                                <div className={styles.logo}>
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
                </div> */}
                <Footer />
            </div>
        </div>
    )
}
