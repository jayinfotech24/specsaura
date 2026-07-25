import React, { useEffect, useState } from 'react'
import styles from "../../styles/category.module.css"
import Footer from '../../Component/Footer'
import Header from "../../Component/Header"
import CardComponent from '../../Component/CardComponent'
import { Validate } from '../../store/commonFunction'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ProductList, ProductSearch, isAccessoryCategory } from '../../store/authSlice'
import Preloader from '../../Component/Animated'
import FilterSidebar from '../../Component/FilterSidebar'
import Pagination from '../../Component/Pagination'

export default function CategoryPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]);
    const [FilteredProducts, setFilteredProducts] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        Validate(router)
    }, [])

    const GetProduct = (page = 1, filters = activeFilters) => {
        setIsLoading(true)
        const searchQuery = router.query.search;

        if (searchQuery) {
            dispatch(ProductSearch({ q: searchQuery, page, limit: 10 })).then((res) => {
                if (res.payload?.status == 200 || res.payload?.products) {
                    const prods = res.payload.products || [];
                    setProducts(prods);
                    setFilteredProducts(prods);
                    setTotalPages(res.payload.totalPages || 1);
                    setCurrentPage(res.payload.page || page);
                }
                setIsLoading(false);
            }).catch(() => setIsLoading(false));
            return;
        }

        const params = { page, limit: 10 };

        if (router.query.slug && router.query.slug !== 'f') {
            params.category = router.query.slug;
        }
        if (router.query.type) {
            params.collection_type = router.query.type;
        }
        if (router.query.gender) {
            params.gender = router.query.gender;
        }

        if (filters.gender?.length) {
            params.gender = filters.gender.join(',');
        }
        if (filters.material?.length) {
            params.frameMaterial = filters.material.join(',');
        }
        if (filters.shape?.length) {
            params.frameShape = filters.shape.join(',');
        }
        if (filters.frameColor?.length) {
            params.frameColor = filters.frameColor.join(',');
        }
        if (filters.lensColor?.length) {
            params.lensColor = filters.lensColor.join(',');
        }
        if (filters.price?.length) {
            params.priceRange = filters.price[0];
        }

        dispatch(ProductList(params)).then((res) => {
            if (res.payload?.status == 200 || res.payload?.products) {
                const prods = res.payload.products || [];
                setProducts(prods);
                setFilteredProducts(prods);
                setTotalPages(res.payload.totalPages || 1);
                setCurrentPage(res.payload.page || page);
            }
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
        });
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        GetProduct(page);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (router.isReady) {
            setCurrentPage(1);
            GetProduct(1, activeFilters);
        }
    }, [router.isReady, router.query.slug, router.query.search, router.query.type, router.query.gender, activeFilters]);

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


    const ClearAllFilters = () => {
        setActiveFilters({});
    }
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
                        setActiveFilters={setActiveFilters}
                        isSunglasses={router.query.slug === '67ec193b4c7e05897cf5586e'}
                        ClearAllFilters={ClearAllFilters}
                        isAccessories={isAccessoryCategory({ _id: router.query.slug })}
                    />
                    <div className={styles.cardComponent}>
                        <div className={styles.heading}>
                            {router.query.gender ? (
                                <h1>{router.query.gender.charAt(0).toUpperCase() + router.query.gender.slice(1)}'s Collection</h1>
                            ) : (
                                <h1>Category Products</h1>
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
                                        crossPrice={item.crossPrice}
                                        discount={item.discount}
                                        total={item.totalItems}
                                        available={item.availableItems}
                                        images={item.images}
                                        isBestSeller={item.isBestSeller}
                                    />
                                ))
                            ) : (
                                <div className={styles.noProducts}>No products found</div>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
