import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Footer from "./Footer"
import Header from "./Header"
import Home from './Home';
import About from './AboutComponent';
import Contact from './Contact';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { addComment, fetchDishes } from '../redux/actionCreator';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({

  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});


class Main extends Component {
  componentDidMount(){
      this.props.fetchDishes();
    } 

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    console.log(this.props.dishes)
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail 
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={this.props.addComment}
            />
      );
    };
    const AboutWithProps = ({match}) => {
      return(
          <About leaders={this.props.leaders}  
            />
      );
    };
    return (
      <div>
        <Header/>
         <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route exact path='/aboutus' component={AboutWithProps} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));