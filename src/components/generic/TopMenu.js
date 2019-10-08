import React, { Component } from "react";
// import more from "../../images/more.svg";
// import search from "../../images/search.svg";
import mapMain from "../../images/map-main-color_g.svg";
import search from "../../images/icon/search.svg";
import { Link, withRouter } from "react-router-dom";
import "./TopMenu.scss";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import "./TopMenu.scss";
import { element } from "prop-types";

Geocode.setApiKey("AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI");

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_city: "",
      search_state: "",
      state: "",
      search_state_mobile: "",
      city: "",
      ageFlag: false,
      id: "",
      status: false,
      location_status: "",
      displayState: false,
      displayCity: false,
      displayAge: false,
      displayCal: false,
      show:false,
      isGeolocation:false,
      foundGeoLocation:true,
      isChangedState:false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.props;
    if (this.props.places.data && this.props.categories.data && this.state.isChangedState) {
      if (
        filters.selectedCity !== prevProps.filters.selectedCity ||
        filters.selectedState !== prevProps.filters.selectedState ||
        !this.state.status
      ) {
        this.setState({ status: true });
        const oneCategory = this.props.categories.data.find(category => {
          return category.name === this.props.match.path.replace("/", "");
        });
          this.props.getEventsByCategoryRequest({
            sub_id: this.props.match.params.id && this.props.match.params.id,
            id: oneCategory && oneCategory._id,
            page_number: 1,
            ageFlag: filters.ageFlag,
            eventState: filters.selectedState,
            eventCity: filters.selectedCity
          });
      }
    }
    const {isGeolocation} =this.state;
    if(!isGeolocation && this.props.coords &&
      this.props.coords.latitude && this.props.coords.longitude &&
      this.props.isGeolocationAvailable &&
      this.props.places.data && 
      this.props.places.data.length >0 && 
      this.props.isGeolocationEnabled){
        let storableLocation = {};
        const {latitude,longitude}=this.props.coords;
      Geocode.fromLatLng(latitude, longitude).then(
        response => {
        const { results } = response;   
        let locality,administrative_area_level_1 ,country;
        if(response && response.results && response.results.length){
          for(var ac = 0 ; ac < response.results.length; ac++){
            if((!locality ||  locality.length > 0) || (!administrative_area_level_1 || administrative_area_level_1.length >0) || (!country || country.length >0)){
              for(let a =0; a < response.results[ac].address_components.length ; a++){
                if(!locality || !locality.length >0 ){
                  locality =response.results[ac].address_components[a].types.filter((a,i)=>a ==="locality");
                  if(locality && locality.length>0){
                    storableLocation.city = response.results[ac].address_components[a].long_name;
                  }
                }if(!administrative_area_level_1 || !administrative_area_level_1.length >0 ){
                  administrative_area_level_1 =response.results[ac].address_components[a].types.filter((a,i)=>a ==="administrative_area_level_1");
                  if(administrative_area_level_1 && administrative_area_level_1.length>0){
                    storableLocation.state = response.results[ac].address_components[a].long_name;
                  }
                }
                if(!country || !country.length >0 ){
                 country =response.results[ac].address_components[a].types.filter((a,i)=>a ==="country");
                 if(country && country.length>0){
                  let registered_country_iso_code = response.results[ac].address_components[a].short_name;
                  storableLocation = Object.assign(storableLocation,{registered_country_iso_code})
                 }
                }
              }
            }else{
              break;
            }
          }
        }
        let state=[]
        for(let i =0;  i < this.props.places.data.length ; i++ ){
          if(storableLocation.state){
            if(storableLocation.state.includes("Saint") && storableLocation.state.includes("Parish") && storableLocation.state.trim().split(" ").slice(1,-1).join("").toLowerCase() === this.props.places.data[i].name.trim().split(" ").slice(1).join(" ").toLowerCase()){
              state.push(this.props.places.data[i])
            }else if(storableLocation.state.includes("Parish") && this.props.places.data[i].name.includes("Parish") && storableLocation.state.trim().toLowerCase() === this.props.places.data[i].name.trim().toLowerCase()){
                state.push(this.props.places.data[i])
                break;
            }
            else if(storableLocation.state.includes("Parish") && !this.props.places.data[i].name.includes("Parish") && storableLocation.state.trim().split(" ").slice(0,-1).join(" ").toLowerCase() === this.props.places.data[i].name.trim().toLowerCase()){
                state.push(this.props.places.data[i])
                break;
            }
            else if(!storableLocation.state.includes("Parish") && this.props.places.data[i].name.includes("Parish") && storableLocation.state.trim().toLowerCase() === this.props.places.data[i].name.trim().split(" ").slice(0,-1).join(" ").toLowerCase()){
                state.push(this.props.places.data[i])
                break;
            }
          }
        }
        if (state && state.length > 0) {
          this.props.stateChange(state[0]._id);
          let city;
          if(storableLocation.city){
            if( storableLocation.city ==="Kingston"){
              city = state[0].cities.filter((city,i) => city.name =="New Kingston" || city.name =="Kingston" );
            }else{
              city = state[0].cities.filter((city,i) =>city.name === storableLocation.city);
            }
            if(city && city.length >0){
            this.props.cityChange(city[0]._id);
            }
          }
            const oneCategory = this.props.categories.data.find(category => {
              return category.name === this.props.match.path.replace("/", "");
            });
            this.props.getEventsByCategoryRequest({
              sub_id: this.props.match.params.id && this.props.match.params.id,
              id: oneCategory && oneCategory._id,
              page_number: 1,
              ageFlag: filters.ageFlag,
              eventState: state[0]._id,
              eventCity: city && city.length >0 && city[0]._id ? city[0]._id :""
            });
          }else{
              const oneCategory = filters.categories.data.data.find(category => {
                return category.name === this.props.match.path.replace("/", "");
              });
              if (oneCategory) {
                this.props.getEventsByCategoryRequest({
                  sub_id: this.props.match.params.id && this.props.match.params.id,
                  id: oneCategory._id,
                  page_number: 1,
                  ageFlag: filters.ageFlag,
                  eventState: filters.selectedState,
                  eventCity: filters.selectedCity
                });
              }
             }
        })
         this.setState({isGeolocation:true})
      }
      
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  hideList=()=>{
    this.setState({
      show:false
    })
  }
  showList=()=>{
    this.setState({
      show:true
    })
  }
  render() {
    let states = [];
    states = [
      <li key={-1} onClick={() => {this.props.stateChange("");this.setState({isChangedState:true})}}>
        All Locations
      </li>
    ];
    const cities = [];
    const more_cities = [];
    const more_states = [];
    let stateData = "";
    let selected_city = "";

    if (this.props.places.data) {
      stateData = this.props.places.data.find(
        state => this.props.filters.selectedState === state._id
      );
      this.props.places.data.sort((a,b)=>{return a.name > b.name ? 1 : -1} ).map((state, i) => {
        if (
          state.name
            .toLowerCase()
            .includes(this.state.search_state.toLowerCase())
        ) {
          states.push(
            <li key={i} onClick={() => {this.props.stateChange(state._id); this.setState({isChangedState:true})}}>
              {state.name}
            </li>
          );
        }
      });
      if (stateData) {
        stateData.cities.map((city, index) => {
          if (this.props.filters.selectedCity === city._id) {
            selected_city = city;
          } else {
            if (index < 2) {
              cities.push(
                <li
                  key={index}
                  style={{
                    fontWeight:
                      this.props.filters.selectedCity === city._id
                        ? "700"
                        : "600"
                  }}
                  onClick={() => this.props.cityChange(city._id)}
                >
                  {city.name}
                </li>
              );
            } else {
              more_cities.push(city);
            }
          }
        });
      }
    }

    const state_place = () => {
      if (this.props.places.data && this.props.filters.selectedState) {
        const state_info = this.props.places.data.find(
          state => this.props.filters.selectedState === state._id
        ).name;
        return state_info;
      }
      return "All Locations";
    };

    return (
      <div className="">
        <div className="col-lg-12 col-md-12 top-menu">
          <div className="menu-links row">
            <div className="menu-links-left col-lg-12 col-md-12 ">
              <div className="row">
                {/* <div> */}
                <div className="menu-div-1 col-lg-3 col-md-3">
                  <span className="more-options-btn" onMouseOver={this.showList}>
                    <img src={mapMain} />
                    <span className="text">{state_place()}</span>
                    <div className="more-options-state" >
                     {this.state.show && <ul onMouseLeave={this.hideList} onClick={this.hideList}>{states}</ul>}

                    </div>
                  </span>
                </div>
                <div className="menu-div-2 col-lg-2 col-md-2">
                  <span className="text2">{selected_city.name}</span>
                </div>
                {/* </div> */}

                <div
                  className="menu-div-3 col-lg-4 col-md-4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <ul
                      className="some-cities"
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      {cities}
                    </ul>
                  </span>
                </div>

                <div className="menu-div-4 col-lg-2 col-md-2">
                  <span className="more-options-btn more-options-btn-cities">
                    {more_cities.length ? (
                      <>
                        <span className="text">more ...</span>
                        <div className="more-options">
                          <ul>
                            {more_cities
                              .filter(city =>
                                city.name
                                  .toLowerCase()
                                  .includes(
                                    this.state.search_city.toLowerCase()
                                  )
                              )
                              .map((city, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    this.props.cityChange(city._id)
                                  }
                                >
                                  {city.name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>

            <div className="mobile-menu-links-left col-lg-12 col-md-12 ">
              <div className="row">
                <div className="col-sm-12" style={{ position: "unset" }}>
                  <div className="row">
                    <div
                      className="menu-div-1 col-xs-6 col-sm-6"
                      style={{ width: "55%" }}
                    >
                      <span className="more-options-btn" onMouseOver={this.showList}>
                        <img src={mapMain} />
                        <span className="text">{state_place()}</span>
                        <div className="more-options-state">
                          {this.state.show && <ul onMouseLeave={this.hideList} onClick={this.hideList}>{states}</ul>}
                        </div>
                      </span>
                    </div>
                    <div
                      className="menu-div-2 col-xs-6 col-sm-6"
                      style={{ width: "45%" }}
                    >
                      <span className="text2">{selected_city.name}</span>
                    </div>
                  </div>
                </div>

                <div className="col=sm-12" style={{ position: "unset" }}>
                  <div className="row">
                    <div
                      className="menu-div-3 col-lg-4 col-md-4"
                      style={{ width: "100%" }}
                    >
                      <span>
                        <ul className="some-cities">{cities}</ul>
                      </span>
                    </div>

                    <div
                      className="menu-div-4 col-lg-2 col-md-2"
                      style={{ width: "100%" }}
                    >
                      <span className="more-options-btn more-options-btn-cities">
                        {more_cities.length ? (
                          <>
                            <span
                              className="text"
                              style={{ paddingLeft: "40px" }}
                            >
                              more ...
                            </span>
                            <div className="more-options">
                              <ul>
                                {more_cities
                                  .filter(city =>
                                    city.name
                                      .toLowerCase()
                                      .includes(
                                        this.state.search_city.toLowerCase()
                                      )
                                  )
                                  .map((city, index) => (
                                    <li
                                      key={index}
                                      onClick={() =>
                                        this.props.cityChange(city._id)
                                      }
                                    >
                                      {city.name}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*             
            <div className="mobile-menu-links">
              <div className="menu-links-left">
              <div
                className="state-list"
                  onClick={e => {
                    e.stopPropagation();
                    this.refs.cityList.style.display = "none";
                    this.refs.ageList.style.display = "none";
                    this.refs.viewList.style.display = "none";
                    this.refs.stateList.style.display = "block";
                  }}
              >
                <img src={mapMain} />
                {this.props.places.data && this.props.filters.selectedState
                  ? this.props.places.data.find(
                      state => this.props.filters.selectedState === state._id
                    ).name
                  : null}
                <ul
                  ref="stateList"
                  value={this.props.filters.selectedState}
                  onChange={e => this.props.stateChange(e.target.value)}
                >
                  <li
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      this.refs.stateList.style.display = "none";
                    }}
                  >
                    x
                  </li>
                  {this.props.places.data &&
                    this.props.places.data.map((state, i) => (
                      <li
                        className="active"
                        key={i}
                        value={state._id}
                        onClick={() => this.props.stateChange(state._id)}
                      >
                        {state.name}
                      </li>
                    ))}
                </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.event.locations.data,
  categories: state.event.categories.data,
  page_details: state.event.eventsByCategory.data,
  events: state.event.eventsByCategory.events,
  page_number: state.event.eventsByCategory.page_number,
  successFlag: state.event.eventsByCategory.isSuccess,
  filters: state.event
});

const mapDispatchToProps = dispatch => ({
  getEventsByCategoryRequest: data =>
    dispatch(actions.getEventsByCategoryRequest(data)),
  //   getMonthlyEventsRequest: data =>
  //     dispatch(actions.getMonthlyEventsRequest(data)),
  stateChange: id => dispatch(actions.stateChange(id)),
  cityChange: id => dispatch(actions.cityChange(id))
  //   setStorableLocation: value => dispatch(actions.storableLocation(value))
});

export default geolocated()(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TopMenu)
  )
);
