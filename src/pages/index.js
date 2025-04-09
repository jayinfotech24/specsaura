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
import { CategoryList, ProductList } from '../store/authSlice';
import { IncreasePrice } from '../store/commonFunction';

export default function index() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const carouselRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Category, setCategory] = useState([])
    const [Procucts, setProducts] = useState([])
    const router = useRouter();
    // useEffect(() => {
    //     ////console.log("Scroll", window.scrollY, carouselRef.current.offsetHeight)
    // }, [lastScrollY])
    const dispatch = useDispatch();





    const GetCategory = () => {
        dispatch(CategoryList()).then((res) => {
            //console.log("res", res.payload.items)
            setCategory(res.payload.items)

        })
    }

    const GetProduct = () => {
        setIsLoading(true)
        dispatch(ProductList()).then((res) => {
            console.log("resProduct", res.payload)
            if (res.payload.status == 200) {
                setProducts(res.payload.products)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.log("Error", error)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        console.log("Products", Procucts)
    }, [Procucts])
    useEffect(() => {
        GetCategory()
        GetProduct();
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
        ////console.log("Current Slide Index:", eventKey);
        ////console.log("Slide Direction:", direction);
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
                                        <div className={styles.imageContainer} onClick={() => router.push("/category/f")}>
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
                        {
                            Procucts.map((item) => {
                                return (<>

                                    <CardComponent id={item._id} src={item.url} name={item.name} price={IncreasePrice(Number(item.price))} total={item.totalItems} available={item.availableItems} images={item.images} />
                                </>
                                )

                            })
                        }



                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}
