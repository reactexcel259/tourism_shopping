import React, { Component } from "react";

export default class Block1 extends Component {
  render() {
    const { children, l_img, r_img } = this.props;
    return (
      <div className="child-selector grid-container row">
        <div
          className="grid-item"
          style={{
            backgroundImage: window.innerWidth <= 767 ? `url(${r_img})` : "none",
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </div>
        <div className="grid-item" style={{ backgroundImage: `url(${r_img})` }}>
          <div className="fly-text" />
        </div>
      </div>
    );
  }
}
