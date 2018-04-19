import PropTypes from 'prop-types';
import React,{ Component } from "react"
import {connect} from "react-redux"
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from "../actions"

import Picker from "../components/Picker"
import Posts from "../components/Posts"

class AsyncApp extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {dispatch,selectedsubreddit} = this.props
        dispatch(fetchPostsIfNeeded(selectedsubreddit))
    }
    handleChange = ()=>{

    }

    handleRefreshClick = ()=>{

    }
    render(){
        const {selectedsubreddit,posts,isFetching,lastUpdated} = this.props
        return (
            <div>
                <Picker value={selectedsubreddit}
                        onChange = {
                            this.handleChange
                        }
                        options = {['reactjs','frontend']}>
                        
                </Picker>
                <p>
                    {lastUpdated&&
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString}
                        </span>
                    }
                    {!isFetching&&
                        <a href="#" 
                            onClick={this.handleRefreshClick}>
                            Refresh
                        </a>
                    }
                </p>
                {isFetching&&posts.length===0&&
                    <h2>Loading...</h2>
                }
                {!isFetching&&posts.length===0&&
                    <h2>Empty</h2>
                }
                {posts.length>0&&
                    <div style={{opacity:isFetching?0.5:1}}>
                        <Posts posts={posts}></Posts>
                    </div>
                }
            </div>
        )

    }
}
AsyncApp.propTypes = {
    selectedsubreddit:PropTypes.string.isRequired,
    posts:PropTypes.array.isRequired,
    isFetching:PropTypes.bool.isRequired,
    lastUpdated:PropTypes.number,
    dispatch:PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    const { selectedsubreddit,postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items:posts
    } = postsBySubreddit[selectedsubreddit] || {
        isFetching:true,
        items:[]
    }
    return {
        selectedsubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)