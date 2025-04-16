import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
        <div className={styles['header-logo']}></div>
        <div className={styles['header-login-section']}>
            <p className={styles['header-email']}>email</p>
            <p className={styles['header-button']}>Exit</p>
        </div>
    </header>
  );
};

