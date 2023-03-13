import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreOFDataCotextProvider } from './context/StoreOfDataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <StoreOFDataCotextProvider>
    <App />
    </StoreOFDataCotextProvider>

);



