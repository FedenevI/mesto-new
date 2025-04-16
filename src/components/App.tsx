import './App.css';
import { useGetCardsQuery} from '../store/services/cardsApi';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { useGetUserInfoQuery } from '../store/services/userApi';
import { Footer } from './footer/Footer';

export const App: React.FC = () => {
  useGetUserInfoQuery();
  useGetCardsQuery();

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};


