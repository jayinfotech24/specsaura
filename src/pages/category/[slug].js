import React, { useEffect, useState } from 'react'
import styles from "../../styles/category.module.css"
import Footer from '../../Component/Footer'
import Header from "../../Component/Header"
import CardComponent from '../../Component/CardComponent'
import { Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ProductList } from '../../store/authSlice'

export default function CategoryPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]);
    const [FilteredProducts, setFilteredProducts] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Validate(router)
    }, [])

    const GetProduct = () => {
        setIsLoading(true)
        dispatch(ProductList()).then((res) => {
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

    // Filter products based on gender query parameter
    useEffect(() => {
        if (router.isReady && Products.length > 0) {
            const { gender, search } = router.query;
            let filtered = [...Products];

            if (gender) {
                filtered = filtered.filter(product => {
                    switch (gender) {
                        case 'women':
                            return product.gender?.toLowerCase() === 'women' || product.gender?.toLowerCase() === 'female' || product.gender?.toLowerCase() === 'unisex';
                        case 'men':
                            return product.gender?.toLowerCase() === 'men' || product.gender?.toLowerCase() === 'male' || product.gender?.toLowerCase() === 'unisex';
                        case 'rayban':
                            return product.brand?.toLowerCase() === 'rayban' || product.name?.toLowerCase().includes('rayban');
                        case 'designer':
                            return product.category?.toLowerCase() === 'designer' || product.name?.toLowerCase().includes('designer');
                        default:
                            return true;
                    }
                });
            }

            if (search) {
                filtered = filtered.filter(product =>
                    product.name?.toLowerCase().includes(search.toLowerCase())
                );
            }

            setFilteredProducts(filtered);
        }
    }, [router.isReady, router.query, Products]);

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
                        {router.query.gender && (
                            <h1>{router.query.gender.charAt(0).toUpperCase() + router.query.gender.slice(1)}'s Collection</h1>
                        )}
                    </div>
                    <div className={styles.cardInner}>
                        {IsLoading ? (
                            <div>Loading...</div>
                        ) : FilteredProducts.length > 0 ? (
                            FilteredProducts.map((item, index) => (
                                <CardComponent
                                    key={index}
                                    id={item._id}
                                    src={item.url}
                                    name={item.name}
                                    price={item.price}
                                    total={item.totalItems}
                                    available={item.availableItems}
                                    images={item.images}
                                />
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
