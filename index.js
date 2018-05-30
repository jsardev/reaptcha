import React, { Component } from 'react';

class Reaptcha extends Component {
  render() {
    return <div className="g-recaptcha" data-sitekey={this.props.siteKey} />;
  }
}

export default Reaptcha;
