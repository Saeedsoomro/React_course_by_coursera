import React,{Component} from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal , ModalBody, ModalHeader,Label,Col,Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


class  DishdetailComponent extends Component
{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this)
    }


      toggleModal() {
        
        this.setState({
          isModalOpen: !this.state.isModalOpen
          
        });
      }

 render(){ 

    function Dish({dish})
    {
        if (dish != null)
            return(
                <div className='col-12 col-md-5 m-1'>
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>

            );
        else
            return(
                <div></div>
            );
    }


    function Comments ({comments, toggleModal})
    {
        return(
        <div className='.d-print-inline'>
        <h1>Comments</h1>
        {
            comments.map((comment =>{
                    return (
                            <div>
                                <p>{comment.comment}</p>
                        <p>{comment.author} , <span>{comment.date}</span></p>
                    </div>
                )
            }))
        }
        <div className="row">
            <Button onClick ={toggleModal}  className='bg-primary'>Submit commit</Button>
        </div>
    </div>
        )
    }

    function ModalBox(props){
        function handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            props.addComment(props.dishId, values.rating, values.author, values.comment);
        }
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return(
            <Modal  isOpen={props.isModalOpen} toggle={props.toggleModal}>
                    <ModalHeader toggle={props.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                    <Row className="form-group">
                                <Col md={10}>
                                <Label htmlFor="rating" >Rating</Label>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                <Label htmlFor="author" >first Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                <Label htmlFor="comment" >Your Feedback</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="4"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        )
    }
    return (
      <div>
        <div  className="container">
            <ModalBox 
                isModalOpen ={this.state.isModalOpen}  
                toggleModal = {this.toggleModal}
                addComment={this.props.addComment}
                dishId={this.props.dish.id} 
            />
            <Dish dish={this.props.dish} />         
            <Comments comments={this.props.comments} toggleModal = {this.toggleModal}/>         
        </div>
      </div>
    )
  }
}
export default DishdetailComponent;