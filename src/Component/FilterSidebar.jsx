import React, { useEffect, useState } from 'react';
import styles from '../styles/filterSidebar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

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
    
    let filterCategories = {}
    if(isAccessories){
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

    const handleClearAll = () => {
        // Clear all filters
        setActiveFilters({});
        
        // Optional: remove 'gender' from query params
        if (router.query.gender) {
            const { gender, ...rest } = router.query;
            router.replace({
                pathname: router.pathname,
                query: rest
            }, undefined, { shallow: true });
        }
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