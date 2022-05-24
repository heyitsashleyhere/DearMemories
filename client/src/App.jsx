import { useContext } from 'react';
import { Container, SwipeableDrawer } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// Components:
import Posts from './components/Posts/Posts.jsx';
import Form from './components/Form/Form.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Auth from './components/Auth/Auth.jsx';
// Context:
import { PostsContext } from './contexts/PostsContext';
// Style
import './index.css'







function App() {
  const { isCreate, setIsCreate } = useContext(PostsContext)

  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsCreate(state);
  };

  return (
    <Container maxWidth="lg" className="App">
      <Navbar />
      <Routes >
        <Route path="/" element={<Posts />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
      <SwipeableDrawer anchor='right' open={isCreate}
                       onClose={toggleDrawer(false)}
                       onOpen={toggleDrawer(true)} >          
            <Form />
      </SwipeableDrawer>
    </Container>
  )
}

export default App;
