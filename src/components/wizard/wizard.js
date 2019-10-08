import React, { Component } from "react";

import PropTypes from "prop-types";
import WizardFormFirstPage from "./WizardFormFirstPage";
import WizardFormSecondPage from "./WizardFormSecondPage";
import WizardFormThirdPage from "./WizardFormThirdPage";

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      open: false
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.submitEvent.duplicate_email &&
      this.props.submitEvent.duplicate_email !==
        prevProps.submitEvent.duplicate_email
    ) {
      this.setState({ page: 1 });
      this.props.submitEventReset();
    }
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  // collapseState = () => {
  //   this.setState({ open: !this.state.open });
  // };
  render() {    
    const { onSubmit, categories, userdata } = this.props;
    const { page, open } = this.state;
    return (
      <div>
        {page === 1 && (
          <WizardFormFirstPage onSubmit={this.nextPage} userdata={userdata} />
        )}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            categories={categories}
            handleClick={() =>
              this.setState({
                open: !open
              })
            }
            open={this.state.open}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
            isLoading={this.props.submitEvent.isLoading}
            onSuccessCompanyListed={this.props.onSuccessCompanyListed}
          />
        )}
      </div>
    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default WizardForm;
