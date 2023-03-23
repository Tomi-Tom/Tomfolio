import styles from '../styles/About.module.css';

export default function About() {
    return (
        <section id={"about"} className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>About Me</h2>
                <p className={styles.paragraph}>
                    Hi, I'm Tom Bariteau-Peter, a fullstack developer with a passion for creating elegant solutions to complex problems. With over 5 years of experience in the industry, I've had the opportunity to work on a wide range of projects, from small startups to large corporations.
                </p>
                <br/>
                <p className={styles.paragraph}>
                    My areas of expertise include React, Node.js, MongoDB, and MySQL. I'm also familiar with Agile development methodologies and have experience working in cross-functional teams. Whether it's building a new application from scratch or maintaining an existing codebase, I'm always up for a challenge.
                </p>
                <br/>
                <p className={styles.paragraph}>
                    When I'm not coding, you can usually find me hiking in the mountains or reading a good book. Thanks for stopping by my portfolio website, and feel free to reach out if you have any questions or would like to work together on a project!
                </p>
            </div>
        </section>
    );
}
