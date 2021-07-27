import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label,
     Row, Col, Modal, ModalHeader, ModalBody} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import reactDom from "react-dom";

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
        //console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' +JSON.stringify(values));
    }

    render() {
        
        return(
            <React.Fragment>

                <Button onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleCommentFormModal}>
                    submit comment
                </ModalHeader>
                <ModalBody>


                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        
                        <Row className="form-group">
                            <Label>Rating</Label>
                            <Col md={10}>
                                <Col>
                                    <Control.select model=".contactType" name="contactType"
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
                                    required: 'Required',
                                    minLenght: 'Must be grater than 2 charachters',
                                    maxLenght: 'Must be 15 charachters or less'
                                }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                        <Label>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".commment" id="commment" name="commment"
                                rows="6"
                                placeholder="Commment"
                                className="form-control"
                                validators={{
                                    required, minLenght: minLenght(20), maxLenght: maxLenght(80)
                                }}/>
                                <Errors 
                                className="text-danger"
                                model=".commment"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLenght: 'Must be grater than 20 charachters',
                                    maxLenght: 'Must be 80 charachters or less'
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
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format (new Date(Date.parse(comment.date)))}</p>
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-6 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm></CommentForm>
            </div>
        )
    }


    const DishDetail = (props) =>{
        const dish = props.dish

        console.log(dish);
        console.log('DishdetailComponent render invoked');

        
        if (dish == null) {
            return (<div></div>);
        }
        
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
                    <RenderComments comments={props.comments}/> 
                    
                </div>
            </div>
        )
    }


export default DishDetail;