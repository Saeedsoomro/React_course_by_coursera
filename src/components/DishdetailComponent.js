import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
export default class DishdetailComponent extends Component {    
    constructor(props) {
        super(props);
    }
    renderDish(dish) {
        if (dish != null)
            return(
                <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                <div className='.d-print-inline'>
                    <h1>Comments</h1>
                    {
                        dish.comments.map((comment =>{
                            return (
                                <div>
                                    <p>{comment.comment}</p>
                                    <p>{comment.author} , <span>{comment.date}</span></p>
                                </div>
                            )
                        }))
                    }
                </div>

                </div>

            );
        else
            return(
                <div></div>
            );
    }
 
    render() {    
    return (
      <div>
        <div  className="col-12 col-md-7 m-1">
            {this.renderDish(this.props.dish)}         
        </div>
      </div>
    )
  }
}
