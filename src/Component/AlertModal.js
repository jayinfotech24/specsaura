import React from 'react';
import styles from '../styles/alertModal.module.css';

const AlertModal = ({ isOpen, onClose, title, message, type = 'info', onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={`${styles.modalIcon} ${styles[type]}`}>
                    {type === 'success' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    ) : type === 'error' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    )}
                </div>
                <h2 className={styles.modalTitle}>{title}</h2>
                <p className={styles.modalMessage}>{message}</p>
                <div className={styles.modalActions}>
                    {onConfirm && (
                        <button className={`${styles.modalButton} ${styles.confirmButton}`} onClick={onConfirm}>
                            Confirm
                        </button>
                    )}
                    <button className={`${styles.modalButton} ${styles.closeButton}`} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal; 