import React, { useState } from 'react';
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import Modal from './Modal';

export default function NavBar(): JSX.Element {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <img src="/Logo.png" alt="Tom BP" />
                <ul className={styles.menu}>
                    <li>
                        <Link href="#about">About</Link>
                    </li>
                    <li>
                        <Link href="#projects">Projects</Link>
                    </li>
                    <li>
                        <Link href="#footer">Contact</Link>
                    </li>
                </ul>
                <div>
                    <button className={styles.loginButton} onClick={openLoginModal}>Login</button>
                    <button className={styles.registerButton} onClick={openRegisterModal}>Register</button>

                    <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
                        <img src="/WIP.png" alt="Work in Progress" style={{ width: "60%", height: "100%" }} />
                    </Modal>

                    <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
                        <img src="/WIP.png" alt="Work in Progress" style={{ width: "60%", height: "100%" }} />
                    </Modal>
                </div>
            </div>
        </nav>
    );
}
