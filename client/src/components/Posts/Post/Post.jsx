import React, { useContext, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Card, CardHeader, CardActions, CardContent, CardMedia, IconButton, Button, Typography, Menu, MenuItem, Popover, Box} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { PostsContext } from '../../../contexts/PostsContext';


export default function Post({ post }) {
  const { setCurrentId, setIsCreate, user } = useContext(PostsContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null)
  
  const openFeatures = Boolean(anchorEl);
  const openPopper = Boolean(deleteAnchorEl);

  const handlePopper = (event) => {
    setDeleteAnchorEl(deleteAnchorEl ? null : event.currentTarget);
  };

  const popperId = openPopper ? 'simple-popper' : undefined;

  const handleFeatures = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteAnchorEl(null)
  };

  function handleEdit() {
    setCurrentId(post._id)
    setIsCreate(true)
    setAnchorEl(false)
  }

  function handleDelete() {
    axios({
      method: 'delete',
      url: `http://localhost:5000/posts/${post._id}`,
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    }).then(console.log).catch(console.log)
  }

  function handleLike() {
    axios({
      method: 'patch',
      url: `http://localhost:5000/posts/${post._id}/likePost`,
      data: {},
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    }).then(console.log).catch(console.log)
  }

  // Likes component
  function Likes() {
    if (post.likes.length > 0) {
      return post.likes.find(like => like === (user?.localUser.googleId || user?.localUser._id)) ? 
        <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        :
        <><ThumbUpOffAltIcon fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
    }
    return <><ThumbUpOffAltIcon fontSize='small'/>&nbsp;Like</>
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label={post.user}>
            {post.user}
          </Avatar>
        }
        action={
          user?.localUser?._id === post?.user ?
          <>
            <IconButton aria-label="edit"
                        aria-controls={openFeatures ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openFeatures ? 'true' : undefined}
                        onClick={handleFeatures}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl}
                  open={openFeatures}
                  onClose={handleClose}>
              <MenuItem onClick={handleEdit} ><EditIcon fontSize="small" sx={{ mr: 2 }} color="primary"/>Edit</MenuItem>
              <MenuItem onClick={handlePopper}><DeleteIcon fontSize="small" sx={{ mr: 2 }} color="primary"/>Delete</MenuItem>
              <Popover id={popperId} open={openPopper} anchorEl={deleteAnchorEl} 
                       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                      <Typography sx={{ p: 2 }}>Want this gone forever ever?</Typography>
                      <Box sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" color="success" 
                                startIcon={<CheckCircleIcon/>} sx={{ mb: 1 }}
                                onClick={handleDelete} >YES</Button>
                        <Button variant="outlined" color="error" 
                                startIcon={<CloseIcon/>} sx={{ mb: 1 }}
                                onClick={() => setDeleteAnchorEl(null)} >NO</Button>
                      </Box>     
              </Popover>
            </Menu>
          </>
          : <></>
        } 
        title={post.creator}
        subheader={moment(post.createdAt).fromNow()}
        />

      <CardMedia component="img" src={post.selectedFile} alt={post.title} />
      
      <CardContent>
        <Typography variant='body1' gutterBottom>{post.message}</Typography>
        <Typography variant='body2' color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" disabled={!user?.token} onClick={handleLike}>
          <Likes />
        </Button>
      </CardActions>
    </Card>
  )
}
