import React, { Component } from "react";
import "./subCategory.scss";
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

class SubCategory extends Component {
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
      location_status: "",
      // setSubcat: true,
      numberOfItemToShow:20,
    };
  }
  componentDidMount() {
    const { filters } = this.props;
    // if (filters.categories && filters.categories.data && !this.state.id) {
    //   const oneCategory = filters.categories.data.data.find(category => {
    //     return category.name === this.props.match.path.replace("/", "");
    //   });

    //   if (oneCategory) {
    //   if (this.state.id != this.props.match.params.id) {
    //     this.setState({ id: this.props.match.params.id });
    //   }
    this.props.getEventsByCategoryRequest({
      sub_id: this.props.match.params.id,
      page_number: 1,
      ageFlag: filters.ageFlag,
      eventState: filters.selectedState,
      eventCity: filters.selectedCity
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const { filters } = this.props;
      // if (filters.categories && filters.categories.data && !this.state.id) {
      //   const oneCategory = filters.categories.data.data.find(category => {
      //     return category.name === this.props.match.path.replace("/", "");
      //   });

      //   if (oneCategory) {
      //   if (this.state.id != this.props.match.params.id) {
      //     this.setState({ id: this.props.match.params.id });
      //   }
      this.props.getEventsByCategoryRequest({
        sub_id: this.props.match.params.id,
        page_number: 1,
        ageFlag: filters.ageFlag,
        eventState: filters.selectedState,
        eventCity: filters.selectedCity
      });
      //   }
    }
  }
  numberOfItemToShow=()=>{
    this.setState({numberOfItemToShow:this.state.numberOfItemToShow+20});
  }
  render() {
    const {numberOfItemToShow} =this.state;
    const { categories2, location,category } = this.props;
    const cat = this.props.category;

    
//     const categories = [
//       {
//         name: "duty_free",
//         color: "#fbebec",
//         image: duty_free_img,
//         bgImage: bg_dutyFree
//       },
//       {
//         name: "artisan",
//         color: "#a9fff1",
//         image: artisan_img,
//         bgImage: bg_artisan
//       },
//       {
//         name: "crafts",
//         color: "#cfbeb6",
//         image: crafts_img,
//         bgImage: bg_crafts
//       },
//       {
//         name: "retails",
//         color: "#fff6fb",
//         image: retails_img
//       }
//     ];
// console.log(categories2,'cccccccc',category)
  //   const catImage =
  //   data &&
  //   data.categories &&
  //   categories &&
  //   categories.find(m => m.name == data.categories.name).image;
  // const bgcolor =
  //   data &&
  //   data.categories &&
  //   categories &&
  //   categories.find(m => m.name == data.categories.name).bgColor;

  // const catImage =
  //   data &&
  //   data.categories &&
  //   categories &&
  //   categories.find(m => m.name == data.categories.name).bgImage;

  //   const bgImage =
  //   data &&
  //   data.categories &&
  //   categories &&
  //   categories.find(m => m.name == data.categories.name).bg;


    const bgcolor =category.bgcolor;
    const catImage = window.location.pathname.toLowerCase().search("duty_free") > -1?duty_free_img:
                     window.location.pathname.toLowerCase().search("crafts") > -1?crafts_img:category.image;
    const bgImage = category.bg;
    return (
      <div className="event-page">
        <div className="row">
          <CategoryNav2
            handleSubcat={this.props.handleSubcat}
            {...this.props}
            categories={categories2}
            location={location}
            subCategoryName={this.props.subCategoryName}
          />
        </div>

        <div className="row mt-4">
          <div className="col-lg-8 col-md-10 col-sm-10 col-xs-10 offset-sm-1 offset-md-1 offset-lg-2 p-0">
            <TopMenu />
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
              return (
                <React.Fragment>
                  {i  < numberOfItemToShow && 
                    <CategoryItem key={i} event={event} />
                  }
                </React.Fragment>
              )
            })
          ) : (
            <div className="no-events">{`At this time, there is no Data `}</div>
          )}
          {this.props.events && this.props.events.length >0 && this.props.events.length > 20  && this.props.events.length > numberOfItemToShow && 
          <div onClick={this.numberOfItemToShow} className="load-more-button-container">
                <div className="load-more-button">Load more</div>
              </div>
          }
        </div>
        {/* sknclaksnclaksbncl */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.categories.data,
  //   page_details: state.event.eventsByCategory.data,
  events: state.event.eventsByCategory.events,
  page_number: state.event.eventsByCategory.page_number,
  successFlag: state.event.eventsByCategory.isSuccess,
  //   searchedEvents: state.event.searchedEvents.data,
  //   searchFocused: state.event.searchedEvents.isFieldFocused,
  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  getEventsByCategoryRequest: data =>
    dispatch(actions.getEventsByCategoryRequest(data))
  // searchBlured: () => dispatch(actions.searchBlur()),
  // clearList: () => dispatch(actions.clearListOnUnmount())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubCategory)
);
