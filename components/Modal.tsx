import React, { useEffect } from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(`.${styles.modal}`)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
