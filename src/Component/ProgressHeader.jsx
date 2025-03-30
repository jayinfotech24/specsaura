import React from 'react'
import styles from "../styles/progreessHeader.module.css"
export default function ProgressHeader({ isOneComplete, isTwoComplete, isThiredComplete, Changepage, isFourthComplete }) {
    const progress = isThiredComplete ? 100 : isTwoComplete ? 66 : isOneComplete ? 33 : 0; // Set progress based on completion
    return (
        <div className={styles.main}>
            <div className={styles.inner}>

                <div onClick={() => Changepage(0)} className={styles.headerNumber}>

                    <div className={isOneComplete ? styles.complete : styles.step}>

                        <p >{isOneComplete ? "✔" : "1"}</p>
                    </div>

                </div>
                <div onClick={() => Changepage(2)} className={styles.headerNumber}>
                    <div className={isTwoComplete ? styles.complete : styles.step}>

                        <p>{isTwoComplete ? "✔" : "2"}</p>
                    </div>
                </div>
                <div onClick={() => Changepage(3)} className={styles.headerNumber}>
                    <div className={isThiredComplete ? styles.complete : styles.step}>

                        <p>{isThiredComplete ? "✔" : "3"}</p>
                    </div>
                </div>
                <div className={styles.headerNumber}>
                    <div className={isFourthComplete ? styles.complete : styles.step}>

                        <p>{isFourthComplete ? "✔" : "4"}</p>
                    </div>
                </div>


            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}
