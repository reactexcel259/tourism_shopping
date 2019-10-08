import React, { Component } from 'react'
import "./aboutStyleJamica.scss"
import i9 from "../../images/image_3_.svg";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import AboutStyleJamaica from "../generic/AboutStyleJamaicaComponent";
import CategoryItem from "../generic/CategoryItem";
import bg_crafts from "../../images/bg_crafts.png";

class index extends Component {
    componentDidMount(){
        this.props.getArtistsRequest();
    }
    componentDidUpdate(preProps){
        const {artistInterstData} =this.props;
        if(artistInterstData.isSuccess !== preProps.artistInterstData.isSuccess){
            this.props.getArtistsRequest();
        }
    }
    render() {
        const stylejamaica = this.props.artists.data;
        return (
            <div className="about-style-zamica-container event-div event-page">
            <img src={i9}/>
                <h1>About Style Jamica</h1>
                {stylejamaica && stylejamaica.websiteDetails &&
                 <p className="descr">{stylejamaica.websiteDetails.description}</p> 
               
                }
                <div className="event-div row" style={{
                    backgroundImage: `url(${bg_crafts})`,
                    backgroundRepeat: "no-repeate",
                    backgroundPosition: "center",
                    backgroundSize: "contain"
                }}>
                    {
                        stylejamaica && stylejamaica.data.map(
                            (artist, index)=>(
                                <AboutStyleJamaica  key={index} event={artist}/>
                                // <CategoryItem key={index} event={artist} />
                            )
                        )  
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        artists:state.event.Artists.data,
        userdata: state.auth.userdata.data,
        artistInterstData: state.event.artistsInterest

    }
    
}

const mapDispatchToProps = dispatch => ({
  getArtistsRequest: () => dispatch(actions.getArtistsRequest()),
//   addInterest: id => dispatch(actions.addInterestRequest(id))

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);
