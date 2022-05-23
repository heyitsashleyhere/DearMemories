import * as api from '../api'

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        console.log('data :>> ', data);
        dispatch({ type: 'FETCH_ALL', posts: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        console.log('post :>> ', post);
        const { data } = await api.createPost(post)
        console.log('data :>> ', data);
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}