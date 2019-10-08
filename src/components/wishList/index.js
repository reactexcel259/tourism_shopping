import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Card from "./Card"
import "./card.scss"
class index extends Component {
  componentDidMount() {
    this.props.getInterestRequest();
  }  
  render() {
    return (
        <div className="event-div wishlists">
        <h1>Your WishList</h1>
        {this.props.wishList.map((data, index)=>(
            <Card
            id={data._id}
            image={data.image.secure_url}
            title={data.title}
            EventPlace={data.EventPlace}
            phone_number={data.phone_number}
            key={index}
            cardData={data}
            userData={this.props.userData}
            addInterest={this.props.addInterest}
            reviews={data.reviews}
            />
        ))}
        </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        wishList:state.event.wishLists.data,
        userdata: state.auth.userdata.data,

    }
    
}

const mapDispatchToProps = dispatch => ({
  getInterestRequest: () => dispatch(actions.getInterestRequest()),
  addInterest: id => dispatch(actions.addInterestRequest(id))

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);
