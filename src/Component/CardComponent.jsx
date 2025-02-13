import React from 'react'
import styles from "../styles/CardComponent.module.css";
import { motion } from 'framer-motion';
export default function CardComponent({ src, name, price }) {
    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                <div className={styles.imageContainer}>
                    <img src={src} />
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: { staggerChildren: 0.3 } // Controls delay between children
                        }
                    }}
                    className={styles.sidebar}>
                    <motion.div
                        variants={{
                            hidden: { x: 50, opacity: 0 },
                            visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
                        }}
                        className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { x: 50, opacity: 0 },
                            visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
                        }}
                        className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { x: 50, opacity: 0 },
                            visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
                        }}
                        className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>                    </motion.div>

                </motion.div>
                <div className={styles.content}>
                    <h3>
                        {name}
                    </h3>
                    <h2>
                        {price}
                    </h2>
                </div>
            </div>
        </div>
    )
}
