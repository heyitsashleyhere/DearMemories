import React, { useContext, useState } from 'react'
import moment from 'moment'
import { Card, CardHeader, CardActions, CardContent, CardMedia, IconButton, Button, Typography, Menu, MenuItem, Popover, Box} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { PostsContext } from '../../../contexts/PostsContext';


export default function Post({ post }) {
  const { setCurrentId } = useContext(PostsContext)
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
  }

  function handleDelete() {
    console.log('delete :>> ');
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label={post.creator}>
            {post.creator}
          </Avatar>
        }
        action={
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
        } 
        title={post.creator}
        subheader={moment(post.createdAt).fromNow()}
        />

      <CardMedia component="img" src={post.selectedFile} alt={post.title} />
      
      <CardContent>
        <Typography variant='h5' gutterBottom>{post.message}</Typography>
        {/* <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography> */}
        <Typography variant='body2' color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpIcon fontSize="small" />
          Like {post.likeCount}
        </Button>
      </CardActions>
    </Card>
  )
}
