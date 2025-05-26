import React from 'react'
import styles from "../styles/progreessHeader.module.css"

export default function ProgressHeader({ isOneComplete, isLensComplete, isTwoComplete, isThiredComplete, Changepage, isFourthComplete }) {
    // 5 steps: 1) Power Type, 2) Lens, 3) Prescription, 4) Review, 5) Payment/Finish
    const progress = isFourthComplete ? 100 : isThiredComplete ? 80 : isTwoComplete ? 60 : isLensComplete ? 40 : isOneComplete ? 20 : 0;
    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                {/* Step 1: Power Type */}
                <div className={styles.headerNumber}>
                    <div className={isOneComplete ? styles.complete : styles.step}>
                        <p>{isOneComplete ? "✔" : "1"}</p>
                    </div>
                </div>
                {/* Step 2: Lens Selection */}
                <div className={styles.headerNumber}>
                    <div className={isLensComplete ? styles.complete : styles.step}>
                        <p>{isLensComplete ? "✔" : "2"}</p>
                    </div>
                </div>
                {/* Step 3: Prescription */}
                <div className={styles.headerNumber}>
                    <div className={isTwoComplete ? styles.complete : styles.step}>
                        <p>{isTwoComplete ? "✔" : "3"}</p>
                    </div>
                </div>
                {/* Step 4: Review */}
                <div className={styles.headerNumber}>
                    <div className={isThiredComplete ? styles.complete : styles.step}>
                        <p>{isThiredComplete ? "✔" : "4"}</p>
                    </div>
                </div>
                {/* Step 5: Payment/Finish */}
                <div className={styles.headerNumber}>
                    <div className={isFourthComplete ? styles.complete : styles.step}>
                        <p>{isFourthComplete ? "✔" : "5"}</p>
                    </div>
                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}
