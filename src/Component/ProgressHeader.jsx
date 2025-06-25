import React from 'react'
import styles from "../styles/progreessHeader.module.css"

export default function ProgressHeader({ isOneComplete, isLensComplete, isCoatingComplete, isTwoComplete, isThiredComplete, Changepage, isFourthComplete }) {
    // 6 steps: 1) Power Type, 2) Lens, 3) Coating, 4) Prescription, 5) Review, 6) Payment/Finish
    const progress = isFourthComplete ? 100 : isThiredComplete ? 83 : isTwoComplete ? 66 : isCoatingComplete ? 50 : isLensComplete ? 33 : isOneComplete ? 16 : 0;
    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                {/* Step 1: Power Type */}
                <div className={styles.headerNumber} data-step="Power Type" onClick={() => Changepage(0)} style={{ cursor: 'pointer' }}>
                    <div className={isOneComplete ? styles.complete : styles.step}>
                        <p>{isOneComplete ? "✔" : "1"}</p>
                    </div>
                </div>
                {/* Step 2: Lens Selection */}
                <div className={styles.headerNumber} data-step="Lens" onClick={() => isOneComplete && Changepage(1)} style={{ cursor: isOneComplete ? 'pointer' : 'not-allowed', opacity: isOneComplete ? 1 : 0.5 }}>
                    <div className={isLensComplete ? styles.complete : styles.step}>
                        <p>{isLensComplete ? "✔" : "2"}</p>
                    </div>
                </div>
                {/* Step 3: Coating Selection */}
                <div className={styles.headerNumber} data-step="Coating" onClick={() => isLensComplete && Changepage(2)} style={{ cursor: isLensComplete ? 'pointer' : 'not-allowed', opacity: isLensComplete ? 1 : 0.5 }}>
                    <div className={isCoatingComplete ? styles.complete : styles.step}>
                        <p>{isCoatingComplete ? "✔" : "3"}</p>
                    </div>
                </div>
                {/* Step 4: Prescription */}
                <div className={styles.headerNumber} data-step="Prescription" onClick={() => isCoatingComplete && Changepage(3)} style={{ cursor: isCoatingComplete ? 'pointer' : 'not-allowed', opacity: isCoatingComplete ? 1 : 0.5 }}>
                    <div className={isTwoComplete ? styles.complete : styles.step}>
                        <p>{isTwoComplete ? "✔" : "4"}</p>
                    </div>
                </div>
                {/* Step 5: Review */}
                <div className={styles.headerNumber} data-step="Review" onClick={() => isTwoComplete && Changepage(4)} style={{ cursor: isTwoComplete ? 'pointer' : 'not-allowed', opacity: isTwoComplete ? 1 : 0.5 }}>
                    <div className={isThiredComplete ? styles.complete : styles.step}>
                        <p>{isThiredComplete ? "✔" : "5"}</p>
                    </div>
                </div>
                {/* Step 6: Payment/Finish */}
                <div className={styles.headerNumber} data-step="Finish" onClick={() => isThiredComplete && Changepage(5)} style={{ cursor: isThiredComplete ? 'pointer' : 'not-allowed', opacity: isThiredComplete ? 1 : 0.5 }}>
                    <div className={isFourthComplete ? styles.complete : styles.step}>
                        <p>{isFourthComplete ? "✔" : "6"}</p>
                    </div>
                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}
