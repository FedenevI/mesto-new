import { useAppSelector } from '../../../store/store';
import {CardItem} from './card/CardItem';
import styles from './CardsGallery.module.scss';

export const CardsGallery: React.FC = () => {
  
  const cards = useAppSelector(state => state.cards.cards);

  return (
    <section className={styles['cards']}>
      {cards.map(card => (
        <CardItem card={card} key={card._id}/>
      ))}
    </section>
  );
}

