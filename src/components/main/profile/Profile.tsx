import { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import styles from './Profile.module.scss';
import { Popup } from '../../popup/Popup';
import { AvatarForm } from '../../forms/AvatarForm';
import { ProfileForm } from '../../forms/ProfileForm';
import { AddCardForm } from '../../forms/AddCardForm';

export const Profile: React.FC = () => {
  const user = useAppSelector(state => state.user.user);

  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isProfileEditPopupOpen, SetIsProfileEditPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  return (
    <>
    <section className={styles['profile']}>
      <button className={styles['profile-avatar-btn']} onClick={() => setIsAvatarPopupOpen(true)}>
          <img className={styles['profile-avatar-img']} src={user?.avatar} alt='аватар' />
      </button>
      <div className={styles['profile-info']}>
          <h1 className={styles['profile-info-name']}>{user?.name}</h1>
          <p className={styles['profile-info-profession']}>{user?.about}</p>
          <button className={styles['profile-info-btn']} onClick={() => SetIsProfileEditPopupOpen(true) }
          />
      </div>
      <button  className={styles['profile-add-btn']} onClick={()=> setIsAddCardPopupOpen(true)}/>
    </section>

    <Popup isOpen={isAvatarPopupOpen} onClose={() => setIsAvatarPopupOpen(false)}>
      <AvatarForm onClose={() => setIsAvatarPopupOpen(false)}/>
    </Popup>

    <Popup isOpen={isProfileEditPopupOpen} onClose={() => SetIsProfileEditPopupOpen(false)}>
      <ProfileForm onClose={() => SetIsProfileEditPopupOpen(false)}/>
    </Popup>

    <Popup isOpen={isAddCardPopupOpen} onClose={() => setIsAddCardPopupOpen(false)}>
      <AddCardForm onClose={() => setIsAddCardPopupOpen(false)}/>
    </Popup>
    </>
  )
}