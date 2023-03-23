import styles from '../styles/NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
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
            </div>
        </nav>
    );
}
