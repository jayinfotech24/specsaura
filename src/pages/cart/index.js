import React from 'react'
import styles from "../../styles/cart.module.css"
import Header from "../../Component/Header"
import Footer from "../../Component/Footer"
export default function index() {
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.poster}>
                    <img src='/Images/cart_bg.webp' />
                    <div className={styles.posterContent}>
                        <h1>Cart</h1>
                    </div>
                </div>
                <div className={styles.listContainer}>
                    <table>
                        <thead>
                            <tr>
                                <td>Product name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Total</td>
                                <td></td>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={styles.product}>
                                        <img src="/Images/glass2.avif" />
                                        <div className={styles.productContent}>
                                            <h2>Square Glass S</h2>
                                            <p>S/Black</p>
                                        </div>

                                    </div>

                                </td>
                                <td>
                                    <p>Price</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <p>Quantity</p>
                                    <div className={styles.quantity}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        <h2>1</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14" /></svg>
                                    </div>


                                </td>
                                <td>
                                    <p>Total</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.product}>
                                        <img src="/Images/glass3.avif" />
                                        <div className={styles.productContent}>
                                            <h2>Square Glass S</h2>
                                            <p>S/Black</p>
                                        </div>

                                    </div>

                                </td>
                                <td>
                                    <p>Price</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <p>Quantity</p>
                                    <div className={styles.quantity}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        <h2>1</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14" /></svg>
                                    </div>


                                </td>
                                <td>
                                    <p>Total</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.product}>
                                        <img src="/Images/glass.avif" />
                                        <div className={styles.productContent}>
                                            <h2>Square Glass S</h2>
                                            <p>S/Black</p>
                                        </div>

                                    </div>

                                </td>
                                <td>
                                    <p>Price</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <p>Quantity</p>
                                    <div className={styles.quantity}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        <h2>1</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14" /></svg>
                                    </div>


                                </td>
                                <td>
                                    <p>Total</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.product}>
                                        <img src="/Images/glass4.avif" />
                                        <div className={styles.productContent}>
                                            <h2>Square Glass S</h2>
                                            <p>S/Black</p>
                                        </div>

                                    </div>

                                </td>
                                <td>
                                    <p>Price</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <p>Quantity</p>
                                    <div className={styles.quantity}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        <h2>1</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14" /></svg>
                                    </div>


                                </td>
                                <td>
                                    <p>Total</p>
                                    <h2>$18</h2>
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <Footer />
        </div>
    )
}
