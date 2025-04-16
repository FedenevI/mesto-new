import { useState } from 'react';
import { ICard } from '../../../../interfaces';
import { useAppSelector } from '../../../../store/store';
import styles from './Card.module.scss';
import stylesPopup from '../../../popup/Popup.module.scss';
import { 
    useAddLikeMutation,
    useDeleteCardMutation,
    useDeleteLikeMutation,
} from '../../../../store/services/cardsApi';
import { Popup } from '../../../popup/Popup';


interface CardProps {
    card: ICard; 
};

export const CardItem = ({ card }: CardProps) => {
    const currentUser = useAppSelector(state => state.user.user);
    const [isLiked, setIsLiked] = useState(card.likes.some(like => like._id === currentUser?._id));
    const [isCount, setIsCount] = useState(card.likes.length);
    const [deleteLike] = useDeleteLikeMutation();
    const [addLike] = useAddLikeMutation();
    const [deleteCard, {isSuccess}] = useDeleteCardMutation();

    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

    const handleClickTrash = async () => {
        try {
            await deleteCard(card._id)
        } catch (err) {
            console.error('Ошибка при удалении карточки:', err);
        }
    };

    const handleToggleLike = async () => {
        const action = isLiked ? deleteLike : addLike;
        try {
            const res = await action(card._id).unwrap();
            const newIsLiked = res.likes.some(like => like._id === currentUser?._id);
            setIsLiked(newIsLiked);
            setIsCount(res.likes.length);
        } catch (err) {
            console.error(`Ошибка ${isLiked ? 'удаления' : 'добавления'} лайка:`, err);
        }
    };

    const isOwnCard = currentUser?._id === card.owner._id;

    return(
        <article className={styles.card}>
            {isOwnCard && 
                <button 
                    className={styles['card-trash-btn']}
                    type='button'
                    aria-label='Удалить карточку'
                    onClick={() => setIsDeleteCardPopupOpen(true)}
                />
            }

            <img 
                className={styles['card-img']} 
                src={card.link} 
                alt={card.name} 
                loading='lazy'
                onClick={() => setIsImagePopupOpen(true)}
            />

            <div className={styles['card-info-section']}>
                <h2 className={styles['card-name']}>{card.name}</h2>
                <div className={styles['card-like-section']}>
                    <button 
                        type="button"
                        aria-label={isLiked ? 'Удалить лайк' : 'Добавить лайк'}
                        onClick={handleToggleLike}
                        className={isLiked 
                            ? styles['card-like-btn-active'] 
                            : styles['card-like-btn']
                        }
                    />
                    <span className={styles['card-like-counter']}>
                        {isCount}
                    </span>
                </div>
            </div>

            <Popup isOpen={isDeleteCardPopupOpen} onClose={setIsDeleteCardPopupOpen}>
                <h3 className={stylesPopup['popup-title']}>Вы уверены?</h3>
                <button
                 className={stylesPopup['popup-button']}
                 onClick={handleClickTrash}
                >
                {isSuccess ? 'Удаление...' : 'Удалить?'}
                </button>
            </Popup>

            <Popup isOpen={isImagePopupOpen} onClose={setIsImagePopupOpen}>
                 <img className={stylesPopup['popup-image']}
                    src={card.link} 
                    alt={card.name} 
                 />
                 <p className={stylesPopup['popup-image-title']}>{card.name}</p>
            </Popup>

        </article>
    );
};

