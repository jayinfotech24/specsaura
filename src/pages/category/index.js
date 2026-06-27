import React, { useEffect, useState } from 'react';
import styles from "../../styles/category.module.css";
import Footer from '../../Component/Footer';
import Header from "../../Component/Header";
import CardComponent from '../../Component/CardComponent';
import { Validate } from '../../store/commonFunction';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ProductList, isAccessoryCategory } from '../../store/authSlice';
import Preloader from '../../Component/Animated';
import FilterSidebar from '../../Component/FilterSidebar';

export default function CategoryIndexPage() {
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

            ////////console.log("Res", res)
            if (res.payload.status == 200) {
                setProducts(res.payload.products)
                setFilteredProducts(res.payload.products)
                setIsLoading(false)
            }
        }).catch((error) => {
            ////////console.log("Error", error)
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

            // Filter by collection_type from URL if present
            if (router.query.type) {
                const urlType = router.query.type.toLowerCase();
                ////console.log("Prduicts", Products, urlType)
                filtered = filtered.filter(product =>
                    product.collection_type && product.collection_type.toLowerCase() === urlType
                );
            }

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
                        case 'lensColor':
                            return values.includes(product.lensColor?.toLowerCase());
                        case 'collection_type':
                            // Assuming product.category.title holds the collection type
                            return values.includes(product.category?.title);
                        default:
                            return true;
                    }
                });
            });

            // Apply URL query filters
            if (router.query.gender) {
                filtered = filtered.filter(product =>
                    product.gender?.toLowerCase() === router.query.gender.toLowerCase() || product.gender == "Unisex"
                );
            }

            if (router.query.search) {
                const words = router.query.search.toLowerCase().split(/\s+/).filter(Boolean);
                
                const getSearchableText = (product) => {
                    return [
                        product.name,
                        product.description,
                        product.brandName,
                        product.color,
                        product.gender,
                        product.frameWidth?.toString(),
                        product.price?.toString(),
                        product.lensColor,
                        product.modelNo,
                        product.productID,
                        product.frameColor,
                        product.templeColor,
                        product.frameMaterial,
                        product.lens,
                        product.warranty
                    ].filter(Boolean).join(' ').toLowerCase();
                };

                // Pre-sort by updatedAt date (newest first) to ensure consistent secondary sorting within groups
                const sortedFiltered = [...filtered].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                // Group 1: Products containing ALL keywords
                const allMatch = sortedFiltered.filter(product => {
                    const searchableText = getSearchableText(product);
                    return words.every(word => searchableText.includes(word));
                });

                const seenIds = new Set(allMatch.map(p => p._id));
                const orderedMatches = [...allMatch];

                // Group 2: Products matching keywords one by one in query order
                for (const word of words) {
                    const wordMatches = sortedFiltered.filter(product => {
                        if (seenIds.has(product._id)) return false;
                        const searchableText = getSearchableText(product);
                        return searchableText.includes(word);
                    });

                    wordMatches.forEach(p => seenIds.add(p._id));
                    orderedMatches.push(...wordMatches);
                }

                filtered = orderedMatches;
            } else {
                // Default sorting by updatedAt (latest first)
                filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            }

            setFilteredProducts(filtered);
        }
    }, [Products, activeFilters, router.query]);

    // Get the type from the URL
    const type = router.query.type;

    // Determine if we should use boy/girl for gender
    const isHalospecs = type && type.toLowerCase().includes('halospecs');

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.poster}>
                    <img src="/Images/bg_poster.webp" />

                </div>
                <div className={styles.contentWrapper}>
                    <FilterSidebar
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                        isSunglasses={false}
                        setActiveFilters={setActiveFilters}
                        useBoyGirlGender={isHalospecs}
                        isAccessories={isAccessoryCategory({ _id: router.query.slug })}
                    />
                    <div className={styles.cardComponent}>
                        <div className={styles.heading}>
                            {router.query.gender ? (
                                <h1>{router.query.gender.charAt(0).toUpperCase() + router.query.gender.slice(1)}'s Collection</h1>
                            ) : (
                                <h1>All Products</h1>
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