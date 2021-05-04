import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Theme from './theme';
import { useAuth } from './lib/contexts/auth';
import { ToastContainer } from 'react-toastify';
import Backdrop from './components/backdrop/backdrop';
import SiteLayout from './layouts/site';
import AuthLayout from './layouts/auth';

const App: React.FC = () => {
  const { isLogin, loading } = useAuth();
  return (
    <Router basename="/">
      <Theme>
        <Backdrop status={loading} />
        <ToastContainer autoClose={3000} rtl pauseOnHover={false} />
        {isLogin === 'FALSE' && <AuthLayout />}
        {isLogin === 'TRUE' && <SiteLayout />}
      </Theme>
    </Router>
  );
};

export default App;
