import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignUpPage.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
<App/>
  </StrictMode>
);