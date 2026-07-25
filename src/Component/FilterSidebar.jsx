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
    const [activeSection, setActiveSection] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [sidebarSearch, setSidebarSearch] = useState(router.query.search || '');

    useEffect(() => {
        setSidebarSearch(router.query.search || '');
    }, [router.query.search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sidebarSearch !== (router.query.search || '')) {
                const newQuery = { ...router.query };
                if (sidebarSearch.trim()) {
                    newQuery.search = sidebarSearch.trim();
                } else {
                    delete newQuery.search;
                }
                router.push({
                    pathname: router.pathname,
                    query: newQuery
                });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [sidebarSearch]);

    useEffect(() => {
        setIsOpen(false);
    }, [router.asPath]);

    const totalActiveCount = Object.values(activeFilters).reduce((acc, curr) => {
        return acc + (Array.isArray(curr) ? curr.length : 0);
    }, 0);

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
        setActiveSection(prev => (prev === section ? null : section));
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
        setActiveSection(null);

        // Remove search and gender queries from parameters
        const { gender, search, ...rest } = router.query;
        router.replace({
            pathname: router.pathname,
            query: rest
        }, undefined, { shallow: true });
    };

    return (
        <>
            {/* Mobile Filter Button */}
            <button
                className={styles.mobileFilterBtn}
                onClick={() => setIsOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                <span>Filters {totalActiveCount > 0 ? `(${totalActiveCount})` : ''}</span>
            </button>

            {/* Backdrop overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2>Filters</h2>
                    <div className={styles.sidebarHeaderActions}>
                        <button
                            className={styles.clearAll}
                            onClick={handleClearAll}
                        >
                            Clear All
                        </button>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close filters"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.sidebarContent}>
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

                    {Object.entries(categoriesToRender).map(([category, { title, options }]) => {
                        const isExpanded = activeSection === category;
                        return (
                            <div key={category} className={styles.filterSection}>
                                <div
                                    className={styles.filterHeader}
                                    onClick={() => toggleSection(category)}
                                >
                                    <h3>{title}</h3>
                                    <motion.span
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ▼
                                    </motion.span>
                                </div>
                                <AnimatePresence>
                                    {isExpanded && (
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
                        );
                    })}
                </div>

                <div className={styles.mobileApplySection}>
                    <button
                        className={styles.applyBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;