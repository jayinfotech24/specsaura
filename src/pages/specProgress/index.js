import React, { useState } from 'react'
import styles from "../../styles/progress.module.css"
import ProgressHeader from '../../Component/ProgressHeader'
import { motion } from 'framer-motion';


export default function index() {

    const [firstStep, setFirstStep] = useState(true);
    const [secondStep, setSecondStep] = useState(false);
    const [thiredStep, setThiredStep] = useState(false);
    const [isOneComplete, setIsOneComplete] = useState(false);
    const [isTwoComplete, setIsTwoComplete] = useState(false);
    const [isThiredComplete, setIsThiredComplete] = useState(false)

    const Changepage = (number) => {
        if (number == 0) {
            setFirstStep(true)
            setSecondStep(false);
            setThiredStep(false)

        }
        if (number == 1) {
            setFirstStep(false)
            setSecondStep(true);
            setThiredStep(false)
            setIsOneComplete(true)
        }
        if (number == 2) {
            setFirstStep(false)
            setSecondStep(false);
            setThiredStep(true);
            setIsTwoComplete(true)
        }
        if (number == 3) {
            setIsThiredComplete(true)
        }
    }

    const FirstPage = () => {

        return (
            <motion.div
                className={styles.firstMain}
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >



                <div className={styles.firstInner}>
                    <h1>Select your Power Type</h1>
                    <div className={styles.firstCardContainer}>

                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/single_vision.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Single Vision

                                    </button>
                                    <p>For distance or near vision (Thin, anti-glare, blue-cut options)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/bifocal.webp" />
                            </div>
                            <div className={styles.right} onClick={() => Changepage(1)}>
                                <div className={styles.content}>
                                    <button>
                                        Bifocal/Progressive

                                    </button>
                                    <p>Bifocal and Progressives (For two powers in same lenses)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/zero_power.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Zero Power

                                    </button>
                                    <p>Block 98% of harmful rays (Anti-glare and blue-cut options)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/frame_only.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Frame Only

                                    </button>
                                    <p>Buy Only Frame</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>

                    </div>

                </div>
            </motion.div>
        )
    }
    const SecondPage = () => {
        return (
            <motion.div

                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.secondMain}>
                <div className={styles.secondInner}>
                    <h1>Choose Lens Package</h1>
                    <div className={styles.secondCardContainer}>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </motion.div>
        )
    }

    const ThiredPage = () => {
        return (
            <div className={styles.thiredMain}>
                <button onClick={() => Changepage(3)}>Submit3</button>
            </div>
        )
    }


    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                <ProgressHeader
                    Changepage={Changepage}
                    isOneComplete={isOneComplete}
                    isTwoComplete={isTwoComplete}
                    isThiredComplete={isThiredComplete}
                />
                {firstStep && <FirstPage />}
                {secondStep && <SecondPage />}
                {thiredStep && <ThiredPage />}
            </div>
        </div>
    )
}
