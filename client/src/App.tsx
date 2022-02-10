import React from 'react';
import { useRecoilState } from 'recoil';
import { Routes, BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { themeState } from './recoil/theme/atom';
import { routes } from './utils/globals';

function App() {
  const [theme] = useRecoilState(themeState);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>{routes && routes.map((route) => route.element)}</Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
