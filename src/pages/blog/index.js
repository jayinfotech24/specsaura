import React from 'react'
import styles from "../../styles/blog.module.css"
import Header from "../../Component/Header"
import Footer from "../../Component/Footer"
import BlogComponet from '../../Component/BlogComponet'
export default function index() {
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>
                <div className={styles.blogcontainer}>
                    <BlogComponet />
                    <BlogComponet />
                    <BlogComponet />
                    <BlogComponet />
                    <BlogComponet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
