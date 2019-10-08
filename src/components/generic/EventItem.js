import React, { Component } from "react";
import placeholder_image from "../../images/placeholder.jpg";
import cost from "../../images/cost_g.png";
import inactiveCost from "../../images/cost-not-active.svg";
import web from "../../images/web_g.png";
import time from "../../images/time_g.png";
import mapMain from "../../images/map-main-color_g.svg";
import heart from "../../images/heart.svg";
import heart_full from "../../images/heart-full.svg";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { localStore } from "../../services/storage";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions";

class EventItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { event, userdata, calendar } = this.props;
    const getZIndex = i => {
      return event.interested.length * 10 - i;
    };
    let interestPeople = "";
    let youInterested;
    if (event && userdata && userdata.data) {
      youInterested = event.interested.find(oneInterested => {
        return oneInterested._id == userdata.data._id;
      });
    }
    return (
      <div className="events-list">
        <div className="col-lg-3 col-md-4  col-xs-12 offset-md-1 offset-lg-2 event-img">
          {/* <Link to={{ pathname: `/event-detail/${event._id}`, state: event }}> */}
          <div
            className="img"
            style={{
              backgroundImage: `url(${(event.image && event.image.url)  ? event.image.url : placeholder_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          {/* </Link> */}
        </div>
        <div
          className="col-lg-5 col-md-6 col-sm-12 event-detail"
          // style={{ paddingBottom: "10px" }}
        >
          <div className="head">
            <div>
              {/* <Link
                to={{ pathname: `/event-detail/${event._id}`, state: event }}
              > */}
              <div className="title">{event.title}</div>
              {/* </Link> */}
            </div>
            <div className="date">
              {event.start && moment(event.start).format("D MMM, dddd")}
            </div>
          </div>
          <div className="middle">
            <div>
              <span className="span">
                <img className="icon" src={mapMain} />{" "}
                {event.EventPlace ? event.EventPlace  : ""}
              </span>
              <span className="span">
                {event.Price ? (
                  <>
                    <img className="icon" src={cost} />{" "}
                    {`from $ ${event.Price}`}
                  </>
                ) : (
                  <>
                    <img className="icon" src={inactiveCost} /> Sold out{" "}
                  </>
                )}
              </span>
            </div>
            <div>
              <span className="span web-color">
                <img className="icon" src={web} />{" "}
                {event.website ? event.website : "website.com"}
              </span>
              <span className="span">
                <img className="icon" src={time} />{" "}
                {event.start && moment(event.start).format("hh:mm A")}
              </span>
            </div>
            <div
              className="desc"
              // style={{ paddingLeft: "0", color: "#808080" }}
            >
              {event.content.brief}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //   userdata: state.auth.userdata.data
});

const mapDispatchToProps = dispatch => ({
  addInterest: id => dispatch(actions.addInterestRequest(id))
  //   sharePost: post_id => dispatch(sharePost(post_id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventItem)
);
