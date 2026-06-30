'use client'
import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/videoContainer.module.css";
import dynamic from "next/dynamic";


const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoCarousle() {
    const scrollerRef = useRef(null);
    const [videoScroll, setVideoScroll] = useState({ canScrollLeft: false, canScrollRight: true });

    const updateScroll = () => {
        if (scrollerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
            setVideoScroll({
                canScrollLeft: scrollLeft > 5,
                canScrollRight: scrollLeft + clientWidth < scrollWidth - 5
            });
        }
    };

    const scroll = (direction) => {
        if (scrollerRef.current) {
            const scrollAmount = direction === "left" ? -240 : 240;
            scrollerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const timer = setTimeout(updateScroll, 500);
        window.addEventListener('resize', updateScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateScroll);
        };
    }, []);

    return (
        <div className={styles.carouselWrapper}>
            {videoScroll.canScrollLeft && (
                <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={() => scroll('left')} aria-label="Scroll left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}
            <div className={styles.main}>
                <div className={styles.scroller} ref={scrollerRef} onScroll={updateScroll}>
                    <div className={styles.inner}>


                        <div className={styles.cards}>
                            <ReactPlayer
                                url="/video/add1.mp4"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                height="100%"
                                width="100%"
                            />
                        </div>
                        <div className={styles.cards}>
                            <ReactPlayer
                                url="/video/add2.mp4"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                height="100%"
                                width="100%"

                            />
                        </div>
                        <div className={styles.cards}>
                            <ReactPlayer
                                url="/video/add1.mp4"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                height="100%"
                                width="100%"

                            />
                        </div>
                        <div className={styles.cards}>
                            <ReactPlayer
                                url="/video/add2.mp4"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                height="100%"
                                width="100%"


                            />
                        </div>
                        <div className={styles.cards}>
                            <ReactPlayer
                                url="/video/add1.mp4"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                height="100%"
                                width="100%"

                            />
                        </div>



                    </div>
                </div>
            </div>
            {videoScroll.canScrollRight && (
                <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={() => scroll('right')} aria-label="Scroll right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}
