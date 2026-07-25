import React from 'react';
import styles from '../styles/pagination.module.css';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, currentPage + 1);

            if (currentPage <= 2) {
                end = 3;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 2;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pages = generatePageNumbers();

    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.paginationBtn}
                disabled={currentPage <= 1}
                onClick={() => handlePageClick(currentPage - 1)}
                aria-label="Previous page"
            >
                &lsaquo;
            </button>

            {pages.map((p, index) => {
                if (p === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                            &hellip;
                        </span>
                    );
                }

                return (
                    <button
                        key={`page-${p}`}
                        className={`${styles.paginationBtn} ${p === currentPage ? styles.active : ''}`}
                        onClick={() => handlePageClick(p)}
                    >
                        {p}
                    </button>
                );
            })}

            <button
                className={styles.paginationBtn}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
                aria-label="Next page"
            >
                &rsaquo;
            </button>
        </div>
    );
}
