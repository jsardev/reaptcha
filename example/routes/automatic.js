import React, { Component, Fragment } from 'react';
import Reaptcha from '../../index';

class Automatic extends Component {
  render() {
    return (
      <Fragment>
        <Reaptcha siteKey={this.props.siteKey} />
      </Fragment>
    );
  }
}

export default Automatic;
