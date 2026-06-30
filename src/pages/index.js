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
import { CategoryList, ProductList, getDisplayPrices } from '../store/authSlice';
import { IncreasePrice } from '../store/commonFunction';

export default function index() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const carouselRef = useRef(null);
    const collectionRef = useRef(null);
    const bestSellersRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Category, setCategory] = useState([])
    const [Procucts, setProducts] = useState([])
    const router = useRouter();

    const [collectionScroll, setCollectionScroll] = useState({ canScrollLeft: false, canScrollRight: true });
    const [bestSellersScroll, setBestSellersScroll] = useState({ canScrollLeft: false, canScrollRight: true });

    const updateScrollButtons = (ref, setState) => {
        if (ref.current) {
            const { scrollLeft, scrollWidth, clientWidth } = ref.current;
            setState({
                canScrollLeft: scrollLeft > 5,
                canScrollRight: scrollLeft + clientWidth < scrollWidth - 5
            });
        }
    };

    const scrollSection = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -240 : 240;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            updateScrollButtons(collectionRef, setCollectionScroll);
        }, 500);
        return () => clearTimeout(timer);
    }, [Category]);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateScrollButtons(bestSellersRef, setBestSellersScroll);
        }, 500);
        return () => clearTimeout(timer);
    }, [Procucts]);
    // useEffect(() => {
    //     ////////////console.log("Scroll", window.scrollY, carouselRef.current.offsetHeight)
    // }, [lastScrollY])
    const dispatch = useDispatch();





    const GetCategory = () => {
        dispatch(CategoryList()).then((res) => {
            ////////console.log("res", res.payload.items)
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
            ////////console.log("Error", error)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        ////////console.log("Products", Procucts)
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
        ////////////console.log("Current Slide Index:", eventKey);
        ////////////console.log("Slide Direction:", direction);
        setActiveSlide(eventKey)
    };

    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setActiveSlide(prevIndex => (prevIndex === 0 ? 1 : 0)); // Toggle between 0 and 1
    //     }, 5000);
    //     return () => clearTimeout(interval);
    // }, [activeSlide])

    const brandMap = [
        { img: "/Images/brand1.jpg", type: "Ascend Drip" },
        { img: "/Images/brand2.jpg", type: "Seraphic" },
        { img: "/Images/brand3.jpg", type: "Prium X" },
        { img: "/Images/brand4.jpg", type: "Halospecs" }
    ];

    const handleBrandClick = (type) => {
        router.push({
            pathname: '/category',
            query: { type }
        });
    };

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
                        <div className={styles.brandRow}>
                            {brandMap.map((brand, idx) => (
                                <div
                                    key={brand.type}
                                    className={styles.imageContainer}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleBrandClick(brand.type)}
                                >
                                    <img src={brand.img} alt={brand.type} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.collection}>
                    <h3>Our Collection</h3>

                    <div className={styles.carouselWrapper}>
                        {collectionScroll.canScrollLeft && (
                            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={() => scrollSection(collectionRef, 'left')} aria-label="Scroll left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}
                        <div 
                            className={styles.collectionContent} 
                            ref={collectionRef}
                            onScroll={() => updateScrollButtons(collectionRef, setCollectionScroll)}
                        >
                            {
                                Category?.map((item) => {
                                    return (
                                        <div key={item._id} className={styles.collectionCards}>
                                            <div className={styles.imageContainer} onClick={() => router.push(`/category/${item._id}`)}>
                                                <img src={item.url} alt={item.title} />
                                            </div>
                                            <h2>{item.title}</h2>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {collectionScroll.canScrollRight && (
                            <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={() => scrollSection(collectionRef, 'right')} aria-label="Scroll right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )}
                    </div>

                </div>
                <div className={styles.VideoSlider}>
                    <VideoCarousle />
                </div>
                <div className={styles.cardComponent}>
                    <div className={styles.heading}>
                        <h1>Our Best Sellers</h1>

                    </div>
                    <div className={styles.carouselWrapper}>
                        {bestSellersScroll.canScrollLeft && (
                            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={() => scrollSection(bestSellersRef, 'left')} aria-label="Scroll left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}
                        <div 
                            className={styles.cardInner} 
                            ref={bestSellersRef}
                            onScroll={() => updateScrollButtons(bestSellersRef, setBestSellersScroll)}
                        >
                            {Procucts.slice(0, 4).map((item) => {
                                const { mainPrice, originalPrice } = getDisplayPrices(item.price, item.crossPrice);
                                return (
                                    <CardComponent
                                        key={item._id}
                                        id={item._id}
                                        src={item.url}
                                        name={item.name}
                                        price={item.price}
                                        crossPrice={item.crossPrice}
                                        discount={item.discount}
                                        total={item.totalItems}
                                        available={item.availableItems}
                                        images={item.images}
                                    />
                                );
                            })}
                        </div>
                        {bestSellersScroll.canScrollRight && (
                            <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={() => scrollSection(bestSellersRef, 'right')} aria-label="Scroll right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className={styles.viewMoreSection}>
                        <button
                            className={styles.viewMoreButton}
                            onClick={() => router.push('/category')}
                        >
                            <span>View All Products</span>
                        </button>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}
