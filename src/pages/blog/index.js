import React, { useState } from 'react';
import styles from '../../styles/blog.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaTimes, FaShare, FaBookmark } from 'react-icons/fa';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);

    // Sample blog data - replace with your actual data
    const blogPosts = [
        {
            id: 1,
            title: "Understanding Different Types of Eyeglass Lenses",
            excerpt: "Learn about the various types of lenses available and which one might be best for your needs.",
            image: "/Images/glass2.avif",
            date: "March 15, 2024",
            author: "Dr. Sarah Johnson",
            category: "Eye Care",
            readTime: "5 min read",
            fullContent: `When it comes to choosing the right eyeglass lenses, there are several options to consider. Each type of lens offers unique benefits and is designed for specific needs.

1. Single Vision Lenses
These are the most common type of lenses, designed to correct either nearsightedness or farsightedness. They have a single prescription power throughout the entire lens.

2. Bifocal Lenses
Bifocals have two distinct optical powers - one for distance vision and another for near vision. They're ideal for people who need correction for both.

3. Progressive Lenses
Also known as no-line bifocals, these lenses provide a smooth transition between different prescriptions, eliminating the visible line found in traditional bifocals.

4. Computer Lenses
Specifically designed for digital device use, these lenses help reduce eye strain and fatigue from prolonged screen time.

5. Photochromic Lenses
These lenses automatically darken when exposed to sunlight and return to clear indoors, offering convenience and UV protection.

Choosing the right lens type depends on your specific vision needs, lifestyle, and preferences. Consult with your eye care professional to determine the best option for you.`
        },
        {
            id: 2,
            title: "How to Choose the Perfect Frame for Your Face Shape",
            excerpt: "A comprehensive guide to finding frames that complement your unique facial features.",
            image: "/Images/glass3.avif",
            date: "March 12, 2024",
            author: "Michael Chen",
            category: "Style Guide",
            readTime: "4 min read",
            fullContent: `Finding the perfect eyeglass frames that complement your face shape can make a significant difference in your overall appearance. Here's a comprehensive guide to help you choose the right frames:

1. Oval Face Shape
Considered the ideal face shape, oval faces can wear almost any frame style. Look for frames that are as wide as the broadest part of your face.

2. Round Face Shape
To add definition to a round face, choose angular frames with sharp edges. Rectangular or square frames work well to create contrast.

3. Square Face Shape
Soften strong jawlines with round or oval frames. Avoid angular frames that might emphasize the squareness of your face.

4. Heart Face Shape
Balance a wider forehead with frames that are wider at the bottom. Cat-eye or round frames can work well for this face shape.

5. Diamond Face Shape
Highlight your cheekbones with frames that have distinctive brow lines. Oval or cat-eye frames can complement this face shape beautifully.

Remember, these are guidelines, not rules. The most important factor is how you feel in your frames. Choose styles that make you feel confident and comfortable.`
        },
        {
            id: 3,
            title: "The Impact of Digital Screens on Eye Health",
            excerpt: "Understanding how modern technology affects your eyes and how to protect them.",
            image: "/Images/glass4.avif",
            date: "March 10, 2024",
            author: "Dr. Emily Brown",
            category: "Eye Health",
            readTime: "6 min read",
            fullContent: `In today's digital age, our eyes are constantly exposed to screens, which can lead to various eye health issues. Here's what you need to know about digital eye strain and how to protect your vision:

1. Understanding Digital Eye Strain
Digital eye strain, also known as computer vision syndrome, occurs when your eyes become tired from intense use of digital devices. Symptoms include:
- Dry eyes
- Headaches
- Blurred vision
- Neck and shoulder pain

2. Blue Light Exposure
Digital screens emit blue light, which can potentially cause:
- Disrupted sleep patterns
- Eye fatigue
- Retinal damage (in extreme cases)

3. Prevention Tips
- Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds
- Adjust screen brightness and contrast
- Use blue light filtering glasses
- Maintain proper screen distance
- Take regular breaks

4. Protective Measures
- Use artificial tears for dry eyes
- Consider computer glasses with blue light protection
- Ensure proper lighting in your workspace
- Regular eye check-ups

Remember, prevention is better than cure. Take proactive steps to protect your eyes in the digital age.`
        },
        {
            id: 4,
            title: "Seasonal Eye Care Tips",
            excerpt: "Essential tips for maintaining healthy eyes throughout different seasons.",
            image: "/Images/glass5.avif",
            date: "March 8, 2024",
            author: "Dr. James Wilson",
            category: "Eye Care",
            readTime: "4 min read",
            fullContent: `Each season brings unique challenges for eye health. Here's how to protect your eyes throughout the year:

1. Spring
- Wear sunglasses to protect against UV rays
- Use antihistamine eye drops for allergies
- Keep windows closed during high pollen counts
- Clean your glasses regularly

2. Summer
- Invest in quality UV-protective sunglasses
- Stay hydrated to prevent dry eyes
- Use swimming goggles in pools
- Apply sunscreen carefully around eyes

3. Fall
- Protect eyes from wind and debris
- Use artificial tears for dry eyes
- Clean contact lenses properly
- Maintain good indoor air quality

4. Winter
- Use humidifiers to combat dry indoor air
- Wear protective eyewear during winter sports
- Keep eyes moisturized
- Take breaks from indoor heating

Remember to schedule regular eye check-ups and maintain a healthy lifestyle for optimal eye health throughout the year.`
        },
        {
            id: 5,
            title: "The Evolution of Eyewear Fashion",
            excerpt: "A journey through the history of eyewear and its impact on fashion.",
            image: "/Images/glass6.avif",
            date: "March 5, 2024",
            author: "Lisa Martinez",
            category: "Style Guide",
            readTime: "7 min read",
            fullContent: `Eyewear has evolved from a simple vision correction tool to a major fashion accessory. Let's explore this fascinating journey:

1. Early Beginnings (13th Century)
- First reading stones
- Basic magnifying glasses
- Primitive frame designs

2. The Renaissance Period
- Introduction of wire frames
- Early attempts at style
- Development of better lenses

3. The Industrial Revolution
- Mass production begins
- New materials introduced
- Standardized sizing

4. The 20th Century
- Iconic styles emerge
- Celebrity influence grows
- Technological advancements

5. Modern Era
- Smart glasses
- Sustainable materials
- Custom designs
- Fashion-forward styles

Today, eyewear is not just about vision correction but also about personal style and self-expression. The industry continues to innovate with new materials, designs, and technologies.`
        },
        {
            id: 6,
            title: "Understanding Prescription Changes",
            excerpt: "Why your prescription might change and when to get your eyes checked.",
            image: "/Images/glass2.avif",
            date: "March 3, 2024",
            author: "Dr. Robert Taylor",
            category: "Eye Health",
            readTime: "5 min read",
            fullContent: `Understanding why and when your prescription might change is crucial for maintaining optimal eye health. Here's what you need to know:

1. Common Causes of Prescription Changes
- Age-related changes
- Health conditions
- Lifestyle factors
- Environmental factors

2. Signs You Need a New Prescription
- Blurred vision
- Headaches
- Eye strain
- Difficulty focusing
- Squinting

3. When to Get Your Eyes Checked
- Annual comprehensive exams
- After significant vision changes
- Following health changes
- After eye injuries

4. Maintaining Eye Health
- Regular check-ups
- Healthy lifestyle
- Proper nutrition
- Eye exercises

Remember, early detection of vision changes can help prevent more serious issues. Regular eye exams are essential for maintaining good eye health.`
        }
    ];

    const categories = ["All", "Eye Care", "Eye Health", "Style Guide"];

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReadMore = (post) => {
        setSelectedPost(post);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

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
                <div className={styles.blogGrid}>
                    {filteredPosts.map((post) => (
                        <article key={post.id} className={styles.blogCard}>
                            <div className={styles.imageContainer}>
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <div className={styles.metaInfo}>
                                    <span><FaCalendarAlt /> {post.date}</span>
                                    <span><FaUser /> {post.author}</span>
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
            </div>

            {/* Blog Detail Modal */}
            {selectedPost && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <img src={selectedPost.image} alt={selectedPost.title} />
                                <div className={styles.modalMeta}>
                                    <h2>{selectedPost.title}</h2>
                                    <div className={styles.modalMetaInfo}>
                                        <span><FaCalendarAlt /> {selectedPost.date}</span>
                                        <span><FaUser /> {selectedPost.author}</span>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalBody}>

                                <div className={styles.modalText}>
                                    {selectedPost.fullContent.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
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
