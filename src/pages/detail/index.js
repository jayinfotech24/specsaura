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
import { GetUser } from '../../store/authSlice';

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


    // Check User
    const checkUserAuth = async () => {
        try {
            const response = await dispatch(GetUser()).unwrap();
            return response.status === 200;
        } catch (error) {
            if (error.response?.status === 401) {
                return false;
            }
            throw error;
        }
    };
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            GetProduct(id);
        }
    }, [id]);



    const AddInCart = async () => {


        try {
            setIsLoading(true);
            const userId = localStorage.getItem("userId");
            // const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
            // const specsData = JSON.parse(localStorage.getItem('specsData') || '{}');
            // const prescriptionId = localStorage.getItem("PrescriptionId")
            const responseObject = {
                userID: userId,
                productID: id,
                numberOfItems: 1,

                prescriptionID: null
            };

            const res = await dispatch(AddCart(responseObject)).unwrap();
            console.log("Res2", res)
            if (res.status === 200) {
                toast.success("Product added to cart successfully");
                // Clear the stored data
                localStorage.removeItem('selectedProduct');
                localStorage.removeItem('specsData');
                // Redirect to cart page
                router.push('/cart');
            } else if (res.status === 401) {
                toast.error("Please login to continue");
            } else {
                toast.error("Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add product to cart");
        } finally {
            setIsLoading(false);
        }


        // try {
        //     setIsLoading(true);
        //     const isAuthenticated = await checkUserAuth();

        //     if (!isAuthenticated) {
        //         toast.error("Please login to add items to cart");
        //         router.push("/login");
        //         return;
        //     }
        //     // Store the selected product in localStorage for the specs progress form
        //     localStorage.setItem('selectedProduct', JSON.stringify({
        //         id: id,
        //         name: Data.name,
        //         price: Data.price,
        //         image: Data.images?.[0] || Data.url || '/Images/placeholder.webp',
        //         url: Data.url || '/Images/placeholder.webp'
        //     }));

        //     // Redirect to specs progress form with a flag indicating it's for adding to cart
        //     router.push({
        //         pathname: '/specProgress',
        //         query: { action: 'addToCart' }
        //     });
        // } catch (error) {
        //     console.error("Error in Add to Cart:", error);
        //     toast.error("Failed to process your request. Please try again.");
        // } finally {
        //     setIsLoading(false);
        // }
    };



    const BuyNow = async () => {
        try {
            const isAuthenticated = await checkUserAuth();
            if (!isAuthenticated) {
                toast.error("Please login to continue");
                router.push("/login");
                return;
            }

            localStorage.setItem('selectedProduct', JSON.stringify({
                id: id,
                name: Data.name,
                price: Data.price,
                image: Data.images?.[0] || Data.url || '/Images/placeholder.webp',
                url: Data.url || '/Images/placeholder.webp'
            }));
            localStorage.setItem("productId", id);
            router.push("/specProgress")
        } catch (error) {
            console.error("Error in Buy Now:", error);
            toast.error("Something went wrong. Please try again.");
        }
    }
    const nextImage = () => {
        if (Data.images && Data.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Data.images.length);
            setData(prevData => ({
                ...prevData,
                url: Data.images[(currentImageIndex + 1) % Data.images.length]
            }));
        }
    };

    const prevImage = () => {
        if (Data.images && Data.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + Data.images.length) % Data.images.length);
            setData(prevData => ({
                ...prevData,
                url: Data.images[(currentImageIndex - 1 + Data.images.length) % Data.images.length]
            }));
        }
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
                                src={Data.images && Data.images.length > 0 ? Data.images[currentImageIndex] : Data.url || "/Images/placeholder.webp"}
                                alt={Data.name}
                                className={styles.mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        <div className={styles.imageControls}>
                            <button
                                className={styles.navButton}
                                onClick={prevImage}
                                disabled={!Data.images || Data.images.length <= 1}
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={nextImage}
                                disabled={!Data.images || Data.images.length <= 1}
                            >
                                <FaArrowRight />
                            </button>
                            <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
                                <FaExpand />
                            </button>
                        </div>

                        <div className={styles.imageCounter}>
                            {Data.images && Data.images.length > 0 ? `${currentImageIndex + 1} / ${Data.images.length}` : '1 / 1'}
                        </div>
                    </div>

                    {Data.images && Data.images.length > 0 && (
                        <div className={styles.thumbnails}>
                            {Data.images.map((img, index) => (
                                <motion.img
                                    key={index}
                                    src={img}
                                    alt={`${Data.name} - View ${index + 1}`}
                                    className={`${styles.thumbnail} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
                                    onClick={() => {
                                        setCurrentImageIndex(index);
                                        setData(prevData => ({
                                            ...prevData,
                                            url: img
                                        }));
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
                            <h2>{Math.floor(IncreasePrice(Number(Data.price)))} ₹</h2>
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
                            onClick={() => BuyNow()}
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
