// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getPosts } from './actions/posts.js';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import logoIcon from './images/love-story-gradient.svg';
// Components:
import Posts from './components/Posts/Posts.jsx';
import Form from './components/Form/Form.jsx';




function App() {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getPosts)
  // }, [dispatch])

  const styles = {
    appBar: {
        borderRadius: '0.5em',
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#DE2261',
        boxShadow: 1 
      }
  }
  

  return (
    <Container maxWidth="lg" className="App">
      <AppBar position="static" color="inherit" sx={styles.appBar}>
        <Typography variant='h3' align='center'>Dear Nikki</Typography>
        <img src={logoIcon} alt="Dear Nikki Icon" height={40}/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>

          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;
