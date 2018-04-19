import fetch from "cross-fetch"
export const SELECT_SUBREDDIT = "SELLECT_SUBREDDIT"
/**
 * 用户选择要显示的subreddit
 * 
 * @export
 */
export function selectSubreddit(subreddit){
    return {
        type:SELECT_SUBREDDIT,
        subreddit
    }
}
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT"
/**
 * 按"刷新"按钮来更新它
 * 
 * @export
 * @param {any} subreddit 
 * @returns 
 */
export function invalidatesubreddit(subreddit){
    return {
        type:INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export const REQUEST_POSTS = "REQUEST_POSTS"
/**
 * 发送请求时的action函数
 * 
 * @export
 * @param {any} subreddit 
 * @returns 
 */
export function requestPosts(subreddit){
    return {
        type:REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = "RECEIVE_POSTS"
/**
 * 收到请求的action创建函数
 * 
 * @export
 * @param {any} subreddit 
 * @param {any} json 
 * @returns 
 */
export function receivePosts(subreddit,json){
    return {
        type:RECEIVE_POSTS,
        subreddit,
        posts:json.data.children.map(child=>child.data),
        receivedAt:Date.now()
    }
}

export const fetchPosts = (subreddit)=>{
    return (dispatch) => {
        dispatch(requestPosts(subreddit))
        /**
         * thunk middle 调用的函数可以有返回值，他会被
         * 当做dispatch的返回值进行传递
         */
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
               .then(
                   response => response.json(),
                   error => console.log("An error occurred:",error)
               )
               .then(
                   json=>dispatch(receivePosts(subreddit,json))
               )
    }
}

const shouldFetchPosts = (state,subreddit) => {
    const posts = state.postsBySubreddit[subreddit]
    if(!posts){
        return true
    }else if(posts.isFetching){
        return false
    }else{
        return posts.didInvalidate
    }
}
export const fetchPostsIfNeeded = (subreddit)=>{
// 当缓存的值是可用时， 减少网络请求很有用。
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),subreddit)){
            return dispatch(fetchPosts(subreddit))
        }else{
            return Promise.resolve()
        }
    }
}