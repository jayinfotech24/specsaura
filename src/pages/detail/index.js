import React, { useEffect, useState } from 'react';
import styles from "../../styles/detail.module.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useRouter } from 'next/router';
import { Validate } from '../../store/commonFunction';

export default function Index() {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "/Images/glasses2.webp",
        "/Images/glasses3.webp",
        "/Images/glasses4.webp"
    ];

    useEffect(() => {
        Validate(router);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.left}>
                    <img src={images[currentImageIndex]} alt="Product" className={styles.mainImage} />

                    {/* Thumbnails */}
                    <div className={styles.thumbnails}>
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className={index === currentImageIndex ? styles.activeThumbnail : styles.thumbnail}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.headerContent}>
                        <h1>Square Prescription Eyeglass Frames</h1>
                        <h2>$136.00 USD</h2>
                        <div className={styles.border}></div>
                    </div>
                    <p>Black Transparent UV Protection Classic sunglasses combine usefulness with the design...</p>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.cart} onClick={() => router.push("/cart")}>Add To Cart</button>
                        <button className={styles.buy} onClick={() => router.push("/cart")}>Buy It now</button>
                    </div>
                    <div className={styles.border}></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
