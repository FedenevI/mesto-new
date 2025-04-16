import { useForm } from 'react-hook-form';
import styles from '../popup/Popup.module.scss'
import { useAddNewCardMutation } from '../../store/services/cardsApi';

type AddCardFormData = {
    imageTitle: string;
    imageUrl: string;
}

type AddCardFormProps = {
    onClose: () => void; 
  };

export const AddCardForm = ({ onClose }: AddCardFormProps) => {

  const [addNewCard, { isLoading }] = useAddNewCardMutation();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<AddCardFormData>({
    mode: 'onChange',
  });

  const handleSaveAddCard = async (data: AddCardFormData) => {
    try {
      await addNewCard({name: data.imageTitle, link: data.imageUrl})
      onClose();
      reset();
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error);
    }
  }
 
  return (
    <>
    <h3 className={styles['popup-title']}>Новое место</h3>
    <form className={styles['popup-form']} onSubmit={handleSubmit(handleSaveAddCard)}>
      <input
        className={`${styles['popup-input']} ${errors.imageTitle ? styles['popup-input-error'] : ''}`}
        type='text'
        placeholder='Название'
        {...register('imageTitle', { 
          required: 'Это поле обязательно',
          minLength: {
            value: 2,
            message: 'минмум 2 символа'
          },
          maxLength: {
            value: 30,
            message: 'максимум 30  символов'
          }
        })}
      />
      <span className={styles['popup-error-message']}>{errors.imageTitle?.message}</span>

      <input 
        className={`${styles['popup-input']} ${errors.imageUrl ? styles['popup-input-error'] : ''}`}
        type='url'
        placeholder='Ссылка на картинку'
        {...register('imageUrl', { 
          required: 'Это поле обязательно',
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            message: 'Пожалуйста, введите корректный URL'
          }
        })}
      />
      <span className={styles['popup-error-message']}>{errors.imageUrl?.message}</span>

      <button 
        className={`${styles['popup-button']} ${!isValid ? styles['popup-button-disabled'] : ''}`}
        type='submit'
        disabled={!isValid}
        >
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
    </>
  );
};
