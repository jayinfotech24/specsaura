import React, { useState, useEffect } from "react";
import styles from "../styles/Custom.module.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { WallPaperList } from "../store/authSlice";
import { useRouter } from "next/router";

export default function CustomCarousle() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [Images, setImages] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
        const GetData = async () => {
            const res = await dispatch(WallPaperList());
            //////console.log("POster" , res)
            if (res.payload.status == 200) {
                setImages(res.payload.items);
            }
        };
        GetData();
    }, [dispatch]);

    useEffect(() => {
        if (Images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [Images]);

    // Variants for motion animation
    const captionVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };


    const handleRedirect = (type , value) => {
        if (type == "Collection") {
            router.push({
               pathname:`/category/${value}`
           })
        }   
        if (type == "Brands") {
            router.push({
                pathname: '/category',
                query: { type: value }
            });
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.inner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {Images.map((item, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img src={item.url} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Dynamic Caption */}
            {Images.length > 0 && (
                <motion.div
                    key={currentIndex}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={captionVariants}
                    className={styles.componentContent}
                >
                    <h1>{Images[currentIndex]?.title}</h1>
                    <p>{Images[currentIndex]?.description}</p>
                    <button onClick={()=>handleRedirect(Images[currentIndex]?.type , Images[currentIndex]?.navigation)}>Shop Now</button>
                </motion.div>
            )}

            {/* Navigation Buttons */}


            {/* Dots Navigation */}
            <div className={styles.dots}>
                {Images.map((_, index) => (
                    <span
                        key={index}
                        className={currentIndex === index ? styles.activeDot : styles.dot}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}
