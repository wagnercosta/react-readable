import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { InputComponent } from './CustomComponents/HtmlComponents';

const commentModal = (props) => {
    const comment = props.comment;
    const editing = props.editing;

    let modalTitle = 'Add Comment'
    if(editing) modalTitle = 'Edit Comment'

    

    return (
                <Formik
                    enableReinitialize
                    initialValues={{
                        body: comment !== undefined && comment.body !== undefined ? comment.body : '',
                        author: comment !== undefined && comment.author !== undefined ? comment.author : '',
                    }}
                    validationSchema={Yup.object().shape({
                        body: Yup.string()
                        .required('Body is required'),
                        author: Yup.string().required('Post author is required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        let commentPost = {}

                        if(!editing)
                        {
                            commentPost = {
                                id: guid(),
                                author: values.author,
                                timestamp: Date.now(),
                                body: values.body,
                                parentId: props.postId
                            }

                            props.addComment(commentPost)
                                .then((retorno) => {
                                props.fetchComment(props.postId);
                                setSubmitting(false);
                                values.author = "";
                                values.body = "";
                                props.toggle();
                            });
                        }
                        else
                        {
                            commentPost = {
                                id: comment.id,
                                author: values.author,
                                timestamp: Date.now(),
                                body: values.body,
                                parentId: props.postId
                            }

                            console.log(commentPost)

                            props.editComment(commentPost)
                                .then((retorno) => {
                                props.fetchComment(props.postId);
                                setSubmitting(false);
                                values.author = "";
                                values.body = "";
                                props.toggle();
                            });

                        }
                

                    }}

                    render={({ isSubmitting, handleReset, handleSubmit, errors, touched, values, handleBlur, setFieldValue }) => (
                        <Modal isOpen={props.modal} toggle={props.toggle} className={props.className}>
                            <ModalHeader toggle={props.toggle}>{modalTitle}</ModalHeader>
                            
                            <Form>
                            <ModalBody>
                                <Field
                                    name="author"
                                    label="Author"
                                    helpmessage="Type here the comment author" 
                                    placeholder="Comment Author"
                                    value={values.author}
                                    component={InputComponent} 
                                    touched={touched}
                                    disabled={props.editing}
                                />
                    
                            <Field
                                name="body"
                                label="Body"
                                helpmessage="Type here the comment body" 
                                placeholder="Comment"
                                value={values.body}
                                component={InputComponent}
                                touched={touched}
                            />
                                </ModalBody>
                                <ModalFooter>
                                    <button type="submit" className="btn btn-primary ml-2">
                                        Submit
                                    </button>
                                    {' '}
                                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>

                        )}
                        />
                    )
}

const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default commentModal;