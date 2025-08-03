import React, { useState } from "react";
import styles from "../styles/CardComponent.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AddCart, GetUser, getDisplayPrices } from "../store/authSlice";
import { toast } from "react-hot-toast";


export default function CardComponent({ id, src, name, price, crossPrice, discount }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const checkUserAuth = async () => {
        try {
            // First check if token exists
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please login to continue");
                router.push("/login");
                return false;
            }

            // Validate token through API
            const response = await dispatch(GetUser()).unwrap();
            return response.status === 200;
        } catch (error) {
            if (error.response?.status === 401) {
                // Clear invalid token
                localStorage.removeItem('token');
                toast.error("Session expired. Please login again");
                router.push("/login");
                return false;
            }
            throw error;
        }
    };





    ////////console.log("CCC" , crossPrice  , price)
    const AddTocart = async () => {
        try {
            // First check user authentication
            const isAuthenticated = await checkUserAuth();

            if (!isAuthenticated) {
                return;
            }

            // Store the selected product in localStorage for the specs progress form
            localStorage.setItem('selectedProduct', JSON.stringify({
                id: id,
                name: name,
                price: price,
                image: src,
                crossPrice: crossPrice !== undefined ? crossPrice : null
            }));

            // Redirect to specs progress form with a flag indicating it's for adding to cart
            router.push({
                pathname: '/specProgress',
                query: { action: 'addToCart' }
            });

        } catch (error) {
            console.error("Error checking authentication:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const GetDetail = async () => {
        try {
            // Check user authentication before redirecting
            // const isAuthenticated = await checkUserAuth();

            // if (!isAuthenticated) {
            //     return;
            // }

            // If authenticated, proceed with redirect
            router.push({
                pathname: "/detail",
                query: { id: id },
            });
        } catch (error) {
            console.error("Error checking authentication:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Use getDisplayPrices to determine which price to show
    const { mainPrice, originalPrice } = getDisplayPrices(price, crossPrice);
    //////console.log("OO" ,  originalPrice)
    return (
        <div className={styles.main} onClick={GetDetail}>
            <div className={styles.inner}>
                <div className={styles.imageContainer}>
                    <img src={src} alt="Product" />
                </div>

                {/* Sidebar with CSS animation */}
                {/* <div className={styles.sidebar}>
                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>

                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                        </svg>
                    </div>

                  
                </div> */}

                <div className={styles.content}>
                    <h3>{name}</h3>
                    <div className={styles.priceRow}>
                        <h2>{`₹ ${Math.round(mainPrice || 0)}`}</h2>
                        {originalPrice != null && (
                            <span className={styles.crossPrice}>₹ {Math.round(originalPrice)}</span>
                        )}
                        {discount !== 0 && discount != null && (
                            <span className={styles.discountBadge}>{discount}% OFF</span>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}
