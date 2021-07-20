import React, {useState, useEffect } from "react";

import { fetchUser } from "../api/apis";
import { Container, Header, Card, Label, Icon, Image, Loader } from "semantic-ui-react";
import './UserDetail.css'
import { useHistory } from "react-router-dom";

const UserDetail = (props) => {
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const {id} = props.match.params
  const history = useHistory()

  useEffect(() => {
    const fetchUserdetails =  async (id) => {
      const userObj = await fetchUser(id)
      setUserDetails(userObj)
      setIsLoading(false)
  }
  fetchUserdetails(id)
  },[id])

  const {name,email, phone, website,address={}} = userDetails
  const {street, city, suite, zipcode,geo={}} = address

  const openMapLink = (lat,lng) => {
    window.open(`https://maps.google.com?q=${lat},${lng}` );
  }
  return (
    
    <Container style={{marginTop: '20px'}} text>
      <Label as="a" color="blue" onClick={() => history.goBack()} ><Icon link className="arrow return left small" />Back</Label>
      <Header as="h3">User Details</Header>
      {isLoading && !imageLoaded ? <Loader size="medium" active inline="centered" style={{top:"20px"}} />:
      <Card>
        <Image 
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png' 
          alt="Contact pic"
          className={`smooth-image image-${
            imageLoaded ? 'visible' : 'hidden'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <Card.Content>
        <Card.Meta>
          <Label color="blue"><Icon className="male large"/></Label>
          <span>{name}</span>
        </Card.Meta>
        <Card.Meta> 
          <Label color="blue" horizontal><Icon name="phone"/></Label><span>{phone}</span>
        </Card.Meta>
        <Card.Meta>
          <Label color="blue" horizontal><Icon name="mail"/></Label><span>{email}</span>
        </Card.Meta>
        
        <Card.Meta>
        <Label color="blue" horizontal><Icon className="linkify large"/></Label><Label.Detail as="a"><span>{website}</span></Label.Detail>
        </Card.Meta>
        <Card.Meta>
        <Label color="blue" >
          <Icon  className="address card large"/>
        </Label>
          <Label.Detail as="a" onClick={() => openMapLink(geo.lat,geo.lng)}>
          <span>{street},{suite}</span>
          <span>{city},{zipcode}</span>
          </Label.Detail>
          
        </Card.Meta>

        </Card.Content>
      </Card>}
      
    </Container>
  );
};

export default UserDetail;