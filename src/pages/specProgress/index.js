import React, { useEffect, useState } from 'react'
import styles from "../../styles/progress.module.css"
import ProgressHeader from '../../Component/ProgressHeader'
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Validate } from '../../store/commonFunction';
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FileUpload, SavePrescription, AddCart, GetUser, UpdateCart, GetLensType, GetLensDeatil, UpdateCartFlag, getDisplayPrices } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "@ramonak/react-progress-bar";
import Preloader from '../../Component/Animated';

export default function index() {

    const [firstStep, setFirstStep] = useState(true);
    const [secondStep, setSecondStep] = useState(false);
    const [thiredStep, setThiredStep] = useState(false);
    const [fourthStep, setFourtStep] = useState(false)
    const [isOneComplete, setIsOneComplete] = useState(false);
    const [isTwoComplete, setIsTwoComplete] = useState(false);
    const [isThiredComplete, setIsThiredComplete] = useState(false)
    const [isFourthComplete, setIsFourthComplete] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const inputRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFile, setIsFile] = useState(false)
    const router = useRouter();
    const [IsBifocel, setIsBifocal] = useState(false)
    const [IsSingle, setIsSingle] = useState(false)
    const [IsProgressive, setIsProgressive] = useState(false)
    const [progress, setProgress] = useState(0);
    const [IsLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const { action } = router.query;
    const [lensStep, setLensStep] = useState(false);
    const [selectedLens, setSelectedLens] = useState(null);
    const [isLensComplete, setIsLensComplete] = useState(false);
    const [lensTypeData, setLensTypeData] = useState(null);
    const [LensName, setLensName] = useState("")
    const [selectedCoatings, setSelectedCoatings] = useState({});
    const [coatingStep, setCoatingStep] = useState(false);
    const [selectedCoating, setSelectedCoating] = useState(null);
    const [isCoatingComplete, setIsCoatingComplete] = useState(false);

    useEffect(() => {
        Validate(router)
        // Load selected product from localStorage
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            const product = JSON.parse(storedProduct);
            setSelectedProduct(product);
            ////////console.log("Prod", product)
            if (product.crossPrice != null) {
                setTotalPrice(product.crossPrice);
            }
            else {
                setTotalPrice(product.price)
            }

        }
    }, [])
    const [Data, setData] = useState([])
    // Fallback lensTypes array for demonstration
    const GetData = () => {
        setIsLoading(true)
        dispatch(GetLensDeatil(LensName)).then((res) => {

            ////////console.log("Res", res)
            if (res.payload.status == 200) {
                setData(res.payload.lensTypes)
                setIsLoading(false)
            }
            setIsLoading(false)
        }).catch((error) => {
            ////////console.log("Error", error)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        if (LensName) {
            GetData();
        }
        // eslint-disable-next-line
    }, [LensName]);
    const Changepage = (number, IsFile) => {
        // Reset all steps
        setFirstStep(false);
        setLensStep(false);
        setCoatingStep(false);
        setSecondStep(false);
        setThiredStep(false);
        setFourtStep(false);

        // Reset all completion states
        setIsOneComplete(false);
        setIsLensComplete(false);
        setIsCoatingComplete(false);
        setIsTwoComplete(false);
        setIsThiredComplete(false);
        setIsFourthComplete(false);

        if (number == 0) {
            setFirstStep(true);
        }
        if (number == 1) {
            setLensStep(true);
            setIsOneComplete(true);
        }
        if (number == 2) {
            setCoatingStep(true);
            setIsOneComplete(true);
            setIsLensComplete(true);
        }
        if (number == 3) {
            setSecondStep(true);
            setIsOneComplete(true);
            setIsLensComplete(true);
            setIsCoatingComplete(true);
        }
        if (number == 4) {
            setThiredStep(true);
            setIsOneComplete(true);
            setIsLensComplete(true);
            setIsCoatingComplete(true);
            setIsTwoComplete(true);
        }
        if (number == 5) {
            setFourtStep(true);
            setIsOneComplete(true);
            setIsLensComplete(true);
            setIsCoatingComplete(true);
            setIsTwoComplete(true);
            setIsThiredComplete(true);
        }
    }


    useEffect(() => {
        ////////////console.log("Is", isFile)
    }, [isFile])



    const FirstPage = () => {
        const getLensType = async (type) => {
            try {
                setIsLoading(true);
                const response = await dispatch(GetLensType(type)).unwrap();
                ////////console.log("Response:", response);
                if (response.status == 200) {
                    setLensTypeData(response.data);
                    localStorage.setItem('lensTypeData', JSON.stringify(response.data));
                } else {
                    toast.error("Failed to get lens type data");
                }
            } catch (error) {
                console.error("Error getting lens type:", error);
                toast.error("Failed to get lens type data");
            } finally {
                setIsLoading(false);
            }
        };

        const powerTypes = [
            {
                title: "Single Vision",
                subtitle: "Positive, Negative or Cylindrical",
                image: "/Images/single_vision.webp",
                badge: "Most common",
                onClick: async () => {
                    setLensName("Single Vision")
                    setIsSingle(true);
                    setIsBifocal(false);
                    setIsProgressive(false);
                    Changepage(1);
                }
            },
            {
                title: "Bifocal",
                subtitle: "Two powers in one eye (Distance & Near)",
                image: "/Images/bifocal.webp",
                onClick: async () => {
                    setLensName("Bifocal")
                    setIsBifocal(true);
                    setIsSingle(false);
                    setIsProgressive(false);
                    Changepage(1);
                }
            },
            {
                title: "Progressive",
                subtitle: "Seamless vision for Distance, Intermediate & Near",
                image: "/Images/bifocal.webp",
                onClick: async () => {
                    setLensName("Progressive")
                    setIsProgressive(true);
                    setIsBifocal(false);
                    setIsSingle(false);
                    Changepage(1);
                }
            },
            {
                title: "Frame Only",
                subtitle: "With no lenses",
                image: "/Images/frame_only.webp",
                onClick: async () => {
                    setLensName("Frame Only")
                    await getLensType("frameOnly");
                    Changepage(5);
                }
            }
        ];
        return (
            <motion.div
                className={styles.firstMain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <button className={styles.backButton} onClick={() => router.push("/")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className={styles.firstInner}>
                    <motion.h1
                        style={{ fontSize: "18px" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Select your Power Type:
                    </motion.h1>
                    <div className={styles.powerTypeList}>
                        {powerTypes.map((card, index) => (
                            <motion.div
                                key={index}
                                className={styles.powerTypeCard}
                                onClick={card.onClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.powerTypeLeft}>
                                    <img src={card.image} alt={card.title} />
                                </div>
                                <div className={styles.powerTypeRight}>
                                    <div className={styles.powerTypeContent}>
                                        <div className={styles.powerTypeTitleRow}>
                                            <span className={styles.powerTypeTitle}>{card.title}</span>
                                            {card.badge && <span className={styles.powerTypeBadge}>{card.badge}</span>}
                                        </div>
                                        <span className={styles.powerTypeSubtitle}>{card.subtitle}</span>
                                    </div>
                                    <span className={styles.powerTypeArrow}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }
    const SecondPage = () => {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.secondMain}
            >
                <motion.button
                    className={styles.backButton}
                    onClick={() => Changepage(0)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                </motion.button>
                <div className={styles.secondInner}>
                    <motion.h1
                        style={{ fontSize: "15px" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Add Your Prescription
                    </motion.h1>
                    <div className={styles.OptionContainer}>
                        {[
                            {
                                icon: "upload",
                                title: "Upload File",
                                onClick: () => {
                                    setIsFile(true)
                                    Changepage(4)
                                }
                            },
                            {
                                icon: "pen",
                                title: "Enter Manually",
                                onClick: () => {
                                    setIsFile(false)
                                    Changepage(4)
                                }
                            }
                        ].map((option, index) => (
                            <motion.div
                                key={index}
                                className={styles.optionCard}
                                onClick={option.onClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {option.icon === "upload" ? (
                                        <>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" x2="12" y1="3" y2="15" />
                                        </>
                                    ) : (
                                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                    )}
                                </svg>
                                <h2>{option.title}</h2>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }

    const ThiredPage = () => {
        const handleAddToCart = async () => {
            try {
                setIsLoading(true);
                const userId = localStorage.getItem("userId");
                const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
                const specsData = JSON.parse(localStorage.getItem('specsData') || '{}');
                const prescriptionId = localStorage.getItem("PrescriptionId");
                const cartId = localStorage.getItem("cartId"); // Get cart ID from localStorage

                if (!cartId) {
                    toast.error("Cart ID not found");
                    return;
                }

                const responseObject = {
                    userID: userId,
                    productID: selectedProduct.id,
                    numberOfItems: 1,
                    specs: specsData,
                    prescriptionID: prescriptionId,
                    lensType: selectedLens && selectedLens._id ? selectedLens._id : null,
                    lensCoating: selectedCoating && selectedCoating._id ? selectedCoating._id : null,
                    isAllDataAdded: true // Add this flag to indicate prescription is added
                };

                const res = await dispatch(UpdateCart({ cartId, data: responseObject })).unwrap();
                ////////console.log("Update Cart Response:", res);

                if (res.status === 200) {
                    toast.success("Prescription added successfully");
                    // Clear the stored data
                    localStorage.removeItem('selectedProduct');
                    localStorage.removeItem('specsData');
                    localStorage.removeItem('cartId');
                    // Redirect to cart page
                    router.push('/cart');
                } else if (res.status === 401) {
                    toast.error("Please login to continue");
                    router.push("/login");
                } else {
                    toast.error("Failed to update cart");
                }
            } catch (error) {
                console.error("Error updating cart:", error);
                toast.error("Failed to update cart. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };


        const HandlePayment = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('userToken');
                if (!token) {
                    toast.error("Please login to continue");
                    router.push("/login");
                    return;
                }

                const response = await dispatch(GetUser()).unwrap();
                if (response.status !== 200) {
                    toast.error("Please login to continue");
                    router.push("/login");
                    return;
                }

                const userId = localStorage.getItem("userId");
                const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
                const specsData = JSON.parse(localStorage.getItem('specsData') || '{}');
                const prescriptionId = localStorage.getItem("PrescriptionId")
                const responseObject = {
                    userID: userId,
                    productID: selectedProduct.id,
                    numberOfItems: 1,
                    // specs: specsData,
                    prescriptionID: prescriptionId,
                    lensType: selectedLens && selectedLens._id ? selectedLens._id : null,
                    lensCoating: selectedCoating && selectedCoating._id ? selectedCoating._id : null,
                };

                ////////console.log("ResJson", responseObject)

                const res = await dispatch(AddCart(responseObject)).unwrap();
                ////////console.log("CartAdd", res)
                if (res.status == 200) {
                    toast.success("Product added to cart successfully");
                    localStorage.setItem("cartId", res.cart._id)

                    // Update cart flag before proceeding to payment
                    try {
                        await dispatch(UpdateCartFlag(res.cart._id)).unwrap();
                        ////////console.log("Cart flag updated successfully");
                    } catch (flagError) {
                        console.error("Error updating cart flag:", flagError);
                        // Continue with payment even if flag update fails
                    }

                    router.push('/order-details');
                } else if (res.status === 401) {
                    toast.error("Please login to continue");
                    router.push("/login");
                } else {
                    toast.error("Failed to add product to cart");

                }
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('userToken');
                    toast.error("Session expired. Please login again");
                    router.push("/login");
                    return;
                }
                console.error("Error adding to cart:", error);
                toast.error("Failed to add product to cart");
            } finally {
                setIsLoading(false);
            }
        }

        useEffect(() => {
            let productPrice = selectedProduct.crossPrice ? selectedProduct.crossPrice : selectedProduct.price;
            let lensPrice = selectedLens ? selectedLens.price : 0;
            let coatingPrice = selectedCoating ? selectedCoating.price : 0;
            setTotalPrice(productPrice + lensPrice + coatingPrice);
        }, [selectedProduct, selectedLens, selectedCoating]);

        let mainPrice = selectedProduct && selectedProduct.crossPrice
            ? selectedProduct?.crossPrice
            : selectedProduct?.price;
        let originalPrice = null;
        if (selectedProduct) {
            const prices = getDisplayPrices(selectedProduct.price, selectedProduct.crossPrice);
            mainPrice = prices.mainPrice;
            originalPrice = prices.originalPrice;
        }

        return (
            <motion.div
                className={styles.thiredMain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={styles.thiredInner}>
                    <motion.h1
                        style={{ fontSize: "15px" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Review Your Order
                    </motion.h1>

                    {selectedProduct && (
                        <div className={styles.orderSummary}>
                            <div className={styles.productDetails}>
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                                <div className={styles.productInfo}>
                                    <h2>{selectedProduct.name}</h2>
                                    <p>Base Price: ₹{mainPrice}</p>
                                    {originalPrice && (
                                        <span className={styles.crossPrice} style={{ marginLeft: 8, color: '#ff5252', textDecoration: 'line-through', fontWeight: 600, fontSize: '1rem', background: 'rgba(255,82,82,0.08)', padding: '2px 8px', borderRadius: 4 }}>
                                            ₹{originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.priceBreakdown}>
                                <h3>Price Breakdown</h3>
                                <div className={styles.priceItem}>
                                    <span>Base Frame</span>
                                    <span>₹{mainPrice}</span>
                                    {/* {originalPrice && (
                                        <span className={styles.crossPrice} style={{ marginLeft: 8, color: '#ff5252', textDecoration: 'line-through', fontWeight: 600, fontSize: '1rem', background: 'rgba(255,82,82,0.08)', padding: '2px 8px', borderRadius: 4 }}>
                                            ₹{originalPrice}
                                        </span>
                                    )} */}
                                </div>
                                {selectedLens && (
                                    <div className={styles.priceItem}>
                                        <span>Lens</span>
                                        <span>₹{selectedLens.price}</span>
                                    </div>
                                )}
                                {selectedCoating && (
                                    <div className={styles.priceItem}>
                                        <span>Coating</span>
                                        <span>₹{selectedCoating.price}</span>
                                    </div>
                                )}
                                <div className={styles.totalPrice}>
                                    <span>Total Amount</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>

                            <div className={styles.buttonContainer}>
                                {action === 'addToCart' ? (
                                    <button
                                        className={styles.proceedButton}
                                        onClick={handleAddToCart}
                                        disabled={IsLoading}
                                    >
                                        {IsLoading ? 'Adding to Cart...' : 'Add to Cart'}
                                    </button>
                                ) : (
                                    <button
                                        className={styles.proceedButton}
                                        onClick={() => HandlePayment()}
                                        disabled={IsLoading}
                                    >
                                        Proceed to Payment
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    const FourtPage = () => {
        const buttonRef = useRef(null)
        const [IsTwoPds, SetTwoPds] = useState(false)
        const [FileUrl, setFileUrl] = useState(null)

        const axisValues = Array.from({ length: 181 }, (_, i) => i.toString());
        const pdValues = Array.from({ length: (79 - 35) * 2 + 1 }, (_, i) => (35 + i * 0.5).toFixed(1));
        const powers = Array.from(
            { length: ((3.00 - 0.75) / 0.25 + 1) },
            (_, i) => `+${(0.75 + i * 0.25).toFixed(2)}`
        );

        const useIsMobile = () => {
            const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

            useEffect(() => {
                const handleResize = () => setIsMobile(window.innerWidth < 768);
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            }, []);

            return isMobile;
        };
        const isMobile = useIsMobile();

        ////////////console.log("Is", isMobile)
        const validationSchema = yup.object().shape({
            rightsph: yup.string().required("Right SPH is required"),
            rightcyl: yup.string().required("Right CYL is required"),
            rightaxis: yup.string().required("Right Axis is required"),
            leftsph: yup.string().required("Left SPH is required"),
            leftcyl: yup.string().required("Left CYL is required"),
            leftaxis: yup.string().required("Left Axis is required"),

            pd: (IsBifocel || IsSingle) && !IsTwoPds
                ? yup.string().required("Pupillary Distance is required")
                : yup.string().notRequired(),

            leftPd: (IsBifocel || IsSingle) && IsTwoPds
                ? yup.string().required("Left PD is required")
                : yup.string().notRequired(),

            rightPd: (IsBifocel || IsSingle) && IsTwoPds
                ? yup.string().required("Right PD is required")
                : yup.string().notRequired(),

            powers: IsBifocel
                ? yup.string().required("Power is required")
                : yup.string().notRequired()
        });


        const MobileValidationSchema = yup.object().shape({
            rightsph: yup.string().required("Right SPH is required"),
            rightcyl: yup.string().required("Right CYL is required"),
            rightaxis: yup.string().required("Right Axis is required"),
            leftsph: yup.string().required("Left SPH is required"),
            leftcyl: yup.string().required("Left CYL is required"),
            leftaxis: yup.string().required("Left Axis is required"),

            pd: (IsBifocel || IsSingle) && !IsTwoPds
                ? yup.string().required("Pupillary Distance is required")
                : yup.string().notRequired(),

            leftPd: (IsBifocel || IsSingle) && IsTwoPds
                ? yup.string().required("Left PD is required")
                : yup.string().notRequired(),

            rightPd: (IsBifocel || IsSingle) && IsTwoPds
                ? yup.string().required("Right PD is required")
                : yup.string().notRequired(),

            powers: IsBifocel
                ? yup.string().required("Power is required")
                : yup.string().notRequired()


        })




        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(isMobile ? MobileValidationSchema : validationSchema),
            defaultValues: {
                rightsph: "",
                rightcyl: "",
                rightaxis: "",
                leftsph: "",
                leftcyl: "",
                leftaxis: "",
                pd: "",
                leftPd: "",
                rightPd: "",
                powers: ""
            }
        });


        useEffect(() => {
            if (Object.keys(errors).length > 0) {
                setIsLoading(false); // Stop loader before showing alert
                alert("Please fill all details");
            }
        }, [errors])
        const SubmitHandler = async (data) => {
            try {
                setIsLoading(true);
                let responseObject;
                if (data?.pd) {
                    responseObject = {
                        rightEye: {
                            sphere: data.rightsph,
                            cylinder: data.rightcyl,
                            axis: data.axis,
                            add: data.powers,
                            pd: data.pd
                        },
                        leftEye: {
                            sphere: data.leftsph,
                            cylinder: data.leftcyl,
                            axis: data.leftaxis,
                            add: data.powers,
                            pd: data.pd
                        },
                        prescriptionURL: FileUrl
                    }
                } else {
                    responseObject = {
                        rightEye: {
                            sphere: data.rightsph,
                            cylinder: data.rightcyl,
                            axis: data.axis,
                            add: null,
                            pd: data.rightPd
                        },
                        leftEye: {
                            sphere: data.leftsph,
                            cylinder: data.leftcyl,
                            axis: data.leftaxis,
                            add: null,
                            pd: data.leftPd
                        },
                        prescriptionURL: FileUrl
                    }
                }

                const res = await dispatch(SavePrescription(responseObject)).unwrap();
                ////////console.log("ResSavePrescription", res);
                if (res.status == 200) {
                    ////////console.log("ResSavePrescription2", res);
                    localStorage.setItem("PrescriptionId", res.prescription._id)

                    toast.success("Details added successfully.");
                    setIsLoading(false);
                    Changepage(5);
                }
            } catch (error) {
                console.error("Error saving prescription:", error);
                toast.error("Failed to save prescription");
                setIsLoading(false);
            }
        }
        const handleClick = (e) => {
            // e.preventDefault()
            inputRef.current.click()
        }
        const handleFileChange = (event) => {
            const file = event.target.files[0];

            if (file) {
                setProgress(20); // Show initial progress
                setSelectedFile(file); // Set the selected file immediately

                const reader = new FileReader();
                reader.onloadstart = () => setProgress(50); // Midway progress when reading starts
                reader.onloadend = () => {
                    setProgress(100); // Complete progress
                    setTimeout(() => setProgress(0), 500); // Reset progress after completion
                };
                reader.readAsDataURL(file); // Read file for preview or processing
            }
        };

        const handleHiddenButtonClick = () => {
            // ////////////console.log("Hidden button clicked!");
            // alert("Hidden button was triggered!");
        };
        const handleUpload = (e) => {
            e.preventDefault()
            if (buttonRef.current) {
                //////////console.log("Triggering hidden button click..."); // Debugging log
                buttonRef.current.click();
            } else {
                console.error("buttonRef is undefined!"); // Debugging log
            }
        }
        const HandleSaveFile = (e) => {
            e.preventDefault()
            ////////console.log("Callssss")
            e.preventDefault();
            if (!selectedFile) {
                setIsLoading(false); // Stop loader before showing alert
                alert("Please upload a file before proceeding.");
                return;
            }

            setIsLoading(true);
            const formData = new FormData();
            const uniqueFilename = Date.now() + "-" + selectedFile.name;
            formData.append("file", selectedFile, uniqueFilename);

            dispatch(FileUpload(formData))
                .then((res) => {
                    if (res.payload && res.payload.fileUrl) {
                        setFileUrl(res.payload.fileUrl);
                        const responseObject = {
                            rightEye: {
                                sphere: null,
                                cylinder: null,
                                axis: null,
                                add: null,
                                pd: null
                            },
                            leftEye: {
                                sphere: null,
                                cylinder: null,
                                axis: null,
                                add: null,
                                pd: null
                            },
                            prescriptionURL: res.payload.fileUrl
                        };

                        return dispatch(SavePrescription(responseObject));
                    }
                })
                .then((res) => {
                    ////////console.log("R", res)
                    if (res && res.payload && res.payload.status == 200) {
                        ////////console.log("PPPPPPP2", res.payload.prescription._id)
                        localStorage.setItem("PrescriptionId", res.payload.prescription._id)
                        toast.success("Prescription added successfully!");
                        setIsLoading(false);
                        Changepage(5);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Failed to upload prescription");
                    setIsLoading(false);
                });
        };
        const handleCheckboxChange = (event) => {
            SetTwoPds(event.target.checked);
        }




        return (
            <div
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.forthMain}>
                <ToastContainer />

                {!isFile && <div style={{ marginTop: "70px" }} className={styles.forthInner}>
                    <button className={styles.backButton} onClick={() => Changepage(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                    </button>
                    <h1 style={{ fontSize: "15px", color: "#000" }}>Enter Your Prescription Manually</h1>

                    <div >
                        <form onSubmit={handleSubmit(SubmitHandler)}>



                            <button type='submit' display="none" ref={buttonRef} onClick={handleHiddenButtonClick}>

                            </button>
                            <input type="file" style={{ display: "none" }} ref={inputRef} />
                        </form>
                    </div>

                    <div className={styles.mobileFormContainer}>
                        <ToastContainer />
                        <div className={styles.row}>
                            <h2>OD(Right Eye)</h2>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <label>SPH</label>
                                    <select {...register("rightsph")}>
                                        <option value="" disabled >-- Select --</option> {/* Default option */}
                                        {[
                                            "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                            "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                            "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                            "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                            "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>CYL</label>
                                    <select {...register("rightcyl")}>
                                        <option value="" disabled >-- Select --</option> {/* Default option */}
                                        {[
                                            "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                            "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                            "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                            "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>AXIS</label>
                                    <select {...register("rightaxis")}>
                                        <option value="" disabled >-- Select --</option> {/* Default option */}
                                        {axisValues.map((value, index) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                        </div>
                        <div className={styles.row}>
                            <h2>OS (Left Eye)</h2>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <label>SPH</label>
                                    <select {...register("leftsph")}>
                                        <option value="" disabled >-- Select --</option> {/* Default option */}
                                        {[
                                            "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                            "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                            "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                            "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                            "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>CYL</label>
                                    <select {...register("leftcyl")}>
                                        <option value="" disabled >-- Select --</option>
                                        {[
                                            "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                            "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                            "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                            "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>AXIS</label>
                                    <select {...register("leftaxis")}>
                                        <option value="" disabled >-- Select --</option> {/* Default option */}
                                        {axisValues.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className={styles.devider}></div>
                        {(IsSingle || IsBifocel || IsProgressive) && <div className={styles.pupilDistance}>
                            <h2>Pupil Distance</h2>
                            <div className={styles.innerPupil}><input checked={IsTwoPds}
                                onChange={handleCheckboxChange} type="checkbox" /><span><p>Two PDs</p></span></div>
                            {
                                !IsTwoPds && <select {...register("pd")}>
                                    <option value="" disabled selected>-- Select --</option>
                                    {pdValues.map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            }

                            {IsTwoPds && (
                                <div style={{ width: "100%" }} className={styles.pdContainer}>
                                    <div className={styles.singlePd}>
                                        <label>Left</label>
                                        <select {...register("leftPd")}>
                                            <option value="" disabled >-- Select --</option>
                                            {pdValues.map((value, index) => (
                                                <option key={index} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.singlePd}>
                                        <label>Right</label>
                                        <select {...register("rightPd")}>
                                            <option value="" disabled >-- Select --</option>
                                            {pdValues.map((value, index) => (
                                                <option key={index} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            )}
                        </div>}

                        {IsBifocel &&
                            <div className={styles.pupilDistance}>
                                <h2>Additional Power</h2>
                                <select {...register("powers")}>
                                    <option value="" disabled >-- Select --</option>
                                    {powers.map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }

                    </div>
                    <div className={styles.buttonWrapper}>
                        <p>Upload your prescription for us to confirm that you have entered it correctly (Optional).</p>
                        <button type="button" onClick={(e) => handleClick(e)}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg></span>
                            Choose Files
                        </button>
                        <input style={{ display: "none" }} type='file' ref={inputRef} onChange={handleFileChange} />
                    </div>
                    <div className={styles.filenameContainer}>
                        {selectedFile && <p style={{ color: "#000", textAlign: "center" }}> {selectedFile.name}</p>}
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type='button' onClick={(e) => handleUpload(e)}>
                            Save and Continue
                        </button>
                    </div>

                </div>}
                {
                    isFile && (

                        <div className={styles.forthInner} style={{ height: "100vh", display: "flex", justifyContent: "start", flexDirection: "column", paddingTop: "20px", alignItems: "center" }}  >
                            <button className={styles.backButton} onClick={() => Changepage(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                            </button>
                            <h1 style={{ fontSize: "15px" }}>Upload Prescription</h1>
                            <p>Please upload your prescription as a PNG, JPG or PDF file.</p>
                            <form onSubmit={e => { e.preventDefault(); HandleSaveFile(e) }}>
                                <div className={styles.buttonWrapper}>

                                    <p>Upload your prescription for us to confirm that you have entered it correctly (Optional).</p>
                                    <button type="button" onClick={(e) => handleClick(e)} >
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg></span>
                                        Choose File
                                    </button>
                                    <div style={{ width: "100%" }}>

                                    </div>


                                    <input type='file' ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />
                                </div>
                                <div style={{ width: "100%", padding: "0px 40px", height: "10px" }}>
                                    <p style={{ color: "#000", textAlign: "center" }}> {selectedFile && selectedFile.fileName}</p>
                                </div>
                                {selectedFile && <p style={{ color: "#000", textAlign: "center" }}> {selectedFile.name}</p>}
                                <div className={styles.buttonContainer}>
                                    <button type='submit'>
                                        Save and Continue
                                    </button>
                                </div>
                            </form>
                        </div>

                    )
                }
            </div>
        )
    }

    // Lens Selection Page UI
    const LensSelectionPage = () => {
        const [activeTab, setActiveTab] = useState('Bestsellers');
        // Use lensTypeData if available, otherwise fallback to the provided array
        const lensList = Array.isArray(lensTypeData) && lensTypeData.length > 0 ? lensTypeData : Data;
        return (
            <motion.div
                className={styles.lensMain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {IsLoading && <Preloader />}
                <button className={styles.backButton} onClick={() => Changepage(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className={styles.lensInner}>
                    <motion.h1
                        style={{ fontSize: "15px" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Choose your Lens:
                    </motion.h1>
                    <div className={styles.lensCardContainer}>
                        {lensList.map((lens, idx) => (
                            <motion.div
                                key={lens._id}
                                className={styles.lensCard + (selectedLens && selectedLens._id === lens._id ? ' ' + styles.selectedLens : '')}
                                onClick={() => setSelectedLens(lens)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.lensRight}>
                                    <div className={styles.lensContent}>
                                        <h2>{lens.name}</h2>
                                        <ul>
                                            {lens.description.split(',').map((desc, i) => <li key={i}>{desc.trim()}</li>)}
                                        </ul>
                                        <span className={styles.lensWarranty}>{lens.warranty} Months Warranty</span>
                                    </div>
                                    <div className={styles.lensPrice}>
                                        ₹{lens.price}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className={styles.lensButtonContainer}>
                        <button
                            className={styles.proceedButton}
                            disabled={!selectedLens}
                            onClick={() => {
                                if (selectedLens) {
                                    setIsLensComplete(true);
                                    localStorage.setItem('selectedLens', JSON.stringify(selectedLens));
                                    Changepage(2);
                                }
                            }}
                        >
                            {selectedLens ? `Select "${selectedLens.name}" and Continue` : 'Select a Lens to Continue'}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    // NEW: Coating Selection Page
    const CoatingSelectionPage = () => {
        const lens = selectedLens ? selectedLens : (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('selectedLens')) : null);
        const coatings = lens && Array.isArray(lens.coatings) ? lens.coatings : [];
        // Sample icons for demo (could be replaced with SVGs or images)
        const icons = ["✨", "🛡️", "🌈", "💧", "🔆", "🦾", "👓"];
        React.useEffect(() => {
            if (coatings.length === 0) {
                setIsCoatingComplete(true);
                Changepage(3);
            }
            // eslint-disable-next-line
        }, [coatings]);
        return (
            <motion.div
                className={styles.lensMain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: "linear-gradient(135deg, #e6f0fa 0%, #f5f7fa 100%)", minHeight: '100vh', borderRadius: 18 }}
            >
                <button className={styles.backButton} onClick={() => Changepage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className={styles.lensInner}>
                    <motion.h1
                        style={{ fontSize: "20px", fontWeight: 700, background: "linear-gradient(90deg, #5855eb, #7a78f0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 24 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Select Your Coating
                    </motion.h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 24 }}>
                        {/* No Coating Option */}
                        <motion.div
                            className={styles.coatingCard + (!selectedCoating ? ' ' + styles.selectedCoating : '')}
                            onClick={() => setSelectedCoating(null)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
                            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(88,85,235,0.13)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{ minWidth: 240, maxWidth: 320, background: !selectedCoating ? 'linear-gradient(120deg, #e6f0fa 60%, #dbeafe 100%)' : '#fafbfc', border: !selectedCoating ? '2.5px solid #5855eb' : '2px solid #e0e0e0', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
                        >
                            <div style={{ fontSize: 32, marginRight: 18, marginBottom: 8, textAlign: 'center' }}>🚫</div>
                            <div className={styles.coatingInfo} style={{ flex: 1 }}>
                                <div className={styles.coatingTitle} style={{ fontSize: '1.08rem', fontWeight: 700 }}>No Coating</div>
                                <div className={styles.coatingDesc} style={{ fontSize: '0.97rem', color: '#5855eb', marginTop: 4 }}>Proceed without any coating</div>
                            </div>
                            {!selectedCoating && (
                                <span className={styles.checkmark} style={{ position: 'absolute', top: 10, right: 16, fontSize: 22, color: '#5855eb' }}>✔</span>
                            )}
                        </motion.div>
                        {coatings.map((coating, idx) => (
                            <motion.div
                                key={coating._id}
                                className={styles.coatingCard + (selectedCoating && selectedCoating._id === coating._id ? ' ' + styles.selectedCoating : '')}
                                onClick={() => setSelectedCoating(coating)}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + idx * 0.08, type: 'spring', stiffness: 180 }}
                                whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(88,85,235,0.13)" }}
                                whileTap={{ scale: 0.97 }}
                                style={{ minWidth: 240, maxWidth: 320, background: selectedCoating && selectedCoating._id === coating._id ? 'linear-gradient(120deg, #e6f0fa 60%, #dbeafe 100%)' : '#fafbfc', border: selectedCoating && selectedCoating._id === coating._id ? '2.5px solid #5855eb' : '2px solid #e0e0e0', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                <div style={{ fontSize: 32, marginRight: 18, marginBottom: 8, textAlign: 'center' }}>{icons[idx % icons.length]}</div>
                                <div className={styles.coatingInfo} style={{ flex: 1 }}>
                                    <div className={styles.coatingTitle} style={{ fontSize: '1.08rem', fontWeight: 700 }}>{coating.title}</div>
                                    <div style={{ fontWeight: 700, color: '#5855eb', fontSize: '1.1rem', margin: '4px 0 2px 0' }}>₹{coating.price}</div>
                                    <div className={styles.coatingDesc} style={{ fontSize: '0.97rem', color: '#5855eb', marginTop: 4 }}>{coating.description}</div>
                                </div>
                                {selectedCoating && selectedCoating._id === coating._id && (
                                    <span className={styles.checkmark} style={{ position: 'absolute', top: 10, right: 16, fontSize: 22, color: '#5855eb' }}>✔</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <div className={styles.lensButtonContainer} style={{ marginTop: 32 }}>
                        <button
                            className={styles.proceedButton}
                            // Allow continue if selectedCoating is null (No Coating) or a valid coating is selected
                            disabled={coatings.length > 0 && selectedCoating === undefined}
                            onClick={() => {
                                if (selectedCoating !== undefined) {
                                    if (selectedCoating) {
                                        localStorage.setItem('selectedCoating', JSON.stringify(selectedCoating));
                                    } else {
                                        localStorage.removeItem('selectedCoating');
                                    }
                                    setIsCoatingComplete(true);
                                    Changepage(3);
                                }
                            }}
                        >
                            {selectedCoating === null
                                ? 'Continue without Coating'
                                : selectedCoating
                                    ? `Select "${selectedCoating.title}" and Continue`
                                    : 'Select a Coating to Continue'}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className={styles.main}>
            {IsLoading && <Preloader />}
            <div className={styles.inner}>
                <ProgressHeader
                    Changepage={Changepage}
                    isOneComplete={isOneComplete}
                    isLensComplete={isLensComplete}
                    isCoatingComplete={isCoatingComplete}
                    isTwoComplete={isTwoComplete}
                    isThiredComplete={isThiredComplete}
                    isFourthComplete={isFourthComplete}
                />
                <AnimatePresence mode="wait">
                    {firstStep && <FirstPage key="first" />}
                    {lensStep && <LensSelectionPage key="lens" />}
                    {coatingStep && <CoatingSelectionPage key="coating" />}
                    {secondStep && <SecondPage key="second" />}
                    {thiredStep && <FourtPage key="third" />}
                    {fourthStep && <ThiredPage key="fourth" />}
                </AnimatePresence>
            </div>
        </div>
    )
}
