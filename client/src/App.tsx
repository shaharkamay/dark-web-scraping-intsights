import React from 'react';
import { useRecoilState } from 'recoil';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { themeState } from './recoil/theme/atom';

function App() {
  const [theme] = useRecoilState(themeState);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Dashboard />} />

            {/* Add User */}
            {/* <Route path="/user-form" element={<UserForm />} /> */}

            {/* Search */}
            {/* <Route path="/search" element={<Search />} /> */}

            {/* Generate Meal */}
            {/* <Route path="/generate" element={<GenerateMeal />} /> */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
