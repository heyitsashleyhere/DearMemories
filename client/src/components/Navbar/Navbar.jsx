import React,  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PostsContext } from '../../contexts/PostsContext';
import { AppBar, Button, Toolbar, Avatar, Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import logoIcon from '../../images/love-story.svg';

const settings = ['Profile', 'Sign Out'];

export default function Navbar() {
    const { isCreate, setIsCreate, user, setUser } = useContext(PostsContext)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      const token = user?.token

      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if(setting === settings[1]) {
            localStorage.clear()
            navigate('/auth')
            setUser(null)
        }
    };


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

            <Box component={Link} to="/">
                <img src={logoIcon} alt="Dear Memories Icon" height={50} />
            </Box>
            <Typography variant="h6" noWrap component="a" href="/"
                        sx={{ display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                            }} >DEAR MEMORIES</Typography>

            <Toolbar disableGutters>
                { user ? 
                    <Box sx={{ flexGrow: 0 }}>
                        <Button variant="contained" 
                                sx={{ mr: 1, display: 'inline-block' }}
                                onClick={() => setIsCreate(!isCreate)}>Create</Button>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="profile" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    : 
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    </div>
                }
            </Toolbar>
            
        </AppBar>
    )
}
