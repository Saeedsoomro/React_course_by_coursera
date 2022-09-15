import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



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

function Comments ({comments})
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
</div>
    )
}
function DishdetailComponent({dish, comments})  {    
    return (
      <div>
        <div  className="container">
            <Dish dish ={dish}/>         
            <Comments comments ={comments} />         
        </div>
      </div>
    )
  }

export default DishdetailComponent;