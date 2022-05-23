import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import { PostsContext } from '../../contexts/PostsContext'


export default function Form() {
  const { posts, currentId, setCurrentId } = useContext(PostsContext)
  const [ postData, setPostData ] = useState( 
    { creator: '', message: '', tags: '', selectedFile: '' })

  const editPost = posts.find(p => p._id === currentId)
  
  useEffect(() => {
    if(editPost) {
      setPostData(editPost)
    }
  }, [currentId])
  

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file)
    setPostData({...postData, selectedFile: base64})
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    if(currentId) {
      axios({
        method: 'patch',
        url: `http://localhost:5000/posts/${currentId}`,
        data: postData
      }).then(console.log).catch(console.log)
      setPostData({creator: '', message: '', tags: '', selectedFile: '' })
      setCurrentId(null)
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/posts',
        data: postData
      }).then(console.log).catch(console.log)
      setPostData({creator: '', message: '', tags: '', selectedFile: '' })
    }

  }

  function clearBtn() {
    setPostData({creator: '', message: '', tags: '', selectedFile: '' })
    setCurrentId(null)
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Typography variant='h6' textAlign='center'>{currentId ? 'Edit a Memory':'Create a Memory'}</Typography>
        <TextField name='creator' variant='outlined' label="Creator" fullWidth 
                   value={postData.creator} margin="dense"
                   onChange={e => setPostData({ ...postData, creator: e.target.value })}/>
        <TextField name='message' variant='outlined' label="Message" fullWidth 
                   value={postData.message} margin="dense"
                   onChange={e => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name='tags' variant='outlined' label="Tags" fullWidth 
                   value={postData.tags} margin="dense"
                   onChange={e => {
                     const removeSpaces = e.target.value.replace(/\s+/g, '')
                     const toArray = removeSpaces.split(',')
                     setPostData({ ...postData, tags: toArray })}}/>
        <Box className="fileInputWrapper" sx={{ my: 2 }}>
          <input type="file" accept=".jpeg, .png, .jpg"
                 onChange={(e) => handleFileUpload(e)}
        />
        </Box>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth sx={{ mt: 0.5 }}
                onClick={clearBtn}>Clear</Button>
      </form>
    </Paper>
  )
}
