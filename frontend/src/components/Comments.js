import React from 'react';
import { Button } from 'reactstrap';


const comments = (props) => {
    const comments = props.comments;

    return (
        <div>
            <h4 className="mt-4">Comments</h4>
            <div className="row mt-2">
                {comments.map(comment => 
                    <div key={comment.id} className="col-12">
                        <p><strong>{comment.author}</strong></p>
                        <p>{comment.body}</p>
                        <p><Button color="secondary" onClick={() => props.editCommentHandler(comment)}>Edit</Button></p>
                        <hr />
                    </div>
                )}
            </div>
        </div>
    )
}

export default comments;