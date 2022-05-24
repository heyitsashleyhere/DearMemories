import React,  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PostsContext } from '../../contexts/PostsContext';

import { AppBar, Button, Toolbar, Avatar, Box } from '@mui/material';
import logoIcon from '../../images/love-story.svg';


export default function Navbar() {
    const { isCreate, setIsCreate } = useContext(PostsContext)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const location = useLocation()
    // useEffect(() => {
    //   const token = user?.token

    //   setUser(JSON.parse(localStorage.getItem('profile')))
    // }, [location])
    
    function signOut() {
        localStorage.clear()
        navigate('/')
        setUser(null)
    }

    const styles = {
        appBar: {
            margin: '30px 0',
            borderRadius: '0.2em',
            padding: '0.6em',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#DE2261',
            boxShadow: 1 ,
            // backgroundColor: 'rgb(255, 255, 255, 0)'
          }
      }
      
    return (
        <AppBar position="static" color="inherit" sx={styles.appBar}>

            <Box component={Link} to="/" sx={{ ml: 1}}>
                <img src={logoIcon} alt="Dear Dir Icon" height={50} />
            </Box>
            
            <Button variant="outlined" onClick={() => setIsCreate(!isCreate)}>Create</Button>

            <Toolbar>
                { user ? 
                    <div>
                        <Avatar alt={'username'} src="">
                            {user.result.username.charAt(0)}
                        </Avatar>
                        <Button variant="contained" color="secondary" onClick={signOut}>Sign Out</Button>
                    </div> 
                    : 
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    </div>
                }
            </Toolbar>
            
        </AppBar>
    )
}
