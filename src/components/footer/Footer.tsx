import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
    return (
      <footer className={styles['footer']}>
        <p className={styles['footer__author']}>Russia Mesto</p>
      </footer>
    );
};

