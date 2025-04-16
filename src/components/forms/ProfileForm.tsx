import { useForm } from 'react-hook-form';
import styles from '../popup/Popup.module.scss'
import { useSetInfoProfileMutation } from '../../store/services/userApi';
import { useAppSelector } from '../../store/store';
import { useEffect } from 'react';


type ProfileFormData = {
  userName: string;
  userDescription: string;
};

type ProfileFormProps = {
  onClose: () => void; 
};

export const ProfileForm = ({ onClose }: ProfileFormProps) => {
  const user = useAppSelector(state => state.user.user);
  const [setUserInfo, {isLoading}] = useSetInfoProfileMutation();
  const { register, handleSubmit, formState: { errors, isValid}, reset, watch} = useForm<ProfileFormData>({
    mode: 'onChange',
  });

  const currentValues = watch();
  const hasChanges = 
    currentValues.userName !== user?.name || 
    currentValues.userDescription !== user?.about;

  const handleSaveProfile = async (data: ProfileFormData) => {
    try {
      await setUserInfo({ name: data.userName, about:data.userDescription });
      onClose();
      reset();
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error);
    }
  }

  useEffect(() => {
    reset({
      userName: user?.name || '',
      userDescription: user?.about || ''
    });
  }, [user, reset]);

  return (
    <>
    <h3 className={styles['popup-title']}>Редактировать профиль</h3>
    <form className={styles['popup-form']} onSubmit={handleSubmit(handleSaveProfile)}>

      <input
        className={`${styles['popup-input']} ${errors.userName ? styles['popup-input-error'] : ''}`}
        type="text" 
        placeholder='Имя'
        {...register('userName', { 
          required: 'Это поле обязательно',
          minLength: {
            value: 2,
            message: 'Не меньше 2 символов'
          },
          maxLength: {
            value: 30,
            message: 'Не больше 30 символов'
          }
        })}
      />
      <span className={styles['popup-error-message']}>{errors.userName?.message}</span>

      <input
        className={`${styles['popup-input']} ${errors.userDescription ? styles['popup-input-error'] : ''}`}
        type="text" 
        placeholder='О себе'
        {...register('userDescription', { 
          required: 'Это поле обязательно',
          minLength: {
            value: 2,
            message: 'Не меньше 2 символов'
          },
          maxLength: {
            value: 30,
            message: 'Не больше 30 символов'
          }
        })}
      />
      <span className={styles['popup-error-message']}>{errors.userDescription?.message}</span>
      
      <button 
        className={`${styles['popup-button']} ${!isValid || !hasChanges ? styles['popup-button-disabled'] : ''}`}
        type='submit'
        disabled={!isValid || !hasChanges} 
        >
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
    </>
  );
};

