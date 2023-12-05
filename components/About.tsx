import styles from '../styles/About.module.css';

// Import React and styles
import React from 'react';

// Functional component for the About section
const About = () => {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>About Me</h2>
                <br /><br />
                <p className={styles.paragraph}>
                    Greetings to All,
                </p>
                <br />
                <p className={styles.paragraph}>
                    I go by the name Tom, and I'm a 23-year-old developer fueled by motivation, dedication, and a genuine passion for my craft. My expertise spans various programming languages and frameworks, including C, Python, C++, Haskell, JavaScript, TypeScript, React, Next, Go, Rust, DreamBerd3, HTML, and CSS.
                </p>
                <p className={styles.paragraph}>
                    Armed with my skills and experience, I am confident in my ability to assist businesses and individuals in crafting exceptional web-based solutions. Whether it's developing intricate web applications, designing responsive websites, or optimizing user experiences, I navigate it all effortlessly.
                </p>
                <br />
                <p className={styles.paragraph}>
                    Recognizing the dynamic nature of the industry, I prioritize staying abreast of the latest trends and technologies. This commitment drives me to seek fresh challenges and opportunities, fostering continuous professional growth.
                </p>
                <br />
                <p className={styles.paragraph}>
                    In search of a skilled and dedicated web developer committed to delivering outstanding results? Look no further. I'm eager to learn about your project and explore how I can contribute to your success.
                </p>
                <p className={styles.paragraph}>
                    Thank you for considering me for your endeavors.
                </p>
            </div>
        </section>
    );
};

// Export the About component as the default
export default About;
