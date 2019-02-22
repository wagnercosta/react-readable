import React from 'react';
import { render } from 'react-dom';
import { Card, CardBody, CardTitle, CardText,  CardHeader, CardSubtitle } from 'reactstrap';
import { dataFormatadaFromTimeStamp } from "../utils/utils";

export const CardPost = ( props ) => { 
  let post = props.post;

  return (
    <Card body key={post.id} className="mt-2">
      <CardTitle>{post.title} {props.category}</CardTitle>
      <CardText dangerouslySetInnerHTML={{ __html: post.body }} />
      <CardText>
      <small>Category:</small> <span className="badge badge-primary">{post.category}</span>
      <small className="ml-2">Vote Score:</small> <span className="badge badge-info">{post.voteScore}</span>
      <small className="ml-2">Date:</small> <span className="badge badge-secondary">{dataFormatadaFromTimeStamp(post.timestamp)}</span>
      </CardText>
    </Card>
  );
};

//export default CardPost;

