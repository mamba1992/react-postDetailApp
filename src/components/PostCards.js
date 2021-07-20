import _ from 'lodash'
import React from 'react'
import PostCard from './PostCard'
import { Card, Segment } from 'semantic-ui-react'

const PostCards = ({posts}) => {
    if (_.isEmpty(posts)){
        return <Segment>
            No Search Results!
        </Segment>
    }
    return (
        <Card.Group itemsPerRow={5} style={{margin:'0'}}>
        {posts && _.map(posts, post => {
            return <PostCard key={post.id} post={post} />
        })}
        </Card.Group>
    )
}

export default PostCards;