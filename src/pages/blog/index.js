import React, { useEffect, useState } from 'react';
import styles from '../../styles/blog.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import Pagination from '../../Component/Pagination';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaTimes, FaShare, FaBookmark } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { GetBlog } from '../../store/authSlice';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [BlogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();

    // Convert API date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const categories = ["All", "Eye Care", "Eye Health", "Style Guide"];

    // Filter posts based on search query
    const filteredPosts = BlogData.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReadMore = (post) => {
        setSelectedPost(post);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    const BlogDetail = (page = 1) => {
        dispatch(GetBlog({ page, limit: 10 })).then((res) => {
            if (res.payload?.status == 200 || res.payload?.items) {
                setBlogData(res.payload.items || []);
                setTotalPages(res.payload.totalPages || 1);
                setCurrentPage(res.payload.page || page);
            }
        }).catch((err) => {
            // Error handling
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        BlogDetail(page);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        BlogDetail(1);
    }, []);

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />

            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent} style={{ marginTop: "60px" }}>
                    <h1>Our Blog</h1>
                    <p>Discover insights about eye care, eyewear fashion, and vision health</p>
                </div>
            </div>

            <div className={styles.container}>
                {/* Search and Filter Section */}
                <div className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className={styles.noBlogFound}>
                        <h2>No blog found</h2>
                        <p>We couldn't find any blog posts matching your search or there are no blogs available at the moment.</p>
                    </div>
                ) : (
                    <div className={styles.blogGrid}>
                        {filteredPosts.map((post) => (
                            <article key={post._id} className={styles.blogCard}>
                                <div className={styles.imageContainer}>
                                    <img src={post.url} alt={post.title} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                    <div className={styles.metaInfo}>
                                        <span><FaCalendarAlt /> {formatDate(post.createdAt)}</span>
                                        <span><FaUser /> {post.writerName}</span>
                                    </div>
                                    <button
                                        className={styles.readMore}
                                        onClick={() => handleReadMore(post)}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Blog Detail Modal */}
            {selectedPost && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>
                            <FaTimes color='#000' />
                        </button>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <img src={selectedPost.url} alt={selectedPost.title} />
                                <div className={styles.modalMeta}>
                                    <h2>{selectedPost.title}</h2>
                                    <div className={styles.modalMetaInfo}>
                                        <span><FaCalendarAlt /> {formatDate(selectedPost.createdAt)}</span>
                                        <span><FaUser /> {selectedPost.writerName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.modalText}>
                                    <p>{selectedPost.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Blog;
