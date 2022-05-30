import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
// MUI
import { Avatar, Button, Paper, Grid, Typography, Container, Grow, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// Component and style:
import Input from './Input.jsx';
import './style.css'

const initialFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export default function Auth() {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [alert, setAlert] = useState("")
    const navigate = useNavigate()

    

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    function handleSubmit(e){
        e.preventDefault()
        // console.log('formData :>> ', formData);
        if(isSignUp) {
            axios({
                method: 'post',
                url: `http://localhost:5000/users/signup`,
                data: formData
              }).then(result => {
                const token = result.data.token
                const localUser = result.data.result
                localStorage.setItem('profile', JSON.stringify({token, localUser}))
                navigate('/') 
              }).catch(error => setAlert(error.response.data.message))
        } else {
            axios({
                method: 'post',
                url: `http://localhost:5000/users/signin`,
                data: formData
              }).then(result => {
                //   console.log(result);
                if(result.data.token) {
                    const token = result.data.token
                    const localUser = result.data.result
                    localStorage.setItem('profile', JSON.stringify({token, localUser}))
                    navigate('/') 
                } else {
                    navigate('/auth') 
                    setAlert(result.data.message)
                    console.log('result :>> ', result.data.message)
                }
               
              }).catch(error => setAlert(error.response.data.message))
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    function switchMode() {
        setAlert("")
        setIsSignUp(!isSignUp)
        setShowPassword(false)
    }

    async function googleSuccess(res){
        const result = res?.profileObj; //optional chaining
        const token = res?.tokenId;
        try {
            localStorage.setItem('profile', JSON.stringify({result, token}))
            // axios({
            //     method: 'post',
            //     url: `http://localhost:5000/auth`,
            //     data: postData
            //   }).then(console.log).catch(console.log)
            navigate('/')
        } catch (error) {
            console.log('error from googleLogin :>> ', error);
        }
    }

    function googleFailure(error){
        console.log("Google sign in was unsuccessful. Try again later", error);
    }
    
    return (
        <Grow in>
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', p:2}} >
                <Avatar sx={{backgroundColor:'#7B1FA2'}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" sx={{mt:1, mb:2}}>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" autoFocus />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} autoFocus />
                        {
                            isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' autoFocus />
                        }
                    </Grid>

                    {alert && <Alert severity="error" sx={{mt:2}} onClose={() => {setAlert("")}}>{alert}</Alert>}
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt:2, mb:1}}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                    
                    <GoogleLogin
                            className="googleBtn"
                            clientId="55269583172-86822ddrkfmk6sd4lnff8e1hdoq4ovh2.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                    />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} className="linkBtn">
                                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
                        
        </Container>
        </Grow>
    )
}
