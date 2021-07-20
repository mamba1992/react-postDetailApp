import _ from 'lodash'
import jsonplaceholder from './jsonplaceholder'


export const fetchPosts = async () => {
    try {
    const resp = await jsonplaceholder.get("/posts");
    const posts = await resp.data
    return posts
    } catch (e) {
        console.log(e)
    }
}

export const fetchUser = _.memoize(async (id) => {
    try {
    const resp = await jsonplaceholder.get(`users/${id}`)
    const userObj = await resp.data
    return userObj
    } catch (e) {
        console.log(e)
    }
})

export const fetchPost = async (id) => {
    try {
        const resp = await jsonplaceholder.get(`posts/${id}`)
        const postDetails = await resp.data
        return postDetails
    } catch(e) {
        console.log(e)
    }
}

export const fetchComment = _.memoize(async (id) => {
    try {
        const resp = await jsonplaceholder.get(`posts/${id}/comments`)
        const postDetails = await resp.data
        return postDetails
    } catch(e) {
        console.log(e)
    }
})
