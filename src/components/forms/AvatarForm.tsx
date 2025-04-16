import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../popup/Popup.module.scss';
import { useSetInfoAvatarMutation } from '../../store/services/userApi';

type AvatarFormData = {
  avatarUrl: string;
};

type AvatarFormProps = {
  onClose: () => void; 
};

export const AvatarForm = ({ onClose }: AvatarFormProps) => {
 
  const [setAvatar, { isLoading }] = useSetInfoAvatarMutation();
  const { register, handleSubmit, formState: { errors, isValid}, reset } = useForm<AvatarFormData>({
    mode: 'onChange',
  });

  const handleSaveAvatar:SubmitHandler<AvatarFormData> = async (data) => {
    try {
      await setAvatar({ avatar: data.avatarUrl }).unwrap();
      onClose(); 
      reset();
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error);
    }
  };

  return (
    <>
      <h3 className={styles['popup-title']}>Обновить аватар</h3>
      <form className={styles['popup-form']} onSubmit={handleSubmit(handleSaveAvatar)}>
        <input 
          className={`${styles['popup-input']} ${errors.avatarUrl ? styles['popup-input-error'] : ''}`}
          type='url' 
          placeholder='Ссылка на картинку'
          {...register('avatarUrl', { 
            required: 'Это поле обязательно',
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: 'Пожалуйста, введите корректный URL'
            }
          })}
        />
        <span className={styles['popup-error-message']}>{errors.avatarUrl?.message}</span>
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

