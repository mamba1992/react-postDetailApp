import React, {Component} from 'react'
import _ from 'lodash'
import { Container, Header, Loader, Segment, Button } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts } from '../api/apis';
import Searchbar from './Searchbar';
import PostCards from './PostCards';
import './PostList.css'

class PostList extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            prev: 0,
            next : 10,
            hasMore : true,
            current : [],
            searchTerm : '',
            filterSearch : [],
            isLoading : true,
        }
    }

    componentDidMount() {
        this.getPosts()
    }


    getPosts = async() => {
        const posts = await fetchPosts()
        this.setState(({
         posts,
         hasMore: true,
         isLoading: false
        }),() => {
            this.updateCurrent()
        })
    }
    updateCurrent = () => {
        const {posts, prev,next} = this.state
        this.setState({
            current : posts.slice(prev,next)
        })
    }

    updateCount = () => {
        this.setState((prevState) => ({
            prev : prevState.prev + 10,
            next: prevState.next + 10
        }))
    }

    getMoreData = () => {
        const {current,posts,prev,next} = this.state
        if (current.length === posts.length){
            this.setState({
                hasMore : false
            })
            return;
        }
        setTimeout(() => {
            
            this.setState({
                current : current.concat(posts.slice(prev + 10, next + 10))
            },() => this.updateCount())
            
        },1000)

    }
    handleSearch = (term) => {
        const { current} = this.state
        this.setState({
            searchTerm : term
        })
        let postsArr = _.map(current,post => {
            return {
                userId: post.userId,
                id: post.id,
                title: post.title.toLowerCase(),
                body: post.body
            }
        })
        if (term.length > 0){
            let updatedPosts = []
            updatedPosts = _.filter(postsArr, (post) => post.title.includes(term.toLowerCase()))
            console.log(updatedPosts,'updatedPosts')
            this.setState({
                filterSearch: updatedPosts
            })
        } else {
            this.setState({
                filterSearch : current
            })
        }
        
    }

    render () {
        const {searchTerm, current, hasMore, filterSearch, isLoading } = this.state
        return (
            <Container className="postListContainer">
                <Segment basic className="headerContainer">
                <Header as="h1" className="postListHeader">List of Posts</Header>
                <Button primary onClick={(e) => e.preventDefault()}>
            Add Post
          </Button>
                </Segment>
                
                <Searchbar value={searchTerm} onSearch={e => this.handleSearch(e.target.value)}/>
                {isLoading ? <Loader size="medium" active inline="centered" style={{top:"20px"}} />
                 : searchTerm.length > 0 ? 
                    <PostCards posts={filterSearch}/> : 
                <InfiniteScroll
                    dataLength={current.length}
                    next={this.getMoreData}
                    hasMore={hasMore}
                    loader={<h3>...Loading</h3>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                >
                <PostCards posts={current}/>
                </InfiniteScroll>
                }
                
                
            </Container>
        )
    }   
}

export default PostList;