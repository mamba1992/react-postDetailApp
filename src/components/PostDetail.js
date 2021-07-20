import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPost, fetchComment, fetchUser } from "../api/apis";
import { Icon, Label, Container, Header, Loader, Segment, List, Button, Divider } from "semantic-ui-react";
import _ from 'lodash'
import './PostDetail.css'
import AddComment from "./AddComment";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';




const PostDetail = ({posts}) => {
  const [postDetails, setPostDetails] = useState('')
  const [userDetails, setUserDetails] = useState({})
  const [comments,setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, addNewComment] = useState('')
  let history = useHistory()

  const {id} = useParams()
  useEffect(() => {
    const fetchPostdetails =  async (id) => {
      const postObj = await fetchPost(id)
      const userObj = await fetchUser(postObj.userId)
      setPostDetails(postObj)
      setUserDetails(userObj)
      setIsLoading(false)

    }
    fetchPostdetails(id)
  },[id])
  useEffect(() => {
    const fetchCommentDetails =  async (id) => {
      const commentArray = await fetchComment(id)
      const sortCommentArray = _.orderBy(commentArray,'id','desc')
      setComments(sortCommentArray)
      setIsLoading(false)
  }
    fetchCommentDetails(id)
  },[id])

  const addComment = () => {
    const newCommentList = _.concat([{
      postId: id,
      id: uuidv4(),
      name: newComment,
      body: newComment,
      email: userDetails.email
    }], comments)
    setComments(newCommentList)
    addNewComment('')
    toast.success('Comment Added Successfully!',{autoClose:3000})
  }
  
  const deleteComment = (id) => {
    const newCommentList = _.filter(comments,comment => comment.id !== id)
    setComments(newCommentList)
    toast.success('Comment Deleted Successfully!',{autoClose: 3000})
  }

  const handleChange = (event) => {
    addNewComment(event.target.value)
  } 
  return (
    <Container className="postDetailContainer" text>
    <Label as="a" color="blue" onClick={() => history.goBack()} ><Icon link className="arrow return left small" />Back</Label>
    <Header as="h2">Post Details</Header>
    {isLoading ? <Loader size="medium" active inline="centered" style={{top:"20px"}} />:
    <>
    <Segment className="postDetailSegment">
      <List>
        <List.Item>
          <List.Content>
            <List.Header className="commentHeader" as="h3" >{postDetails.title}</List.Header>
            <List.Description className="commentBody">{postDetails.body}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item icon='user' content={`Posted By : ${userDetails.username}`} />
      </List>
    </Segment>
    <Segment>
      <Header as="h2">Comments</Header>
      <Divider fitted/>
      <List>
      {_.map(comments, comment => {
            return (
              
              <List.Item key={comment.id}>
          <List.Content>
            <List.Header className="commentHeader" as="h3" >{comment.name}</List.Header>
            <List.Description className="commentBody">{comment.body}</List.Description>
          </List.Content>
        
        <List.Content className="commentActions">
          <List.Header as="h4" ><Icon name="user" />Posted By: {comment.email}</List.Header>
          <Button primary negative className="tiny" onClick={() => deleteComment(comment.id)}>Delete</Button>
        </List.Content>
        <Divider/>
        </List.Item>
        
        
            )
        })}
      </List>
    </Segment>
    <Segment>
      <AddComment
      value={newComment}
      onChange={handleChange}
      onAdd={addComment}
      />
      <ToastContainer />
    </Segment>
    </>
  }
    </Container>
  );
};

export default PostDetail;