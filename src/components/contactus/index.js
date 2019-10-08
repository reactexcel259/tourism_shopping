import React, { Component } from "react";
import Block1 from "../generic/Block1";
import l_img from "../../images/l_img.png";
import contact_r_img from "../../images/contactus.png";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Loader from "react-loader-spinner";

class ContactUs extends Component {
  render() {
    return (
      <Block1 l_img={l_img} r_img={contact_r_img}>
        <div className="container-fluid">
          <div className="row text-center contact-block">
            <div className="col-lg-8 offset-lg-1 col-md-8 offset-md-2 col-sm-12 col-xs-12 contact-div">
              <div className="row">
                <div className="col-12 contact-align">
                  <div className="title">Contact Us</div>
                        <div className="contact-address mtn-contact mtn font-controler"><strong className="mtn-contact">Address:</strong><span className="contact-address">60 Knutford Boulevard, Kingston 5 Jamaica, West Indies</span></div>
                        <div className="font-controler"><strong className="mtn-contact">Tele:</strong> (876) 920-4926-30</div>
                        <div className="font-controler"><strong className="mtn-contact">Fax:</strong> (876) 920-4944</div><br></br>
                  <div className="desc">
                    <div className="info">
                      Thank you for visiting our website. If you would you like
                      to share your thoughts with us or have a question, please
                      complete the form below and we will respond as soon as we
                      can.
                    </div>
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        message: ""
                      }}
                      validate={values => {
                        let errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Invalid email address";
                        }
                        if (!values.name) {
                          errors.name = "Required";
                        }
                        if (!values.message) {
                          errors.message = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, actions) => {
                        actions.resetForm();
                        this.props.contactUsRequest(values);
                      }}
                      render={({
                        values,
                        errors,
                        status,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <Form className='contactForm'>
                          <div className="input-fields">
                            <div className="label">
                              <label>Your Name</label>
                            </div>
                            <div className="field-block">
                              <input
                                name="name"
                                value={values.name}
                                type="text"
                                placeholder=""
                                onChange={handleChange}
                              />
                              {errors.name && touched.name && (
                                <label className="error">{errors.name}</label>
                              )}
                            </div>
                          </div>
                          <div className="input-fields">
                            <div className="label">
                              <label>Your Email</label>
                            </div>
                            <div className="field-block">
                              <input
                                name="email"
                                value={values.email}
                                type="email"
                                placeholder=""
                                onChange={handleChange}
                              />
                              {errors.email && touched.email && (
                                <label className="error">{errors.email}</label>
                              )}
                            </div>
                          </div>
                          <div className="input-fields">
                            <div className="label">
                              <label>Your Message here</label>
                            </div>
                            <div className="field-block">
                              <textarea
                                name="message"
                                value={values.message}
                                type="text"
                                placeholder=""
                                onChange={handleChange}
                              />
                              {errors.message && touched.message && (
                                <label className="error">
                                  {errors.message}
                                </label>
                              )}
                            </div>
                          </div>
                          <div>
                            <button type="submit">
                              {this.props.contactUs.isLoading ? (
                                <div className="loader-div">
                                  <Loader
                                    type="Oval"
                                    color="#fff"
                                    height="20"
                                    width="20"
                                  />
                                </div>
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Block1>
    );
  }
}

const mapStateToProps = state => ({
  contactUs: state.auth.contactUs
});

const mapDispatchToProps = dispatch => ({
  contactUsRequest: values => dispatch(actions.contactUsRequest(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
