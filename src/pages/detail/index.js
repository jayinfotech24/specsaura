import React, { useEffect, useState } from 'react';
import styles from "../../styles/detail.module.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useRouter } from 'next/router';
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction';
import { useDispatch } from 'react-redux';
import { AddCart, getProductDetail } from '../../store/authSlice';
import Preloader from '../../Component/Animated';

export default function Index() {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "/Images/glasses2.webp",
        "/Images/glasses3.webp",
        "/Images/glasses4.webp"
    ];


    const [Data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // useEffect(() => {
    //     Validate(router);
    // }, []);


    const dispatch = useDispatch();
    const GetProdut = (Id) => {
        setIsLoading(true)
        dispatch(getProductDetail(Id)).then((res) => {
            console.log("Res", res)
            setData(res.payload.product)
            setIsLoading(false)

        }).catch((error) => {
            console.log("Errror", error)
            setIsLoading(false)
        })
        setIsLoading(false)
    }

    const { id } = router.query;


    useEffect(() => {
        if (id) {
            GetProdut(id)
        }
    }, [id])


    const BuyNow = async () => {
        const Amount = IncreasePrice(Number(Data.price))
        setIsLoading(true)
        await handlePayment(dispatch, Amount)
        setIsLoading(false)
    }
    const AddInCart = () => {
        setIsLoading(true)
        const userId = localStorage.getItem("userId");
        const responseObject = {
            userID: userId,
            productID: id,

            numberOfItems: 1,



        }
        dispatch(AddCart(responseObject)).then((res) => {

            if (Data.availableItems > 0) {

                console.log("ResCart", res);
                if (res.payload.status == 200) {
                    setIsLoading(false)
                    // router.push("/cart")
                }
                setIsLoading(false)
            }
            else {
                alert("Item is out of stock")
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log("Error", error)
        })
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.main}>
            {
                isLoading && (
                    <Preloader />
                )

            }
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.left}>
                    <img src={images[currentImageIndex]} alt="Product" className={styles.mainImage} />

                    {/* Thumbnails */}
                    <div className={styles.thumbnails}>
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className={index === currentImageIndex ? styles.activeThumbnail : styles.thumbnail}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.headerContent}>
                        <h1>{Data.name}</h1>
                        <h2>
                            {`${IncreasePrice(Number(Data.price))} ₹`}</h2>
                        <div className={styles.border}></div>
                    </div>
                    <p>Black Transparent UV Protection Classic sunglasses combine usefulness with the design...</p>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.cart} onClick={() => AddInCart()}>Add To Cart</button>
                        <button className={styles.buy} onClick={() => BuyNow()}>Buy It now</button>
                    </div>
                    <div className={styles.border}></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
