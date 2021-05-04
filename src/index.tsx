import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthProvider } from './lib/contexts/auth';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import 'cropperjs/dist/cropper.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
