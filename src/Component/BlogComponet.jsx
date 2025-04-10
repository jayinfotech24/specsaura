import React from 'react'
import styles from "../styles/blogcomponent.module.css"
export default function BlogComponet() {
    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                <div className={styles.imageContainer}>
                    <img src="/Images/glasses2.webp" />
                </div>
                <div className={styles.content}>
                    <h2>Test Blog post</h2>
                    <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</p>
                    <div className={styles.line}></div>
                    <div className={styles.name}>
                        <h3>John Doe</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
