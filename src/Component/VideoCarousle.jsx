'use client'
import React from "react";
import styles from "../styles/videoContainer.module.css";
import dynamic from "next/dynamic";


const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoCarousle() {
    return (
        <div className={styles.main}>
            <div className={styles.scroller}>
                <div className={styles.inner}>
                    {[...Array(2)].map((_, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add1.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add2.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add1.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add2.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add1.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                            <div className={styles.cards}>
                                <ReactPlayer
                                    url="/video/add2.mp4"
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    height="320px"
                                    width="200px"
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
