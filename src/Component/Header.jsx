import React, { useEffect, useState, useRef } from 'react'
import styles from "../styles/Header.module.css"
import Hamburger from 'hamburger-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ProductList, GetUser } from '../store/authSlice'
import { toast } from 'react-hot-toast'

export default function Header({ isHeaderVisible }) {
    const [IsSet, SetISSet] = useState(0)
    const [isOpen, setOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()
    const searchContainerRef = useRef(null);

    const checkUserAuth = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                toast.error("Please login to continue");
                router.push("/login");
                return false;
            }
            
            const response = await dispatch(GetUser()).unwrap();
            return response.status === 200;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('userToken');
                toast.error("Session expired. Please login again");
                router.push("/login");
                return false;
            }
            throw error;
        }
    };

    const handleLoginClick = async () => {
        try {
            const isAuthenticated = await checkUserAuth();
            if (isAuthenticated) {
                router.push("/profile");
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await dispatch(ProductList()).unwrap()
                if (response.status === 200) {
                    setProducts(response.products)
                }
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [dispatch])

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = products.filter(product => {
                const q = searchQuery.toLowerCase();
                return (
                    (product.name && product.name.toLowerCase().includes(q)) ||
                    (product.color && product.color.toLowerCase().includes(q)) ||
                    (product.gender && product.gender.toLowerCase().includes(q)) ||
                    (product.frameWidth && product.frameWidth.toString().includes(q)) ||
                    (product.price && product.price.toString().includes(q)) ||
                    (product.lensColor && product.lensColor.toLowerCase().includes(q)) ||
                    (product.brandName && product.brandName.toLowerCase().includes(q)) ||
                    (product.modelNo && product.modelNo.toLowerCase().includes(q)) ||
                    (product.productID && product.productID.toLowerCase().includes(q)) ||
                    (product.frameColor && product.frameColor.toLowerCase().includes(q)) ||
                    (product.templeColor && product.templeColor.toLowerCase().includes(q)) ||
                    (product.frameMaterial && product.frameMaterial.toLowerCase().includes(q)) ||
                    (product.lens && product.lens.toLowerCase().includes(q)) ||
                    (product.warranty && product.warranty.toLowerCase().includes(q))
                );
            });
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts([])
        }
    }, [searchQuery, products])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/category/f?search=${encodeURIComponent(searchQuery)}`)
            setIsSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <div className={isHeaderVisible ? styles.visible : styles.main}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`${styles.manubar} ${isOpen ? styles.open : ''}`}>
                        <div className={styles.buttonContainer}>
                            <button className={styles.first} onClick={() => setOpen(false)}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </span>

                            </button>
                            <button onClick={handleLoginClick} className={styles.second}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                </span>

                            </button>
                        </div>
                        <ul className={styles.manuList}>
                            <li onClick={() => { router.push("/") }}>Home</li>
                            <li onClick={() => { router.push("/category/f") }}>Shop</li>
                            {/* <li>Featured</li> <li>Pages</li> */}
                            <li onClick={()=>router.push("/blog")}>Blogs</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.inner}>
                <div className={styles.humburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>
                <div className={styles.logo} onClick={() => router.push("/")}>
                    <img src="/Images/logo2 (1).png" alt="Logo" />
                </div>

                <div className={styles.menuitems}>
                    <ul>
                        <li onClick={() => { router.push("/") }}>Home</li>
                        <li onClick={() => { router.push("/category/f") }}>Shop</li>
                        {/* <li>Featured</li> */}
                        <li onClick={() => { router.push("/blog") }}>Blogs</li>
                    </ul>
                </div>

                <div className={styles.icons}>
                    <ul>
                        <li onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </li>
                        <li onClick={handleLoginClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round">
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                        </li>
                        <li>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg> */}
                        </li>
                        <li onClick={() => router.push("/cart")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <div className={styles.dot}></div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`${styles.searchContainer} ${isSearchOpen ? styles.open : ''}`} ref={searchContainerRef}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                        autoFocus
                    />
                    <button type="submit" className={styles.searchButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>
                </form>
                {filteredProducts.length > 0 && (
                    <div className={styles.searchResults}>
                        {filteredProducts.map((product) => (
                            <div 
                                key={product._id} 
                                className={styles.searchResultItem}
                                onClick={() => {
                                    router.push(`/detail?id=${product._id}`)
                                    setIsSearchOpen(false)
                                    setSearchQuery('')
                                }}
                            >
                                <img src={product.url} alt={product.name} />
                                <div className={styles.searchResultInfo}>
                                    <h4>{product.name}</h4>
                                    <p>₹{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {searchQuery && filteredProducts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No products found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
