import React, { useContext } from 'react'
import { Grid, CircularProgress, Grow } from '@mui/material'
// Component
import Post from './Post/Post.jsx'
import { PostsContext } from '../../contexts/PostsContext.jsx'




export default function Posts() {

  const { posts } = useContext(PostsContext)
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grow in>
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map(post => (
            <Grid key={post._id} container item xs={12} sm={4} md={3}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
      </Grow>
    )
  )
}
