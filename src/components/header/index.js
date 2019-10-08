import React from "react";
import Logo from "../../images/logo.png";
import Menu from "../../images/icon/menu.svg";
import profile from "../../images/oval.png";
import Close from "../../images/icon/cross.svg";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { localStore } from "../../services/storage";
import { ReactComponent as UserIcon } from "../../images/user.svg";
import user from "../../images/user.svg";
import CategoryNav3 from "../generic/CategoryNav3";
import MenuImage from "../../images/menuImage.svg";
import f1 from "../../images/footer/f11.png";
import f2 from "../../images/footer/f22.png";
import f3 from "../../images/footer/f33.png";
import f4 from "../../images/footer/f44.png";
import f5 from "../../images/footer/f55.png";
import f6 from "../../images/footer/f66.png";
import f7 from "../../images/footer/f77.png";
import f8 from "../../images/footer/f88.png";
import f9 from "../../images/footer/f99.jpg";
import fb from "../../images/icon/fb.svg";
import twitter from "../../images/icon/twitter/blue_b.svg";
import insta from "../../images/icon/insta.svg";
import mapMain from "../../images/map-main-color_g.svg";
import phone from "../../images/phone_g.svg";
import CategoryNav from "../generic/CategoryNav";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openClass: "",
      auth: false,
      showLoading: false,
      activeLi: false
    };
    
    this.ToggleBody = () => {
      var currentClass = document.getElementsByTagName("body")[0];
      var isAlreadyOpened = currentClass.classList.contains("open");

      if (!isAlreadyOpened) {
        currentClass.classList.add("open");
      } else {
        currentClass.classList.remove("open");
      }
    };
    if (!props.categories.data) {
      props.getCategories();
    }
    if (!props.locations.data) {
      props.getLocations();
    }
    if (localStore("token")) {
      props.getUserData(localStore("token"));
    }
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.authenticated !== nextProps.authenticated) {
    //   this.setState({ auth: nextProps.authenticated });
    // }
  }

  render() {
    const oThis = this;
    let d = new Date();
    let currentYear = d.getFullYear();
    if (!this.props.categoryDataState) {
      this.props.getCategory(this.props.categories);
    }
    let { loggedUserData, location, userdata, categories2 } = this.props;
    if (!this.props.post.data && userdata.data) {
      this.props.getUserPostById(userdata.data._id);
    }
    return (
    
      <div className="fix-header">
        <div className="black-header">
        <div className="menuMobile">
          <Link to="/">
            <div className="logoDiv">
              <img className="logo" src={Logo} />
            </div>
          </Link>
          <div className="itemDiv">
            <button className="menu-toggle" onClick={this.ToggleBody} />
            <nav>
              {/* <Link to="/">
                {" "}
                <img onClick={this.ToggleBody} className="logo" src={Logo} />
              </Link> */}
              <ul className="menu">
                <li
                  className="row "
                  style={{ background: "#fff", paddingBottom: "20px",margin: "0 auto" }}
                >
                  <CategoryNav3
                    {...this.props}
                    categories={categories2}
                    handleClick={this.ToggleBody}
                  />
                </li>
                <li data-text="ABOUT">
                  <Link to="/aboutus" onClick={this.ToggleBody}>
                    ABOUT
                  </Link>
                </li>
                <li data-text="Events">
                  {/* <Link to="/events" onClick={this.ToggleBody}>
                    EVENTS
                  </Link> */}
                  <a href="https://www.topeventsinjamaica.com/shopping"  target="_blank">
                    EVENTS
                  </a>
                </li>
                <li data-text="Events">
                  <Link to="/about-style-jamica" onClick={this.ToggleBody}>
                    STYLE JAMAICA
                  </Link>              
                </li>
               
                <li data-text="CONTACT">
                  <Link to="/contactus" onClick={this.ToggleBody}>
                    CONTACT US
                  </Link>
                </li>
                {/* {!userdata.data ||
                (userdata.data &&
                  userdata.data.companyDetails &&
                  userdata.data.companyDetails.title) ? ( */}
                <li
                  style={{
                    marginTop: "10px"
                  }}
                  data-text="GET COMPANY LISTED"
                >
                  <span
                    className="blueBtn"
                    onClick={() => {
                      this.ToggleBody();
                      this.props.modalStateHandler(true, true);
                    }}
                  >
                    GET COMPANY LISTED{" "}
                  </span>
                </li>
                {/* ) : null} */}
                <img
                  className="menuImage-mobile"
                  src={MenuImage}
                  width="80px"
                  style={{ position: "absolute", right: "10%", top: "20%" }}
                />
                {localStore("token") && this.props.userdata.data ? (
                  <li data-text="GET COMPANY LISTED" className="registerLi">
                    <div className="lower-section">
                      <div className="registerDiv logged-in">
                        <div className="name">
                          {this.props.userdata.data.name.first}{" "}
                          {this.props.userdata.data.name.last}
                        </div>
                        <div>{this.props.userdata.data.email}</div>
                        <div className="hr" />
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(false, false);
                          }}
                        >
                          <Link to="/profile">ACCOUNT SETTINGS</Link>
                        </div>
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(false, false);
                          }}
                        >
                          {userdata.data &&
                          userdata.data.companyDetails &&
                          userdata.data.companyDetails.title ? (
                            <Link to="/company">COMPANY PAGE</Link>
                          ) : null}
                        </div>
                        <div
                          className="logout"
                          onClick={() => {
                            this.setState({
                              apiCall: true
                            });
                            this.ToggleBody();
                            this.props.modalStateHandler(
                              false,
                              false,
                              false,
                              false,
                              false,
                              false,
                              false
                            );
                            localStorage.removeItem("token");
                            this.props.history.push("/auth/");
                            this.props.logout();
                          }}
                        >
                          <a> LOG OUT</a>
                        </div>
                      </div>
                        <div id ="mobile-footer">
                          <div className="col-12 footer-col">     

                              <div className="mob-footerlinks">
                                        <div className = "row1">
                                            <a href="https://www.mot.gov.jm/" target="_BLANK">
                                                <img src={f1} />
                                            </a>
                                            <a
                                                  href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                                                  target="_BLANK"
                                            >
                                                <img src={f5} />
                                            </a>
                                            <a href="http://www.jamaicatradeandinvest.org/" target="_BLANK"target="_BLANK">
                                                  <img src={f6} />
                                            </a>
                                            <a target="_BLANK">
                                                  <img src={f8} />
                                                </a>
                                              
                                        </div>

                                        <div className="row2">
                                                <a
                                                  href="http://www.jamaicatradeandinvest.org/"
                                                  target="_BLANK"
                                                >
                                                  <img
                                                    className="f9image"
                                                    src={f9}
                                                    // style={{ filter: "saturate(8) " }}
                                                  />
                                                </a>
                                                <a
                                                  href="https://www.instagram.com/thejmea_/"
                                                  target="_BLANK"
                                                >
                                                  <img src={f3} />
                                                </a>
                                                <a href="https://www.jbdc.net/" target="_BLANK">
                                                  <img src={f4} />
                                                </a>
                                                <a href="http://www.jhta.org/" target="_BLANK">
                                                  <img src={f7} />
                                                </a>                                                    
                                        </div> 
                                        <div className="row3">
                                                <a href="https://www.facebook.com/tefjamaica/"
                                                target="_BLANK"
                                                >
                                                    <img src={fb} />
                                                </a>
                                                <a href="https://www.instagram.com/tourismenhancementfundja/"
                                                  target="_BLANK"
                                                >
                                                    <img src={insta} />
                                                </a>
                                                <a href="https://www.mot.gov.jm/" target="_BLANK">
                                                    <img src={twitter} />
                                                </a>
                                      </div>                                           
                              </div>  

                            <div className="mobile-copyright col">                    
                              Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                            a division of the Tourism Enhancement Fund                                                                     
                            </div>  

                          </div>
                        </div>

                    </div>
                  </li>
                ) : (
                  <li
                    data-text="GET COMPANY LISTED"
                    className="registerLi"
                    onClick={() => {
                      this.ToggleBody();
                      this.props.modalStateHandler(
                        true,
                        false,
                        false,
                        false,
                        false,
                        true,
                        true
                      );
                    }}
                  >
                    <div className="lower-section">
                      <div className="registerDiv logged-in">
                        <Link to="/auth" style={{ paddingTop: "20px" }}>
                          REGISTER / LOGIN
                        </Link>
                      </div>
                      <div id ="mobile-footer">
                          <div className="col-12 footer-col">           


                          <div className="mob-footerlinks">
                                        <div className = "row1">
                                            <a href="https://www.mot.gov.jm/" target="_BLANK">
                                                <img src={f1} />
                                            </a>
                                            <a
                                                  href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                                                  target="_BLANK"
                                            >
                                                <img src={f5} />
                                            </a>
                                            <a href="http://www.jamaicatradeandinvest.org/" target="_BLANK"target="_BLANK">
                                                  <img src={f6} />
                                            </a>
                                            <a target="_BLANK">
                                                  <img src={f8} />
                                                </a>
                                              
                                        </div>

                                        <div className="row2">
                                                <a
                                                  href="http://www.jamaicatradeandinvest.org/"
                                                  target="_BLANK"
                                                >
                                                  <img
                                                    className="f9image"
                                                    src={f9}
                                                    // style={{ filter: "saturate(8) " }}
                                                  />
                                                </a>
                                                <a
                                                  href="https://www.instagram.com/thejmea_/"
                                                  target="_BLANK"
                                                >
                                                  <img src={f3} />
                                                </a>
                                                <a href="https://www.jbdc.net/" target="_BLANK">
                                                  <img src={f4} />
                                                </a>
                                                <a href="http://www.jhta.org/" target="_BLANK">
                                                  <img src={f7} />
                                                </a>                                                    
                                        </div> 
                                        <div className="row3">
                                                <a href="https://www.facebook.com/tefjamaica/"
                                                target="_BLANK"
                                                >
                                                    <img src={fb} />
                                                </a>
                                                <a href="https://www.instagram.com/tourismenhancementfundja/"
                                                  target="_BLANK"
                                                >
                                                    <img src={insta} />
                                                </a>
                                                <a href="https://www.mot.gov.jm/" target="_BLANK">
                                                    <img src={twitter} />
                                                </a>
                                      </div>                                           
                              </div> 

                            <div className="header-mobile-copyright col">                    
                                Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                            a division of the Tourism Enhancement Fund                                                                  
                            </div>  

                          </div>
                        </div>

                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        {
          <div
            className={
              this.props.mobileMenu ? "menuItemMobile" : "menuItemMobileNone"
            }
          >
            <div className="headerMobileMenu">
              <div />
              <img onClick={this.props.setMobileMenu} src={Close} />
            </div>
            <div className="contentMobileMenu">
              <div className="upper-section">
                <div className="item">
                  <Link to="/aboutus">About</Link>
                </div>
            
                <div className="item" onClick={() => {}}>
                  <Link to="/business">Events</Link>
                </div>
                <div className="item" onClick={() => {}}>
                  <Link to="/about-style-jamica" onClick={() => {}}>
                      STYLE JAMAICA
                  </Link> 
                </div>
                <div className="item" onClick={() => {}}>
                  <Link to="/contactus">Contact us</Link>
                </div>
                <div
                  className="getStarted"
                  onClick={() => {
                    this.props.modalStateHandler(
                      true,
                      false,
                      false,
                      true,
                      false,
                      false
                      // true
                    );
                  }}
                >
                  <a>GET COMPANY LISTED</a>
                </div>
              </div>
            </div>
            <div className="lower-section">
              <div
                className="registerDiv"
       
              >
                <Link to="/auth">Register / Login</Link>
              </div>
              
            </div>
          </div>
        }
        <div className="menu container">
          <div className="row">
            <div className="col-2">
              <Link
                to="/"
                onClick={() => {
                  this.setState({ activeLi: true });
                }}
              >
                {" "}
                <div className="logoDiv">
                  <img className="logo" src={Logo} />
                </div>
              </Link>
            </div>

            <div className="itemDiv col-8">
              <div className="item">
                <div
                  className="normal"
                  onClick={() => {
                    this.props.modalStateHandler(
                      true,
                      false,
                      false,
                      false,
                      false,
                      false,
                      true
                    );
                  }}
                >
                  <Link
                    to="/aboutus"
                    className={`  ${
                      location.pathname === "/aboutus" ? "liActive" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLi: true });
                    }}
                  >
                    About
                  </Link>
                </div>
                <div
                  className="normal"
                  onClick={() => {
                    this.props.modalStateHandler(
                      false,
                      false,
                      true,
                      false,
                      false,
                      false,
                      true
                    );
                  }}
                >

                  <a href="https://www.topeventsinjamaica.com/shopping" target="_blank">
                    Events
                  </a>
                </div>
                <div className="normal"
                  onClick={() => {
                    this.props.modalStateHandler(
                      false,
                      false,
                      true,
                      false,
                      false,
                      false,
                      true
                    );
                  }}>
                  <Link to="/about-style-jamica" onClick={() => {}}>
                      Style Jamaica
                  </Link> 
                </div>
                <div
                  className="normal"
                >
                  <Link
                    to="/contactus"
                    className={`  ${
                      location.pathname === "/contactus" ? "liActive" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLi: true });
                    }}
                  >
                    Contact us
                  </Link>
                </div>
             
                <div
                  className="getStarted"
                  onClick={() => {
                    {
                      this.props.modalStateHandler(true, true);
                    }
                  }}
                >
                  <a>GET COMPANY LISTED</a>
                </div>
                {/* ) : null} */}
              </div>
            </div>
            {localStore("token") && this.props.userdata.data ? (
              <div className="col-2 profileDiv">
                <div className="dropdown">
                  <img className="dropbtn" src={user} />
                  <div className="dropdown-content">
                    <div className="logged-user">
                      <h6>
                        {this.props.userdata.data.name.first}{" "}
                        {this.props.userdata.data.name.last}
                      </h6>
                      <span>{this.props.userdata.data.email}</span>
                    </div>
                    <button className="logout">
                      <Link to="/profile">Account Settings</Link>
                    </button>
                    {userdata.data &&
                    userdata.data.companyDetails &&
                    userdata.data.companyDetails.title ? (
                      <>
                      <button className="logout">
                        <Link to="/company">Company Page</Link>
                      </button>
                       <button className="logout">
                       <Link to="/wishlist">WishList</Link>
                     </button>
                     </>
                    ) : null}

                    <button
                      className="logout"
                      onClick={() => {
                        this.setState({
                          apiCall: true
                        });
                        this.props.modalStateHandler(
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false
                        );
                        localStorage.removeItem("token");
                        this.props.logout();
                        this.props.history.push("/auth/");
                      }}
                    >
                      <a> Log Out</a>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="registerDiv col-2">
                <Link
                  to="/auth/"
                  className={`  ${
                    location.pathname === "/auth/" ||
                    location.pathname === "/auth/register"
                      ? "liActive"
                      : ""
                  }`}
                  onClick={() => {
                    this.setState({ activeLi: true });
                  }}
                >
                  Login/Register
                </Link>
              </div>
            )}
          </div>
        </div>
     </div>
     {window.screen.width >768 &&
     <CategoryNav
            categories={this.props.categories2}
            handleSubcat={this.props.handleSubcat}
          />
      }
      </div>
     
          
    
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.categories.data,
  locations: state.event.locations.data,
  login: state.auth.login,
  userdata: state.auth.userdata.data,
  post: state.event.postById.data
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(actions.getCategoriesRequest()),
  getLocations: () => dispatch(actions.getLocationsRequest()),
  getUserData: data => dispatch(actions.getUserDataRequest(data)),
  logout: () => dispatch(actions.logout()),
  getUserPostById: data => dispatch(actions.getUserPostByIdRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
