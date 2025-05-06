import React, { useEffect, useState } from 'react'
import styles from "../../styles/category.module.css"
import Footer from '../../Component/Footer'
import Header from "../../Component/Header"
import CardComponent from '../../Component/CardComponent'
import { Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ProductList } from '../../store/authSlice'

export default function index() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    useEffect(() => {
        Validate(router)
    }, [])
    const GetProduct = () => {
        setIsLoading(true)
        dispatch(ProductList()).then((res) => {
            console.log("resProduct", res.payload)
            if (res.payload.status == 200) {
                setProducts(res.payload.products)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.log("Error", error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        GetProduct();
    }, [])
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
                        {Products.map((item, index) => (
                            <CardComponent key={index} src={item.url} name={item.name} price={item.price} />
                        ))}



                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
