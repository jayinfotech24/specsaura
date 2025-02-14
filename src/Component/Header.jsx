import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from "../styles/Header.module.css"
import Hamburger from 'hamburger-react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Header({ isHeaderVisible }) {

    const [IsSet, SetISSet] = useState(0)
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        console.log("OPen", isOpen)
    }, [isOpen])
    return (
        <div className={isHeaderVisible ? styles.visible : styles.main}>

            <div className={styles.humburger}>

                <Hamburger toggled={isOpen} toggle={setOpen} />
                {/* <div className={styles.logoMobile}>
                    <img src="/Images/logo2 (1).png" />
                </div>
                <div className={styles.mobileIcons}>
                    <ul>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></li>



                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg><div className={styles.dot}></div></li>

                    </ul>
                </div> */}
            </div>
            <AnimatePresence >
                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`${styles.manubar} ${isOpen ? styles.open : ''}`}>
                            <div className={styles.buttonContainer}>
                                <button className={styles.first} onClick={() => setOpen(false)}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents"><path d="M16 12H3" /><path d="M16 18H3" /><path d="M16 6H3" /><path d="M21 12h.01" /><path d="M21 18h.01" /><path d="M21 6h.01" /></svg>
                                    </span>
                                    Manu
                                </button>
                                <button className={styles.second}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                    </span>
                                    Login
                                </button>
                            </div>
                            <ul className={styles.manuList}>
                                <li>Home</li>
                                <li>Shop</li>
                                <li>Featured</li>
                                <li>Pages</li>
                                <li>Blogs</li>
                            </ul>
                        </motion.div>
                    )

                }
            </AnimatePresence>


            <div className={styles.inner}>
                <div className={styles.logo}>
                    <img src="/Images/logo2 (1).png" />
                </div>

                <div className={styles.menuitems}>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>Featured</li>
                        <li>Pages</li>
                        <li>Blogs</li>
                    </ul>

                </div>
                <div className={styles.icons}>
                    <ul>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></li>


                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg></li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg></li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg><div className={styles.dot}></div></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
