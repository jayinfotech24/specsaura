import React, { useEffect, useState } from 'react'
import styles from "../../styles/cart.module.css"
import Header from "../../Component/Header"
import Footer from "../../Component/Footer"
import { handlePayment, IncreasePrice, Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getCartDetail, getProductDetail } from '../../store/authSlice'
import Preloader from '../../Component/Animated'
export default function index() {

    const router = useRouter()
    const dispatch = useDispatch()
    const [IsLoading, setIsLoading] = useState(false)
    const [productDetails, setProductDetails] = useState([]);
    const [CartData, setCartData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        const fetchProductsOneByOne = async () => {
            const productArray = [];

            for (const item of CartData) {
                try {
                    const res = await dispatch(getProductDetail(item.productID)).unwrap();
                    productArray.push(res.product); // make sure `res` has `product`
                } catch (err) {
                    console.error(`Error fetching product ${item.productID}:`, err);
                }
            }

            console.log("Array", productArray);
            setProductDetails(productArray);
            setIsLoading(false)
        };

        if (CartData.length > 0) {
            fetchProductsOneByOne();
        }
    }, [CartData]);

    useEffect(() => {
        Validate(router)
    }, [])

    const Payment = async (amount) => {
        setIsLoading(true)
        await handlePayment(dispatch, amount)
        setIsLoading(false)
    }

    const getDeatail = () => {

        const userId = localStorage.getItem("userId");
        dispatch(getCartDetail(userId)).then((res) => {
            console.log("Res", res)
            setCartData(res.payload);
        }).catch((error) => {
            console.log("Err", error)
        })
    }

    useEffect(() => {
        getDeatail()
    }, [])
    const totalAmount = productDetails.reduce((acc, item) => {
        return acc + (item.totalItems * IncreasePrice((item.price)));
    }, 0);
    return (
        <div className={styles.main}>
            {
                IsLoading && (
                    <Preloader />
                )

            }
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

                            {
                                productDetails.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className={styles.product}>
                                                    <img src={item.url} />
                                                    <div className={styles.productContent}>
                                                        <h2>{item.name}</h2>
                                                        <p>{item.color}</p>
                                                    </div>

                                                </div>

                                            </td>
                                            <td>
                                                <p>Price</p>
                                                <h2> {`${IncreasePrice(Number(item.price))} ₹`}</h2>
                                            </td>
                                            <td>
                                                <p>Quantity</p>
                                                <div className={styles.quantity}>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg> */}
                                                    <h2>{item.totalItems}</h2>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="#000" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14" /></svg> */}
                                                </div>


                                            </td>
                                            <td>
                                                <p>Total</p>
                                                <h2>{`₹ ${(Number(item.totalItems)) * IncreasePrice(Number(item.price))}`}</h2>

                                            </td>
                                            <td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </td>

                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                    <button onClick={() => Payment(totalAmount)} className={styles.button}>
                        {`Pay ₹${totalAmount}`}
                    </button>

                </div>

            </div>
            <Footer />
        </div>
    )
}
