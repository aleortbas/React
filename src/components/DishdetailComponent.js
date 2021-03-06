import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label,
     Row, Col, Modal, ModalHeader, ModalBody} from "reactstrap";

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components'


const required = (val) => val && val.length;
const maxLenght = (len) => (val) => !(val) || (val.length <= len);
const minLenght = (len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component{

    constructor(props) { 
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) { 
        
        this.props.postComment( this.props.dishId, values.rating, values.name, values.comment );
    }

    render() {
        
        return(
            <React.Fragment>

                <Button onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    submit comment
                </ModalHeader>
                <ModalBody>


                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        
                        <Row className="form-group">
                            <Label>Rating</Label>
                            <Col md={10}>
                                <Col>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control"
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>    
                                </Col>
                                <Errors 
                                className="text-danger"
                                model=".rating"
                                show="touched"
                                messages={{
                                    required: 'Required'
                                }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                placeholder="Name"
                                className="form-control"
                                validators={{
                                    required, minLenght: minLenght(3), maxLenght: maxLenght(30)
                                }}/>
                                <Errors 
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'Required'
                                }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                        <Label>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                placeholder="Comment"
                                className="form-control"
                                validators={{
                                    required
                                }}/>
                                <Errors 
                                className="text-danger"
                                model=".comment"
                                show="touched"
                                messages={{
                                    required: 'Required'
                                }}
                                />
                            </Col> 
                        </Row>

                        <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary" id="submitComt">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>    
        )
    }

}


    function RenderDish({dish}) {

        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform in 
                        trasnformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />  
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({  comments, postComment, dishId }){
        if (comments == null) {
            return (<div></div>)
        }
       
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                </ul>
                <CommentForm 
                    dishId={dishId} 
                    postComment={postComment} 
                />
            </div>
        )
    }


    const DishDetail = (props) =>{

        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else if (props.dish != null) {
            return (
                <div className='container'>
                    <div className='row'>
                        
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                        
                        <RenderDish dish={props.dish} />
                        <RenderComments dish={ props.dish } comments={ props.comments } 
                            postComment={ props.postComment }
                            dishId={ props.dish.id }
                        />
                        
                    </div>
                </div>
            ) 
        }
    }


export default DishDetail;