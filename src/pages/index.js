import React from 'react'
import Header from '../Component/Header'
import styles from "../styles/landingpage.module.css"
import { useState, useEffect } from 'react';
export default function index() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > lastScrollY) {
                setIsHeaderVisible(true);
            } else {

                setIsHeaderVisible(false);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={styles.main}>
            {<Header isHeaderVisible={isHeaderVisible} />}
            <div className={styles.inner}>
                <div className={styles.posterComponent}>
                    <div className={styles.componentContent}>
                        <h1>New Trend</h1>
                        <p>Sunglasses fashion translucent sunglasses star</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
