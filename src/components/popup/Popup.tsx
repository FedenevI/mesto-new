import { useEffect } from 'react';
import styles from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const Popup = ({isOpen, onClose, children}: PopupProps) => {
    
    useEffect(() => {
        if(!isOpen) return
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                  onClose(false);
            }};
            document.addEventListener('keydown', handleEscKey);
            return () => {
                document.removeEventListener('keydown', handleEscKey);
            };
      }, [isOpen, onClose]);


    return (
        <div className={`${styles['popup']} ${isOpen ? styles['popup--active'] : ''}`} onClick={() => onClose(false)}>
            <div className={styles['popup__container']}>
                <div className={`${styles['popup__content']} ${isOpen ? styles['popup__content--active'] : ''}`} onClick={e => e.stopPropagation()}>
                    {children} 
                </div>
                <button className={styles['popup__close-button']} onClick={() => onClose(false)}/>
            </div>
        </div>
    )
}