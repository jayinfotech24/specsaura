import React, { useState, useEffect } from "react";
import styles from "../styles/Custom.module.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { WallPaperList } from "../store/authSlice";
const images = ["/Images/poster.webp", "/Images/poster2.webp"];

export default function CustomCarousle() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const dispatch = useDispatch()
    const GetData = () => {

        dispatch(WallPaperList()).then((res) => {
            console.log("ResWallpper", res)
        })
    }


    useEffect(() => {
        GetData()
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : 1));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, []);
    const [activeSlide, setActiveSlide] = useState(0);
    const captionVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    }
    return (
        <div className={styles.main}>
            <div
                className={styles.inner}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            {currentIndex == 0 && <motion.div initial="hidden"

                animate="visible"
                exit="hidden"
                variants={captionVariants} className={styles.componentContent}>
                <h1>New Trend</h1>
                <p>Sunglasses fashion translucent sunglasses star</p>
                <button>Shop Now</button>
            </motion.div>}
            {currentIndex == 1 && <motion.div initial="hidden"

                animate="visible"
                exit="hidden"
                variants={captionVariants} className={styles.componentContent}>
                <h1>New Collection</h1>
                <p>Best glasses for women's heart shaped faces</p>
                <button>Shop Now</button>
            </motion.div>}
        </div>
    );
}
