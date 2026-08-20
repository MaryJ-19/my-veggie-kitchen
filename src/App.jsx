import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';

import MyNavbar from './components/navbar'
import Banner from './components/banner';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Router basename="/my-veggie-kitchen/"> 
      <RecipeProvider>
        <Banner />
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>

        <button
          type="button"
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Torna in alto"
        >
          ↑
        </button>
      </RecipeProvider>
    </Router>
  )
}

export default App
