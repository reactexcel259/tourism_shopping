import React, { Component } from "react";
import "./category.scss";
import TopMenu from "../generic/TopMenu";
import Description from "../generic/Description";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CategoryItem from "../generic/CategoryItem";
import CategoryNav from "../generic/CategoryNav";
import CategoryNav2 from "../generic/CategoryNav2";
import * as actions from "../../redux/actions";
import duty_free_img from "../../images/duty_free_img.png";
import retails_img from "../../images/duty_free_img.png";
import crafts_img from "../../images/crafts_img.png";
import artisan_img from "../../images/crafts_img.png";
import bg_dutyFree from "../../images/bg_dutyFree.png";
import bg_crafts from "../../images/bg_crafts.png";
import bg_artisan from "../../images/bg_artisan.png";
import Loader from "react-loader-spinner";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_city: "",
      search_state: "",
      state: "",
      city: "",
      ageFlag: false,
      id: "",
      status: true,
      location_status: ""
      // setSubcat: true
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const { filters } = this.props;
    // if (filters.categories && filters.categories.data && !this.state.id) {
    //   const oneCategory = filters.categories.data.data.find(category => {
    //     return category.name === this.props.match.path.replace("/", "");
    //   });

    //   if (oneCategory) {
    //     if (!this.state.id) {
    //       this.setState({ id: oneCategory._id });
    //     }
    //     this.props.getEventsByCategoryRequest({
    //       id: oneCategory._id,
    //       page_number: 1,
    //       ageFlag: filters.ageFlag,
    //       eventState: filters.selectedState,
    //       eventCity: filters.selectedCity
    //     });
    //   }
    // }
  }
  render() {
    const { categories2, location ,category} = this.props;
    const cat =
      this.props.categories && this.props.categories.data
        ? this.props.categories.data.find(
            category => this.props.location.pathname === "/" + category.name
          )
        : "";
        
      

    const bgcolor =category.bgcolor;
    const catImage = window.location.pathname.toLowerCase().search("duty_free") > -1?duty_free_img:
                     window.location.pathname.toLowerCase().search("crafts") > -1?crafts_img:category.image;
    const bgImage = category.bg;
    return (
      <div className="event-page">
        <div className="row">
          <CategoryNav2
            {...this.props}
            categories={categories2}
            location={location}
          />
        </div>

        <div className="row mt-4">
          <div className="col-lg-8 col-md-10 col-sm-12 col-xs-10 offset-md-1 offset-lg-2 p-0">
            <TopMenu  />
            {cat && (
              <Description
                name={cat.name}
                desc={cat.description}
                catImage={catImage}
                subCategoryName={this.props.subCategoryName}
              />
            )}
          </div>
        </div>

        <div
          className="event-div row"
          style={{
            // background: bgcolor,
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeate",
            backgroundPosition: "center",
            backgroundSize: "contain"
          }}
        >
          {this.props.filters.eventsByCategory.isLoading ? (
            <div className="loader-div">
              <Loader type="Oval" color="#fff" height="30" width="30" />
            </div>
          ) : this.props.events.length ? (
            this.props.events.map((event, i) => {
              return <CategoryItem key={i} event={event} />;
            })
          ) : (
            <div className="no-events">{`At this time, there is no Data `}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.categories.data,

  events: state.event.eventsByCategory.events,
  page_number: state.event.eventsByCategory.page_number,
  successFlag: state.event.eventsByCategory.isSuccess,

  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  getEventsByCategoryRequest: data =>
    dispatch(actions.getEventsByCategoryRequest(data))

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Category)
);
