import React, { useEffect, useState } from 'react';
import styles from '../styles/filterSidebar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { isAccessoryCategory } from '../store/authSlice';

export const FRAME_SHAPES = Object.freeze([
    "Round",
    "Oval",
    "Square",
    "Rectangle",
    "Cat Eye",
    "Geometric",
    "Hexagon",
    "Octagon",
    "Browline",
    "Butterfly",
    "Wraparound",
    "Shield",
    "Aviator",
    "Wayfarer",
    "Rimless",
    "Semi-Rimless",
    "Full Rim",
    "Heart",
    "Star",
    "Novelty"
]);

const FilterSidebar = ({ onFilterChange, activeFilters, isSunglasses, setActiveFilters, useBoyGirlGender, isAccessories = false }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const router = useRouter();
    const [sidebarSearch, setSidebarSearch] = useState(router.query.search || '');

    useEffect(() => {
        setSidebarSearch(router.query.search || '');
    }, [router.query.search]);

    let filterCategories = {}
    if (isAccessoryCategory({ _id: router.query.slug })) {
        filterCategories = {
            price: {
                title: 'Price Wise',
                options: ['0-200', '200-400', '400-600', '600-800', '800-1000']
            }
        }
    }
    else {
        filterCategories = {
            material: {
                title: 'Material Wise',
                options: ['Acetate', 'Titanium', 'Fiber', 'Metal', 'Plastic']
            },
            shape: {
                title: 'Shape',
                options: FRAME_SHAPES
            },
            size: {
                title: 'Frame Size',
                options: ['Small', 'Medium', 'Large', 'Extra Large']
            },
            price: {
                title: 'Price Wise',
                options: ['0-1000', '1000-2000', '2000-3000', '3000-4000', '4000+']
            },
            frameColor: {
                title: 'Frame Color',
                options: ['Black', 'White', 'Gold', 'Silver', 'Blue', 'Red', 'Green']
            },
            gender: {
                title: 'Gender',
                options: useBoyGirlGender ? ['Girl', 'Boy'] : ['Male', 'Female', 'Unisex']
            },
        };
    }

    useEffect(() => {
        console.log("Active Filters", activeFilters)
    }, [activeFilters])

    // Add Glass Color filter only for sunglasses
    const glassColorFilter = {
        lensColor: {
            title: 'Glass Color',
            options: [
                'Black',
                'Blue',
                'Green',
                'Yellow',
                'Pink'
            ]
        }
    };

    const categoriesToRender = isSunglasses
        ? { ...filterCategories, ...glassColorFilter }
        : filterCategories;

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleFilterChange = (category, value) => {
        onFilterChange(category, value.toLowerCase());
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: router.pathname,
            query: { ...router.query, search: sidebarSearch }
        });
    };

    const handleClearAll = () => {
        // Clear all filters
        setActiveFilters({});
        setSidebarSearch('');

        // Remove search and gender queries from parameters
        const { gender, search, ...rest } = router.query;
        router.replace({
            pathname: router.pathname,
            query: rest
        }, undefined, { shallow: true });
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Filters</h2>
                <button
                    className={styles.clearAll}
                    onClick={handleClearAll}
                >
                    Clear All
                </button>
            </div>

            <div className={styles.searchSection}>
                <form onSubmit={handleSearchSubmit} className={styles.sidebarSearchForm}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={sidebarSearch}
                        onChange={(e) => setSidebarSearch(e.target.value)}
                        className={styles.sidebarSearchInput}
                    />
                    <button type="submit" className={styles.sidebarSearchButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>
                </form>
            </div>

            {Object.entries(categoriesToRender).map(([category, { title, options }]) => (
                <div key={category} className={styles.filterSection}>
                    <div
                        className={styles.filterHeader}
                        onClick={() => toggleSection(category)}
                    >
                        <h3>{title}</h3>
                        <motion.span
                            animate={{ rotate: expandedSections[category] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            ▼
                        </motion.span>
                    </div>
                    <AnimatePresence>
                        {expandedSections[category] && (
                            <motion.div
                                className={styles.filterOptions}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {options.map((option) => {
                                    const isChecked = Array.isArray(activeFilters[category])
                                        ? activeFilters[category].includes(option.toLowerCase())
                                        : false;

                                    return (
                                        <label key={option} className={styles.filterOption}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleFilterChange(category, option)}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default FilterSidebar;