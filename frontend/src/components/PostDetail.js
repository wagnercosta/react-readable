import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { dataFormatadaFromTimeStamp } from "../utils/utils";


export const PostDetail = ( props ) => { 
        let post = props.post;
        
        return (
            <div className="row mt-2">
                <div className="col-12">
                    <h2>{post.title}</h2>
                </div>
                <div className="col-12">
                    <strong>Author: </strong><i>{post.author}</i>
                </div>
                <div className="col-12 mt-2">
                    <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
                </div>
                <div className="col-12">
                    <small>Category:</small> <span className="badge badge-primary">{post.category}</span>
                    <small className="ml-2">Vote Score:</small> <span className="badge badge-info">{post.voteScore}</span>
                    <small className="ml-2">Date:</small> <span className="badge badge-secondary">{dataFormatadaFromTimeStamp(post.timestamp)}</span>
                </div>
                <div className="col-12 mt-4">
                    <Link to={`/EditPost/${post.id}`}><button className="btn btn-info btn-sm">Edit</button></Link>
                </div>
            </div>
        );
}

