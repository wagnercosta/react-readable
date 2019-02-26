import React from 'react';
import { render } from 'react-dom';
import { Card, CardBody, CardTitle, CardText,  CardHeader, CardSubtitle } from 'reactstrap';
import { dataFormatadaFromTimeStamp } from "../utils/utils";
import { Link } from 'react-router-dom'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

export const CardPost = ( props ) => { 
  let post = props.post;

  return (
    <Card body key={post.id} className="mt-2">
      <CardTitle>{post.title} {props.category}</CardTitle>
      <CardText tag="div">
        <HTMLEllipsis
          unsafeHTML={post.body}
          maxLine='5'
          ellipsis='...'
          basedOn='letters'
        />
      </CardText>
      <CardText>
        <small>Category:</small> <span className="badge badge-primary">{post.category}</span>
        <small className="ml-2">Vote Score:</small> <span className="badge badge-info">{post.voteScore}</span>
        <small className="ml-2">Date:</small> <span className="badge badge-secondary">{dataFormatadaFromTimeStamp(post.timestamp)}</span>
      </CardText>
      <CardText>
        <Link to={`/EditPost/${post.id}`}><button className="btn btn-info btn-sm">Edit</button></Link>
        <Link to={`/ViewPost/${post.id}`}><button className="btn btn-info btn-sm">View</button></Link>
      </CardText>
    </Card>
  );
};


