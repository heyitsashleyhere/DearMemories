import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PostsContextProvider from './contexts/PostsContext.jsx'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <PostsContextProvider>
        <App />
    </PostsContextProvider>
)
