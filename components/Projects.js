import styles from '../styles/Projects.module.css';

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className={styles.title}>Featured Projects</h2>
                <br/><br/><br/>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <img src="/ChatProject.png" alt="Project 1" />
                        <div className={styles.content}>
                            <h3>Project 1</h3>
                            <p>Description of Project 1</p>
                            <a href="https://github.com/project1" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src="/ShopProject.png" alt="Project 2" />
                        <div className={styles.content}>
                            <h3>Project 2</h3>
                            <p>Description of Project 2</p>
                            <a href="https://github.com/project2" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src="/ManageProject.png" alt="Project 3" />
                        <div className={styles.content}>
                            <h3>Project 3</h3>
                            <p>Description of Project 3</p>
                            <a href="https://github.com/project3" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
