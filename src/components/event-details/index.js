import React, { Component } from "react";
import event_details_lb from "../../images/event_details_lb.svg";
import phone_icon from "../../images/icon/phone.svg";
import location_icon from "../../images/icon/location.svg";
import email_icon from "../../images/icon/email.svg";
import heart_icon from "../../images/heart.svg";
import heart_full_icon from "../../images/heart-full.svg";
import web_icon from "../../images/icon/-e-ic_time.svg";
import StarRatings from "react-star-ratings";
import Review from "../generic/Review";
import CategoryNav2 from "../generic/CategoryNav2"
import EventSubDetail from "../generic/EventSubDetail";
import { relative } from "path";
import { ReactComponent as TwitterIcon } from "../../images/icon/twitter.svg";
import { ReactComponent as ThumbsupIcon } from "../../images/icon/thumbs-up.svg";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Formik, Form } from "formik";
import { localStore } from "../../services/storage";
// import ReactFBLike from "react-fb-like";
import placeholder_img from "../../images/placeholder.jpg";
import { FacebookProvider, Like } from "react-facebook";
import { Link } from "react-router-dom";
import arrowBack from "../../images/arrow-left.svg";
import Loader from "react-loader-spinner";
import MapContainer from '../map/GoogleMap';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon
} from "react-share";
// import { ReactComponent as Test } from "../../images/event_details_lb.svg";
import "./event-details.scss";

class Index extends Component {
  state = {
    leave_review: false,
    fb: ""
  };
  constructor(props) {
    super(props);
    if (props.match.params.id) {
      props.getEventById(props.match.params.id);
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.setState({
    //   fb: (
    //     <FacebookProvider appId="2194646720630049">
    //       <Like
    //         href="http://www.facebook.com"
    //         colorScheme="dark"
    //         layout="button_count"
    //         version="8.0.4"
    //       />
    //     </FacebookProvider>
    //   )
    // });
  }
  componentWillUnmount() {
    this.props.getEventByIdUnmount();
  }
  render() {
    const { categories, event: data, userdata } = this.props;
    // const event_sub_details = data
    //   ? [
    //       { image: location_icon, text: data.EventPlace },
    //       { image: phone_icon, text: "phone number" },
    //       { image: email_icon, text: "email" },
    //       { image: web_icon, text: "account" }
    //     ]
    //   : null;

    const catImage =
      data &&
      data.categories &&
      categories &&
      categories.find(m => m.name == data.categories.name).image;
    const catBgColor =
      data &&
      data.categories &&
      categories &&
      categories.find(m => m.name == data.categories.name).bgColor;

    const catBgImage =
      data &&
      data.categories &&
      categories &&
      categories.find(m => m.name == data.categories.name).bgImage;

    const catBg =
      data &&
      data.categories &&
      categories &&
      categories.find(m => m.name == data.categories.name).bg;

    let avgRate,
      sum = 0;
    if (data) {
      data.reviews.forEach(m => (sum += parseInt(m.stars)));
      avgRate = sum / data.reviews.length;
      if (data.reviews.length == 0) {
        avgRate = 0;
      }
    }
    let youInterested;
    if (data && userdata && userdata.data) {
      youInterested = data.interested.find(oneInterested => {
        return oneInterested._id == userdata.data._id;
      });
    }
    return (
      <>
      <div className="event-details row">
           <CategoryNav2
            {...this.props}
          /> 
        {/* <ReactFBLike
          language="en_US"
          appId="717589285046812"
          version="v2.12"
          share=""
          showFaces=""
          width=""
        />
 */}
        {/* <FacebookProvider
          appId="2194646720630049"
          className="fbblikee"
        >
          <Like
            href="http://www.facebook.com"
            colorScheme="dark"
            text={false}
            // layout="button_count" 
            version="8.0.4"
            className="fbblikee"
          />
        </FacebookProvider> */}
        {data && data.categories && (
          <Link to={{ pathname: `/${data.categories.name}` }}>
            <div className="arrowBack">
              <img src={arrowBack} />
              Back to list
            </div>
          </Link>
        )}
        {data && data.title ? (
          <>
            <div
              className="col-md-6 col-12 p-0 event-image"
              style={{
                // backgroundImage: `url(${data&&data.image&&data.image.secure_url?data.image.secure_url:placeholder_img})`,
              }}
            >
              <img className="business-image" src={data&&data.image&&data.image.secure_url?data.image.secure_url:placeholder_img} />
              {(data && data.EventLocation && data.EventLocation.length ) &&
          // <div className="row">
             <div className="map-container"> 
              <MapContainer
                info={data.EventLocation}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI"
                loadingElement={<div style={{ height: `400px` }} />}
                containerElement={
                  <div className="containerElement" />
                }
                mapElement={<div className="mapElement" />}
              />
              <div className="get-direction-btn">
                <span onClick={() =>
                    window.open(
                      `http://maps.google.com/maps?q=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&ll=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&z=10`
                    )
                  }>
                  Get Directions
                </span>
              </div>
           </div>
        // </div>
        }
            </div>
            <div className="col-md-5 col-12 p-3 right">
              <div>
                <div className="block">
                  <img className="category-icon" src={categories && catImage} />
                  <div className="title">{data.title}</div>
                </div>
                <div className="block">
                  <StarRatings
                    rating={avgRate}
                    // rating={this.state.rating}
                    starRatedColor="#fbc000"
                    // changeRating={this.changeRating}
                    starDimension="0.8em"
                    starSpacing="0px"
                    numberOfStars={5}
                    name="rating"
                  />
                  <div className="rating-text">
                    {data.reviews.length} reviews
                  </div>
                </div>
                <div className="block">
                  <div className="desc">{data.content.brief}</div>
                </div>
              </div>
              {/* <div
              className="display-hidden-before-width"
              style={{
              }}
            >
              <img className="business-image" src={data&&data.image&&data.image.secure_url?data.image.secure_url:placeholder_img} />
              {(data && data.EventLocation && data.EventLocation.length ) &&
             <div className="map-container"> 
              <MapContainer
                info={data.EventLocation}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI"
                loadingElement={<div style={{ height: `400px` }} />}
                containerElement={
                  <div className="containerElement" />
                }
                mapElement={<div className="mapElement" />}
              />
              <div className="get-direction-btn">
                <span onClick={() =>
                    window.open(
                      `http://maps.google.com/maps?q=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&ll=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&z=10`
                    )
                  }>
                  Get Directions
                </span>
              </div>
           </div>
        }
        </div> */}
              <div className="sub-details-section">
                <div className="block sub-details">
                  <div className="event-info">
                    <div className="place-detail sub-detail">
                      <img className="icon" src={location_icon} />
                      <div className="text">
                        {data && data.EventPlace
                          ? data.EventPlace + ' , '
                          : ""}               
                        {data && data.EventState && this.props.places.data
                          ? this.props.places.data.find(
                              state => state._id == data.EventState
                            ).name
                          : null}
                      </div>
                    </div>
                    <div className="contact-detail  sub-detail ">
                      <img src={phone_icon} className="icon" />
                      <div className="text">
                        {data && data.phone_number
                          ? data.phone_number
                          : "Not available"}
                      </div>
                    </div>
                    <div className="email-detail sub-detail">
                      <img src={email_icon} className="icon" />
                      <div className="text">
                        {data && data.email
                          ? data.email
                          : "Not available"}
                      </div>
                    </div>
                    <div className="webiste-detail sub-detail">
                      <img src={web_icon} className="icon" />
                      <div className="text">
                        {data && data.website
                          ? data.website
                          : "Not available"}
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className=" p-0 left">
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  // backgroundImage: `url(${catBg})`,
                  // backgroundRepeat: "no-repeate",
                  // backgroundPosition: "center",
                  // backgroundSize: "cover",
                  marginTop: "18px"
                }}
                className="open-hours"
              >
                <div className="timings">
                  <div className="small-title openhours">Opening Hours</div>
                  <div className="timing">
                    <div className="small-title2">Open Hours</div>
                    {[
                      {
                        day: "Monday",
                        time: data.monStartTime + " - " + data.monEndTime
                      },
                      {
                        day: "Tuesday",
                        time: data.tueStartTime + " - " + data.tueEndTime
                      },
                      {
                        day: "Wednesday",
                        time: data.wedStartTime + " - " + data.wedEndTime
                      },
                      {
                        day: "Thursday",
                        time: data.thrStartTime + " - " + data.thrEndTime
                      },
                      {
                        day: "Friday",
                        time: data.friStartTime + " - " + data.friEndTime
                      },
                      {
                        day: "Saturday",
                        time: data.satStartTime + " - " + data.satEndTime
                      },
                      {
                        day: "Sunday",
                        time: data.sunStartTime + " - " + data.sunEndTime
                      }
                    ].map((element, i) => (
                      <div key={i} className="day-block">
                        <div className="day">{element.day}</div>
                        <div className="time">
                          {element.time && element.time != " - "
                            ? element.time
                            : "Closed"}
                        </div>
                      </div>
                    ))}
                    <div />
                  </div>
                </div>
              </div>
            </div>
                  </div>
                </div>
                <div className="block social-buttons social">
                  <button
                    className="btn btn-primary favorites-btn"
                    onClick={() => {
                      if (localStore("token")) {
                        this.props.addInterestRequest({
                          id: data._id,
                          pathname: this.props.location.pathname
                        });
                      } else {
                        this.props.history.push("/auth/");
                      }
                    }}
                    title={localStore("token") ? "" : "Login first"}
                  >
                    <img
                      src={data && youInterested ? heart_full_icon : heart_icon}
                    />
                    {data && youInterested
                      ? `Added to Favorites`
                      : `Add to Favorites`}
                  </button>
                  <div
                    className="social d-flex"
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {/* <FacebookProvider appId="2194646720630049">
                      <Like
                        href="http://www.facebook.com"
                        colorScheme="dark"
                        layout="button_count"
                        version="8.0.4"
                      />
                    </FacebookProvider> */}
                    {/* <button className="btn btn-primary px-1 py-0 d-flex">
                    <ThumbsupIcon />
                    <div className="text">like</div>
                  </button> */}
                    {/* <div
                      className="fb-like"
                      data-href={
                        data.facebookUrl
                          ? data.facebookUrl
                          : "https://facebook.com/"
                      }
                      data-layout="button_count"
                      data-action="like"
                      data-size="large"
                      data-show-faces="false"
                      data-share="false"
                    /> */}
                    {/* <button className="btn btn-primary ml-1 px-1 py-0 d-flex tweet"> */}
                    {/* <div className="text">Tweet</div> */}
                    {/* </button> */}
                    <FacebookShareButton
                      // className="btn btn-primary ml-1 px-1 py-0 d-flex tweet"
                      url={`http://ec2-18-222-212-140.us-east-2.compute.amazonaws.com/event-detail/${
                        data._id
                      }`}
                      className="fb-share-btn"
                    >
                        <FacebookIcon size={15}/> <div>Share</div>
                    </FacebookShareButton>
                    <TwitterShareButton
                      className="btn btn-primary ml-1 px-1 py-0 d-flex tweet"
                      url={`${window.location.origin}/event-detail/${
                        data._id
                      }`}
                      title=""
                      style={{
                        height: "19px",
                        alignItems: "center",
                        marginTop: "3px"
                      }}
                    >
                      <TwitterIcon width="12px" height="12px" />
                      <div
                        className="twitter-icon"
                        style={{ marginLeft: "5px", fontSize: "10px" }}
                      >
                        Tweet
                      </div>
                    </TwitterShareButton>
                  </div>
                </div>
                <div className=" p-3 review-block display-hidded-after-width ">
              <div className="row">
                <div className="col-md-6">
                  <div className="small-title">Reviews</div>
                  {data.reviews.length ? (
                    <div className="reviews">
                      {userdata.data &&
                      data.reviews.find(review => {
                        return review.user_id
                          ? review.user_id._id == userdata.data._id
                          : "";
                      }) ? (
                        <>
                          {data.reviews
                            .filter(review => {
                              return review.user_id
                                ? review.user_id._id == userdata.data._id
                                : "";
                            })
                            .map((review, i) => (
                              <Review key={i} review={review} />
                            ))}
                          {data.reviews
                            .filter(review => {
                              return review.user_id
                                ? review.user_id._id != userdata.data._id
                                : "";
                            })
                            .map(
                              (review, i) =>
                                i < 2 && <Review key={i} review={review} />
                            )}
                        </>
                      ) : (
                        data.reviews.map(
                          (review, i) =>
                            i < 3 && <Review key={i} review={review} />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="reviews">Be the first to add review.</div>
                  )}
                  {localStore("token") &&
                  userdata.data &&
                  data.reviews.find(review => {
                    return review.user_id
                      ? review.user_id._id == userdata.data._id
                      : "";
                  }) ? null : (
                    <div className="leave-review">
                      {this.state.leave_review ? (
                        <div>
                          <Formik
                            initialValues={{
                              comment: "",
                              stars: 0
                            }}
                            validate={values => {
                              let errors = {};
                              if (!values.comment) {
                                errors.comment = "Required";
                              }
                              if (!values.stars || values.stars == 0) {
                                errors.stars = "Required";
                              }
                              return errors;
                            }}
                            onSubmit={(values, actions) => {
                              this.props.addReviewRequest({
                                values,
                                event_id: data._id
                              });
                            }}
                            render={({
                              values,
                              errors,
                              status,
                              touched,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              setFieldValue
                            }) => (
                              <Form>
                                <div className="input-fields">
                                  <div>
                                    <textarea
                                      name="comment"
                                      value={values.text}
                                      onChange={handleChange}
                                    />
                                    {errors.comment && touched.comment && (
                                      <label className="error">
                                        {errors.comment}
                                      </label>
                                    )}
                                  </div>
                                  <div>
                                    <StarRatings
                                      rating={values.stars}
                                      // rating={this.state.rating}
                                      starRatedColor="#fbc000"
                                      changeRating={value =>
                                        setFieldValue("stars", value)
                                      }
                                      starDimension="1.5em"
                                      starSpacing="0px"
                                      numberOfStars={5}
                                      name="stars"
                                    />
                                    {errors.stars && touched.stars && (
                                      <label className="error">
                                        {errors.stars}
                                      </label>
                                    )}
                                  </div>
                                  <div>
                                    <button
                                      className="blue-button"
                                      onClick={() =>
                                        this.setState({ leave_review: false })
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="blue-button ml-2"
                                      type="submit"
                                    >
                                      Add Review
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            )}
                          />
                        </div>
                      ) : (
                        <div
                          className="leave-review"
                          title={!localStore("token") && "Login First"}
                          onClick={() => {
                            if (localStore("token")) {
                              this.setState({ leave_review: true });
                            } else {
                              this.props.history.push("/auth/");
                            }
                          }}
                        >
                          Leave Review
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-6 catBgImage">
                  <img src={catBgImage} width="100%" />
                </div>
              </div>
            </div>
                <div
                  className="col-md-6 col-12 p-0 event-image-mobile"
                  style={{
                    backgroundImage: `url(${data&&data.image&&data.image.secure_url?data.image.secure_url:placeholder_img})`,
                    minHeight: "200px"
                  }}
                />
              </div>
            </div>
            {/* <div>ssdvbldbvldbvldbv</div> */}
            {/* {(data && data.EventLocation && data.EventLocation.length ) &&
             <div className="map-container"> 
              <MapContainer
                info={data.EventLocation}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI"
                loadingElement={<div style={{ height: `400px` }} />}
                containerElement={
                  <div className="containerElement" />
                }
                mapElement={<div className="mapElement" />}
              />
              <div className="get-direction-btn">
                <span onClick={() =>
                    window.open(
                      `http://maps.google.com/maps?q=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&ll=${
                        data.EventLocation[1]
                      },${data.EventLocation[0]}&z=10`
                    )
                  }>
                  Get Directions
                </span>
              </div>
           </div>
        } */}
            {/* <div className="col-md-6 col-12 p-0 left display-hidden-before-width open-hours">
              <div
                style={{
                  width: "100%",
                }}
              >
                <div className="timings">
                  <div className="small-title openhours">Open Hours</div>
                  <div className="timing padding-show">
                    <div className="small-title2">Open Hours</div>
                    {[
                      {
                        day: "Monday",
                        time: data.monStartTime + " - " + data.monEndTime
                      },
                      {
                        day: "Tuesday",
                        time: data.tueStartTime + " - " + data.tueEndTime
                      },
                      {
                        day: "Wednesday",
                        time: data.wedStartTime + " - " + data.wedEndTime
                      },
                      {
                        day: "Thursday",
                        time: data.thrStartTime + " - " + data.thrEndTime
                      },
                      {
                        day: "Friday",
                        time: data.friStartTime + " - " + data.friEndTime
                      },
                      {
                        day: "Saturday",
                        time: data.satStartTime + " - " + data.satEndTime
                      },
                      {
                        day: "Sunday",
                        time: data.sunStartTime + " - " + data.sunEndTime
                      }
                    ].map((element, i) => (
                      <div key={i} className="day-block">
                        <div className="day">{element.day}</div>
                        <div className="time">
                          {element.time && element.time != " - "
                            ? element.time
                            : "Closed"}
                        </div>
                      </div>
                    ))}
                    <div />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-12 p-3 review-block display-hidden-before-width">
              <div className="row">
                <div className="col-md-6">
                  <div className="small-title">Reviews</div>
                  {data.reviews.length ? (
                    <div className="reviews">
                      {userdata.data &&
                      data.reviews.find(review => {
                        return review.user_id
                          ? review.user_id._id == userdata.data._id
                          : "";
                      }) ? (
                        <>
                          {data.reviews
                            .filter(review => {
                              return review.user_id
                                ? review.user_id._id == userdata.data._id
                                : "";
                            })
                            .map((review, i) => (
                              <Review key={i} review={review} />
                            ))}
                          {data.reviews
                            .filter(review => {
                              return review.user_id
                                ? review.user_id._id != userdata.data._id
                                : "";
                            })
                            .map(
                              (review, i) =>
                                i < 2 && <Review key={i} review={review} />
                            )}
                        </>
                      ) : (
                        data.reviews.map(
                          (review, i) =>
                            i < 3 && <Review key={i} review={review} />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="reviews">Be the first to add review.</div>
                  )}
                  {localStore("token") &&
                  userdata.data &&
                  data.reviews.find(review => {
                    return review.user_id
                      ? review.user_id._id == userdata.data._id
                      : "";
                  }) ? null : (
                    <div className="leave-review">
                      {this.state.leave_review ? (
                        <div>
                          <Formik
                            initialValues={{
                              comment: "",
                              stars: 0
                            }}
                            validate={values => {
                              let errors = {};
                              if (!values.comment) {
                                errors.comment = "Required";
                              }
                              if (!values.stars || values.stars == 0) {
                                errors.stars = "Required";
                              }
                              return errors;
                            }}
                            onSubmit={(values, actions) => {
                              this.props.addReviewRequest({
                                values,
                                event_id: data._id
                              });
                            }}
                            render={({
                              values,
                              errors,
                              status,
                              touched,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              setFieldValue
                            }) => (
                              <Form>
                                <div className="input-fields">
                                  <div>
                                    <textarea
                                      name="comment"
                                      value={values.text}
                                      onChange={handleChange}
                                    />
                                    {errors.comment && touched.comment && (
                                      <label className="error">
                                        {errors.comment}
                                      </label>
                                    )}
                                  </div>
                                  <div>
                                    <StarRatings
                                      rating={values.stars}
                                      // rating={this.state.rating}
                                      starRatedColor="#fbc000"
                                      changeRating={value =>
                                        setFieldValue("stars", value)
                                      }
                                      starDimension="1.5em"
                                      starSpacing="0px"
                                      numberOfStars={5}
                                      name="stars"
                                    />
                                    {errors.stars && touched.stars && (
                                      <label className="error">
                                        {errors.stars}
                                      </label>
                                    )}
                                  </div>
                                  <div>
                                    <button
                                      className="blue-button"
                                      onClick={() =>
                                        this.setState({ leave_review: false })
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="blue-button ml-2"
                                      type="submit"
                                    >
                                      Add Review
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            )}
                          />
                        </div>
                      ) : (
                        <div
                          className="leave-review"
                          title={!localStore("token") && "Login First"}
                          onClick={() => {
                            if (localStore("token")) {
                              this.setState({ leave_review: true });
                            } else {
                              this.props.history.push("/auth/");
                            }
                          }}
                        >
                          Leave Review
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-6 catBgImage">
                  <img src={catBgImage} width="100%" />
                </div>
              </div>
            </div>
          </>
        ) : (
          this.props.isLoading &&
          !data && (
            <div className="loader-div" style={{ margin: "40px auto" }}>
              <Loader type="Oval" color="#555" height="30" width="100vw" />
            </div>
          )
        )}
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.eventById.data.data,
  userdata: state.auth.userdata.data,
  isLoading: state.event.eventById.isLoading,
  places: state.event.locations.data
});

const mapDispatchToProps = dispatch => ({
  getEventById: data => dispatch(actions.getEventByIdRequest(data)),
  addReviewRequest: data => dispatch(actions.addReviewRequest(data)),
  addInterestRequest: data => dispatch(actions.addInterestRequest(data)),
  getEventByIdUnmount: () => dispatch(actions.getEventByIdUnmount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
