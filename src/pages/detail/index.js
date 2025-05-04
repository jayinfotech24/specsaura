import React, { useEffect, useState } from 'react';
import styles from "../../styles/detail.module.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useRouter } from 'next/router';
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction';
import { useDispatch } from 'react-redux';
import { AddCart, getProductDetail } from '../../store/authSlice';
import Preloader from '../../Component/Animated';
import { ToastContainer, toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaShoppingBag, FaExpand } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index() {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const dispatch = useDispatch();

    const GetProduct = (Id) => {
        setIsLoading(true);
        dispatch(getProductDetail(Id)).then((res) => {
            console.log("Res", res)
            setData(res.payload.product);
            setIsLoading(false);
        }).catch((error) => {
            console.log("Error", error);
            setIsLoading(false);
        });
    };

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            GetProduct(id);
        }
    }, [id]);

    const BuyNow = async () => {
        const userId = localStorage.getItem("userId");
        const responseObject = {
            userID: userId,
            productID: id,
            numberOfItems: 1,
        };

        dispatch(AddCart(responseObject)).then(async (res) => {
            console.log("Res", res)
            if (Data.availableItems > 0) {
                if (res.payload.status == 200) {
                    setIsLoading(false);

                    const sendingAmount = Math.abs(Data.price);

                    // Redirect to order details page with the amount
                    router.push({
                        pathname: '/order-details',
                        query: { amount: sendingAmount }
                    });
                }
            }
        }).catch((error) => {
            setIsLoading(false);
            console.log("Error", error);
        });
    };

    const AddInCart = () => {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const responseObject = {
            userID: userId,
            productID: id,
            numberOfItems: 1,
        };

        dispatch(AddCart(responseObject)).then((res) => {
            if (Data.availableItems > 0) {
                if (res.payload.status == 200) {
                    setIsLoading(false);
                    toast.success("Product added successfully");
                }
                if (res.payload.status == 401) {
                    toast.error("Please login to continue");
                }
            } else {
                toast.error("Item is out of stock");
            }
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log("Error", error);
        });
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (Data.images?.length || 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (Data.images?.length || 1)) % (Data.images?.length || 1));
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className={styles.main}>
            {isLoading && <Preloader />}
            <ToastContainer />
            <Header isHeaderVisible={true} />

            <div className={styles.inner}>
                <motion.div
                    className={styles.left}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={`${styles.imageContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={Data.url || "/Images/placeholder.webp"}
                                alt={Data.name}
                                className={styles.mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        <div className={styles.imageControls}>
                            <button className={styles.navButton} onClick={prevImage}>
                                <FaArrowLeft />
                            </button>
                            <button className={styles.navButton} onClick={nextImage}>
                                <FaArrowRight />
                            </button>
                            <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
                                <FaExpand />
                            </button>
                        </div>

                        <div className={styles.imageCounter}>
                            {currentImageIndex + 1} / {(Data.images?.length || 1)}
                        </div>
                    </div>

                    {Data.images && (
                        <div className={styles.thumbnails}>
                            {Data.images.map((img, index) => (
                                <motion.img
                                    key={index}
                                    src={img}
                                    alt={`${Data.name} - View ${index + 1}`}
                                    className={styles.thumbnail}
                                    onClick={() => {
                                        const selectedImage = Data.images[index];
                                        setData(prevData => ({
                                            ...prevData,
                                            url: selectedImage
                                        }));
                                        setCurrentImageIndex(index);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div
                    className={styles.right}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.headerContent}>
                        <h1>{Data.name}</h1>
                        <div className={styles.priceContainer}>
                            <h2>{`${IncreasePrice(Number(Data.price))} ₹`}</h2>
                            <span className={styles.stockStatus}>
                                {Data.availableItems > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div className={styles.productDetails}>
                        <div className={styles.detailSection}>
                            <h3>Product Details</h3>
                            <div className={styles.detailGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Frame Material:</span>
                                    <span className={styles.value}>{Data.frameMaterial || 'Not specified'}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Frame Color:</span>
                                    <span className={styles.value}>{Data.frameColor || 'Not specified'}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Lens Color:</span>
                                    <span className={styles.value}>{Data.lensColor || 'Not specified'}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Gender:</span>
                                    <span className={styles.value}>{Data.gender || 'Unisex'}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.descriptionSection}>
                            <h3>Description</h3>
                            <p>{Data.description}</p>
                        </div>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button
                            className={styles.cart}
                            onClick={AddInCart}
                            disabled={Data.availableItems <= 0}
                        >
                            <FaShoppingCart /> Add To Cart
                        </button>
                        <button
                            className={styles.buy}
                            onClick={BuyNow}
                            disabled={Data.availableItems <= 0}
                        >
                            <FaShoppingBag /> Buy Now
                        </button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
