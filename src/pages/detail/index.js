import React, { useEffect, useState } from 'react';
import styles from "../../styles/detail.module.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useRouter } from 'next/router';
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction';
import { useDispatch } from 'react-redux';
import { AddCart, getProductDetail, getDisplayPrices, GetGstRates, calculateGstPrice, isAccessoryCategory } from '../../store/authSlice';
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
    const [GstRates, setGstRates] = useState([])
    const [powerSunglassesOption, setPowerSunglassesOption] = useState(null);

    const GetProduct = (Id) => {
        setIsLoading(true);
        dispatch(getProductDetail(Id)).then((res) => {
            console.log("ResProduct", res)
            setData(res.payload.product);
            setIsLoading(false);
        }).catch((error) => {
            ////////console.log("Error", error);
            setIsLoading(false);
        });
    };




    useEffect(() => {
        console.log("Data", Data)
    }, [Data])
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
            const isAuthenticated = await checkUserAuth();

            if (!isAuthenticated) {
                toast.error("Please login to add items to cart");
                router.push("/login");
                return;
            }

            if (isAccessoryCategory(Data)) {
                const userId = localStorage.getItem("userId");
                const responseObject = {
                    userID: userId,
                    productID: id,
                    numberOfItems: 1,
                    prescriptionID: null,
                    powerSunglasses: powerSunglassesOption == "yes" ? true : false
                };
                console.log("Obb", responseObject);
                const res = await dispatch(AddCart(responseObject)).unwrap();
                console.log("Res2", res);
                if (res.status === 200) {
                    toast.success("Product added to cart successfully");
                    localStorage.removeItem('selectedProduct');
                    localStorage.removeItem('specsData');
                    router.push('/cart');
                } else if (res.status === 401) {
                    toast.error("Please login to continue");
                } else {
                    toast.error("Failed to add product to cart");
                }
            } else {
                localStorage.setItem('selectedProduct', JSON.stringify({
                    id: id,
                    name: Data.name,
                    price: Data.crossPrice != null ? Data.crossPrice : Data.price,
                    image: Data.images?.[0] || Data.url || '/Images/placeholder.webp',
                    url: Data.url || '/Images/placeholder.webp'
                }));
                router.push({
                    pathname: '/specProgress',
                    query: { action: 'addToCart' }
                });
            }
        } catch (error) {
            console.error("Error in Add to Cart:", error);
            toast.error("Failed to process your request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const BuyNow = async () => {
        //////console.log("Data", Data)
        try {
            const isAuthenticated = await checkUserAuth();
            if (!isAuthenticated) {
                toast.error("Please login to continue");
                router.push("/login");
                return;
            }

            if (isAccessoryCategory(Data)) {
                localStorage.setItem('selectedProduct', JSON.stringify({
                    id: id,
                    name: Data.name,
                    price: Data.crossPrice != null ? Data.crossPrice : Data.price,
                    image: Data.images?.[0] || Data.url || '/Images/placeholder.webp',
                    url: Data.url || '/Images/placeholder.webp',
                    powerSunglasses: powerSunglassesOption // <-- add value here
                }));
                localStorage.setItem('powerSunglassesOption', powerSunglassesOption);
                localStorage.setItem("productId", id);
                router.push({ pathname: "/order-details", query: { from: "accessoryDirect" } }); // Modified line

            } else {
                localStorage.setItem('selectedProduct', JSON.stringify({
                    id: id,
                    name: Data.name,
                    price: Data.crossPrice != null ? Data.crossPrice : Data.price,
                    image: Data.images?.[0] || Data.url || '/Images/placeholder.webp',
                    url: Data.url || '/Images/placeholder.webp',
                    powerSunglasses: powerSunglassesOption // <-- add value here
                }));
                localStorage.setItem('powerSunglassesOption', powerSunglassesOption);
                localStorage.setItem("productId", id);
                router.push("/specProgress")
            }
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

    const GetGstData = () => {
        dispatch(GetGstRates()).then((res) => {
            ////console.log("Res", res)
            if (res.payload.status == 200) {
                setGstRates(res.payload.items)
            }
        }).catch((err) => {
            consol.log("Err", err)
        })
    }


    useEffect(() => {
        GetGstData()
    }, [])

    // Small frames: 50-53mm
    // Medium frames: 54-56mm  
    // Large frames: 57-60mm
    // Extra Large: 61mm+

    const { mainPrice, originalPrice } = getDisplayPrices(Data?.price, Data?.crossPrice);

    // Calculate GST-inclusive price
    const gstType = Data?.category?.description?.toLowerCase();
    const gstInclusivePrice = calculateGstPrice(gstType, Data?.price || 0, GstRates);

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
                                src={Data?.images && Data?.images?.length > 0 ? Data?.images[currentImageIndex] : Data?.url || "/Images/placeholder.webp"}
                                alt={Data?.name}
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
                            <h2>{`₹ ${Math.round(mainPrice || 0)}`}</h2>
                            {originalPrice && originalPrice != mainPrice && (
                                <span className={styles.crossPrice}>₹ {Math.round(originalPrice)}</span>
                            )}

                            {Data.discount != 0 && Data.discount != null && (
                                <span className={styles.discountBadge}>{Data.discount}% OFF</span>
                            )}
                            <span className={styles.stockStatus}>
                                {Data.availableItems > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            {/* <div className={styles.gstPrice}>
                                <span>Price (incl. GST): </span>
                                <span>₹ {Math.round(gstInclusivePrice)}</span>
                            </div> */}
                        </div>
                    </div>

                    <div className={styles.productDetails}>
                        <div className={styles.detailSection}>
                            <h3>Product Details</h3>
                            <div className={styles.detailGrid}>
                                {Data.brandName && Data.brandName !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Brand:</span>
                                        <span className={styles.value}>{Data.brandName}</span>
                                    </div>
                                )}
                                {Data.modelNo && Data.modelNo !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Model No:</span>
                                        <span className={styles.value}>{Data.modelNo}</span>
                                    </div>
                                )}
                                {Data.frameMaterial && Data.frameMaterial !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Material:</span>
                                        <span className={styles.value}>{Data.frameMaterial}</span>
                                    </div>
                                )}
                                {Data.frameColor && Data.frameColor !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Color:</span>
                                        <span className={styles.value}>{Data.frameColor}</span>
                                    </div>
                                )}
                                {Data.templeColor && Data.templeColor !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Temple Color:</span>
                                        <span className={styles.value}>{Data.templeColor}</span>
                                    </div>
                                )}
                                {Data.lensColor && Data.lensColor !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Lens Color:</span>
                                        <span className={styles.value}>{Data.lensColor}</span>
                                    </div>
                                )}
                                {Data.lens && Data.lens !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Lens Type:</span>
                                        <span className={styles.value}>{Data.lens}</span>
                                    </div>
                                )}
                                {Data.gender && Data.gender !== 'Unisex' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Gender:</span>
                                        <span className={styles.value}>{Data.gender}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.detailSection}>
                            <h3>Frame Dimensions</h3>
                            <div className={styles.detailGrid}>
                                {Data.frameWidth && Data.frameWidth !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Width:</span>
                                        <span className={styles.value}>{Data.frameWidth ? `${Data.frameWidth}mm` : ''}</span>
                                    </div>
                                )}
                                {Data.frameHeight && Data.frameHeight !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Height:</span>
                                        <span className={styles.value}>{Data.frameHeight ? `${Data.frameHeight}mm` : ''}</span>
                                    </div>
                                )}
                                {Data.frameDimention && Data.frameDimention !== 'Not specified' && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Dimensions:</span>
                                        <span className={styles.value}>{Data.frameDimention}</span>
                                    </div>
                                )}
                                {Data.frameWidth && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Frame Size:</span>
                                        <span className={styles.value}>
                                            {Data.frameWidth <= 53 ? 'Small' :
                                                Data.frameWidth <= 56 ? 'Medium' :
                                                    Data.frameWidth <= 60 ? 'Large' : 'Extra Large'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Power Sunglasses Option */}
                        {Data.powerSunglasses && (
                            <div className={styles.powerSunglassesSection}>
                                <label className={styles.powerSunglassesLabel}>Power Sunglasses:</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="powerSunglasses"
                                            value="yes"
                                            checked={powerSunglassesOption === "yes"}
                                            onChange={() => setPowerSunglassesOption("yes")}
                                        />
                                        Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="powerSunglasses"
                                            value="no"
                                            checked={powerSunglassesOption === "no"}
                                            onChange={() => setPowerSunglassesOption("no")}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        )}


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
