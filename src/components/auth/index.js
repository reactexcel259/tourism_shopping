import React, { Component } from "react";
// import logo from "../../images/logo_transparent.png";
// import fbWhite from "../../images/fb-white.svg";
// import whiteCross from "../../images/cross-white.svg";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Formik, Form } from "formik";
import FacebookLogin from "react-facebook-login";
import Loader from "react-loader-spinner";
import { withRouter, Route, Switch } from "react-router-dom";
import Block1 from "../generic/Block1";
import l_img from "../../images/l_img.png";
import login_r_img from "../../images/login.png";
import signup_r_img from "../../images/register.png";
import Login from "../login/index";
import Signup from "../signup";
import { Link } from "react-router-dom";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.signup.isSuccess &&
      this.props.signup.isSuccess !== prevProps.signup.isSuccess
    ) {
      this.props.history.push("/auth/");
      // this.props.modalStateHandler(false, false, false, false);
    }
    if (
      this.props.login.isSuccess &&
      this.props.login.isSuccess !== prevProps.login.isSuccess
    ) {
      this.props.history.push("/");
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  responseFacebook = response => {
    this.props.socialLogin(response);
  };
  render() {
    const { location } = this.props;
    return (
      <Block1
        l_img={l_img}
        r_img={
          this.props.location.pathname === "/auth" ? login_r_img : signup_r_img
        }
      >
        <div className="container ">
          <div className="row login-form-row">
            <div className="col-lg-8 offset-lg-1 col-md-8 offset-md-1 col-sm-12 col-xs-12 login-form register-form">
              <div className="form-section">
                <nav style={{ paddingBottom: "30px" }}>
                  <span
                    className={`form-title ${
                      location.pathname === "/auth" ||
                      location.pathname === "/auth/"
                        ? " active"
                        : ""
                    }`}
                  >
                    <Link to="/auth/">Log in</Link>
                  </span>
                  <span
                    className={`form-title ${
                      location.pathname === "/auth/register" ? " active" : ""
                    }`}
                  >
                    <Link to="/auth/register">Register</Link>
                  </span>
                </nav>

                <Switch>
                  <Route
                    path="/auth/register"
                    render={() => (
                      <Signup responseFacebook={this.responseFacebook} />
                    )}
                  />
                  <Route
                    path="/auth/"
                    render={() => (
                      <Login responseFacebook={this.responseFacebook} />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Block1>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.auth.signup,
  login: state.auth.login
});

const mapDispatchToProps = dispatch => ({
  socialLogin: data => dispatch(actions.socialLoginRequest(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
