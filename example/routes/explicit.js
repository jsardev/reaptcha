import React, { Component, Fragment } from 'react';
import Reaptcha from '../../index';

class Explicit extends Component {
  render() {
    return (
      <Fragment>
        <Reaptcha siteKey={this.props.siteKey} />
      </Fragment>
    );
  }
}

export default Explicit;
