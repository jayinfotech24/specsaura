import React from 'react'
import styles from "../../styles/category.module.css"
import Footer from '../../Component/Footer'
import Header from "../../Component/Header"
import CardComponent from '../../Component/CardComponent'

export default function index() {
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.poster}>
                    <img src="/Images/bg_poster.webp" />
                    <div className={styles.imageContent}>
                        <h1>Products</h1>
                    </div>
                </div>
                <div className={styles.cardComponent}>
                    <div className={styles.heading}>

                    </div>
                    <div className={styles.cardInner}>

                        <CardComponent src={"/Images/Round-Glasses.webp"} name={"Round Glasses"} price={"$28.00"} />
                        <CardComponent src={"/Images/glasses2.webp"} name={"Rectangle SunGlasses"} price={"$59.00"} />
                        <CardComponent src={"/Images/glasses3.webp"} name={"Rectangle-SunGlasses-S"} price={"$15.00"} />
                        <CardComponent src={"/Images/glasses4.webp"} name={"Premium-SunGlasses-S"} price={"$20.00"} />
                        <CardComponent src={"/Images/Round-Glasses.webp"} name={"Round Glasses"} price={"$28.00"} />
                        <CardComponent src={"/Images/glasses2.webp"} name={"Rectangle SunGlasses"} price={"$59.00"} />
                        <CardComponent src={"/Images/glasses3.webp"} name={"Rectangle-SunGlasses-S"} price={"$15.00"} />
                        <CardComponent src={"/Images/glasses4.webp"} name={"Premium-SunGlasses-S"} price={"$20.00"} />

                        <CardComponent src={"/Images/Round-Glasses.webp"} name={"Round Glasses"} price={"$28.00"} />
                        <CardComponent src={"/Images/glasses2.webp"} name={"Rectangle SunGlasses"} price={"$59.00"} />
                        <CardComponent src={"/Images/glasses3.webp"} name={"Rectangle-SunGlasses-S"} price={"$15.00"} />
                        <CardComponent src={"/Images/glasses4.webp"} name={"Premium-SunGlasses-S"} price={"$20.00"} />


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
