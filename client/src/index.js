import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PostsContextProvider from './contexts/PostsContext.jsx'
import App from './App.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <PostsContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PostsContextProvider>
)
