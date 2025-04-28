import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Routes from './routes/Routes.jsx';
import { AuthProvider } from './components/context/AuthContext'; // <-- thêm AuthProvider
import './App.scss';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';

function Layout() {
  return (
    <>
      <Header />
      <Routes />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* <-- Bọc toàn bộ app bằng AuthProvider */}
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
