import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const location = useLocation();
  const hideNav = ['/login', '/signup'].includes(location.pathname);

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-hb-dark via-[#12131a] to-[#09090d] text-white">
      {hideNav ? (
        routes
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full">
            {routes}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
