import {Profile} from "./profile/Profile";
import { CardsGallery } from './cardsGallery/CardsGallery';
import styles from './Main.module.scss';


export const Main: React.FC =() => {
 
  return (
    <main className={styles['main']}> 
        <Profile />
        <CardsGallery />
    </main>
  )
}
