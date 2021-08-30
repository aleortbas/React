import React, { Component } from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

//Agregar commentario
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
  }

render(){

  const HomePage = () => {
    return (
      <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0] }
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.ErrMess}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0] }
        leader={this.props.leaders.filter((leader) => leader.featured)[0] }
       />
    );
  }

  const AboutUsPage = () => {
    return(
      <About leader={this.props.leaders}/>
    );
  }

  const  DishWithId = ({match}) => {
    return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        ErrMess={this.props.dishes.ErrMess}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
    );
  }

  return (
    <div>
    <Header/>
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
      <Route path="/aboutus" component={AboutUsPage} />
      <Route exact path="/contactus" component={Contact} />
      
      <Route path="/menu/:dishId" component={DishWithId} />
      <Redirect to="/home" />
    </Switch>
    <Footer/>
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));