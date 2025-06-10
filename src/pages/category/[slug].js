import React, { useEffect, useState } from 'react'
import styles from "../../styles/category.module.css"
import Footer from '../../Component/Footer'
import Header from "../../Component/Header"
import CardComponent from '../../Component/CardComponent'
import { Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ProductList } from '../../store/authSlice'
import Preloader from '../../Component/Animated'
import FilterSidebar from '../../Component/FilterSidebar'

export default function CategoryPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]);
    const [FilteredProducts, setFilteredProducts] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});

    useEffect(() => {
        Validate(router)
    }, [])

    const GetProduct = () => {
        setIsLoading(true)
        dispatch(ProductList()).then((res) => {
            if (res.payload.status == 200) {
                setProducts(res.payload.products)
                setFilteredProducts(res.payload.products)
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

    const handleFilterChange = (category, value) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            if (!newFilters[category]) {
                newFilters[category] = [];
            }

            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter(v => v !== value);
            } else {
                newFilters[category] = [...newFilters[category], value];
            }

            if (newFilters[category].length === 0) {
                delete newFilters[category];
            }

            return newFilters;
        });
    };

    useEffect(() => {
        if (Products) {
            let filtered = [...Products];

            // Apply active filters
            Object.entries(activeFilters).forEach(([category, values]) => {
                filtered = filtered.filter(product => {
                    switch (category) {
                        case 'shape':
                            // Add shape filtering logic if needed
                            return true;
                        case 'material':
                            return values.includes(product.frameMaterial?.toLowerCase());
                        case 'size':
                            // Add size filtering logic if needed
                            return true;
                        case 'price':
                            const [min, max] = values[0].split('-').map(Number);
                            return product.price >= min && product.price <= max;
                        case 'collection':
                            // Add collection filtering logic if needed
                            return true;
                        case 'frameType':
                            // Add frame type filtering logic if needed
                            return true;
                        case 'frameColor':
                            return values.includes(product.frameColor?.toLowerCase());
                        case 'gender':
                            return values.includes(product.gender?.toLowerCase());
                        default:
                            return true;
                    }
                });
            });

            // Apply URL query filters
            if (router.query.gender) {
                filtered = filtered.filter(product =>
                    product.gender?.toLowerCase() === router.query.gender.toLowerCase()
                );
            }

            if (router.query.search) {
                const searchTerm = router.query.search.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name?.toLowerCase().includes(searchTerm) ||
                    product.description?.toLowerCase().includes(searchTerm) ||
                    product.brandName?.toLowerCase().includes(searchTerm)
                );
            }

            setFilteredProducts(filtered);
        }
    }, [Products, activeFilters, router.query]);

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
                <div className={styles.contentWrapper}>
                    <FilterSidebar
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                    />
                    <div className={styles.cardComponent}>
                        <div className={styles.heading}>
                            {router.query.gender && (
                                <h1>{router.query.gender.charAt(0).toUpperCase() + router.query.gender.slice(1)}'s Collection</h1>
                            )}
                        </div>
                        <div className={styles.cardInner}>
                            {IsLoading ? (
                                <div><Preloader /></div>
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
                                <div className={styles.noProducts}>No products found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
