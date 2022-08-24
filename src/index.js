import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';

// import BigPicture from './components/Overlay/Overlay.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('portal-root')).render(
//   <React.StrictMode>{<BigPicture />}</React.StrictMode>
// );
