import React, { useState } from "react";
import styles from "../styles/CardComponent.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AddCart, GetUser, getDisplayPrices } from "../store/authSlice";
import { toast } from "react-hot-toast";

export default function CardComponent({ id, src, name, price, crossPrice, discount, isBestSeller }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const checkUserAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please login to continue");
                router.push("/login");
                return false;
            }

            const response = await dispatch(GetUser()).unwrap();
            return response.status === 200;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                toast.error("Session expired. Please login again");
                router.push("/login");
                return false;
            }
            throw error;
        }
    };

    const AddTocart = async () => {
        try {
            const isAuthenticated = await checkUserAuth();

            if (!isAuthenticated) {
                return;
            }

            localStorage.setItem('selectedProduct', JSON.stringify({
                id: id,
                name: name,
                price: price,
                image: src,
                crossPrice: crossPrice !== undefined ? crossPrice : null
            }));

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
            router.push({
                pathname: "/detail",
                query: { id: id },
            });
        } catch (error) {
            console.error("Error checking authentication:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const { mainPrice, originalPrice } = getDisplayPrices(price, crossPrice);

    return (
        <div className={styles.main} onClick={GetDetail}>
            <div className={styles.inner}>
                <div className={styles.imageContainer}>
                    {isBestSeller && (
                        <div className={styles.bestSellerRibbon}>
                            <span>BEST SELLER</span>
                        </div>
                    )}
                    <img src={src} alt="Product" />
                </div>

                <div className={styles.content}>
                    <h3>{name}</h3>
                    <div className={styles.priceRow}>
                        <h2>{`₹${Math.round(mainPrice || 0)}`}</h2>
                        {originalPrice != null && originalPrice != mainPrice && (
                            <span className={styles.crossPrice}>₹{Math.round(originalPrice)}</span>
                        )}
                        {discount !== 0 && discount != null && (
                            <span className={styles.discountBadge}>
                                {Number(discount) === 50 ? "Buy 1 Get 1" : `${discount}% OFF`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
