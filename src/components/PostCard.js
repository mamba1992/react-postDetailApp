import React, {useState, useEffect} from "react";
import _ from 'lodash'
import { Card, Button } from "semantic-ui-react";
import { fetchUser } from "../api/apis";
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
    const [userDetails, setUserDetails] = useState('')
    useEffect(() => { 
        const fetchUserdetails =  async (id) => {
            const userObj = await fetchUser(id)
            setUserDetails(userObj)
        }
        fetchUserdetails(post.userId)
    }, [post.userId])

  return (
      <Card as={Link} to={{pathname: `/post/${post.id}`}} >
        <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>Posted By <Link to={{
              pathname: `/user/${post.userId}`,
              state: {userDetails}
            }}>{userDetails.name}</Link></Card.Meta>
            <Card.Description>
            {_.truncate(post.body, {
              'length': 100
            })}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color='red' onClick={(e) => e.preventDefault()}>
            Delete Post
          </Button>
      </Card.Content>
      </Card>
  );
};

export default PostCard;