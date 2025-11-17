'use client';

import styles from '../styles/button.module.css';

export default function Button({ text }: { text: string }) {
    return (
        <div className={styles.buttonPrimary}>
            {text}
        </div>
    );
}