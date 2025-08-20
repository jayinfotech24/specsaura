import React from 'react';
import styles from '../../styles/helpCenter.module.css';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { motion } from 'framer-motion';
import { FaShippingFast, FaUndo, FaHeadset, FaShieldAlt, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const HelpCenter = () => {
    const faqItems = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll receive tracking information via email once your order ships."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all products. Items must be unused and in their original packaging. Contact our customer service to initiate a return."
        },
        {
            question: "How do I change or cancel my order?",
            answer: "You can modify or cancel your order within 24 hours of placing it. Contact our customer service team immediately for assistance."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, UPI, and net banking. We also offer EMI options for eligible purchases."
        }
    ];

    const services = [
        {
            icon: <FaShippingFast />,
            title: "Free Shipping",
            description: "Free shipping on all orders above ₹999"
        },
        {
            icon: <FaUndo />,
            title: "Easy Returns",
            description: "30-day return policy for all products"
        },

        {
            icon: <FaShieldAlt />,
            title: "Secure Shopping",
            description: "100% secure payment gateway"
        }
    ];

    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />

            <div className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.heroContent}
                >
                    <h1>How can we help you?</h1>
                    <p>Find answers to your questions and get the support you need</p>
                </motion.div>
            </div>

            <div className={styles.container}>
                <section className={styles.services}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={styles.serviceCard}
                        >
                            <div className={styles.icon}>{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </section>

                <section className={styles.faq}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqGrid}>
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={styles.faqItem}
                            >
                                <h3>{item.question}</h3>
                                <p>{item.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.contact}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.contactCard}
                    >
                        <div className={styles.question}>
                            <FaQuestionCircle className={styles.contactIcon} />
                        </div>

                        <h2>Still have questions?</h2>
                        <p>Our customer support team is here to help you</p>
                        <div className={styles.contactMethods}>
                            <div className={styles.contactMethod}>
                                <h3>Email Us</h3>
                                <p><a href='mailto:specsauraworks@gmail.com'>specsauraworks@gmail.com
                                </a></p>
                            </div>
                            <div className={styles.contactMethod}>
                                <h3>Call Us</h3>
                                <p><a href='tel:+91 63559 90975'>+91 63559 90975</a></p>
                            </div>

                        </div>
                    </motion.div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default HelpCenter; 