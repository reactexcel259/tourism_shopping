import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import {
  renderField,
  renderSelect,
  renderTextarea,
  renderTag
} from "./renderField";
import "./index.scss";
import checkMark from "../../images/icon/checkmark-green.svg";

import Loader from "react-loader-spinner";


const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
      {colors.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

class WizardFormThirdPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lng: "",
      zoom: 7,
      map: "",
      apiCall: false,
      errors: []
    };
  }



  renderErrors = () => {
    if (this.state.errors.length > 0) {
      return (
        <div className="company-list-error-message">
          {this.state.errors.map((error, i) => {
            return <div key={i}>*{error}</div>;
          })}
        </div>
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoading &&
      this.props.isLoading !== prevProps.isLoading
    ) {
      this.props.reset();
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      mutate,
      onSubmit,
      isLoading
    } = this.props;    
    
    return (
      <div>
        {this.state.apiCall ? <Loader /> : ""}
        <div className="inActiveHeader">
          <div className="number">1</div>
          <div className="subHeading">General information</div>
          <img src={checkMark} />
        </div>
        <div className="inActiveHeader">
          <div className="number">2</div>
          <div className="subHeading">About your company</div>
          <img src={checkMark} />
        </div>
        <div className="form">
          <div className="form-1">
            <div className="form-header">
              <div className="number">3</div>
              <div className="subHeading">Contact information</div>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Field
                name="address"
                type="text"
                component={renderField}
                label="Full address"
              />
              
              <Field
                name="phone_number"
                type="text"
                component={renderField}
                label="Phone number"
              />
              <Field
                name="facebook_url"
                type="text"
                component={renderField}
                label="Facebook Url"
              />
              <Field
                name="insta_url"
                type="text"
                component={renderField}
                label="Instagram"
              />
              <Field
                name="fax"
                type="text"
                component={renderField}
                label="Fax"
              />{" "}
              <Field
                name="website"
                type="text"
                component={renderField}
                label="Company website"
              />
              
              {this.renderErrors()}
              <button onClick={previousPage} type="button" className="nextsignup backbutton">
                BACK
              </button>
              <button
                type="submit"
                className="nextsignup"
                disabled={pristine || submitting}
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// export default WizardFormThirdPage;

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
