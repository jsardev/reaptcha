import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import qs from 'query-string';

import Reaptcha from '../../index';
import Button from '../components/button';
import Container from '../components/container';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

export default class Explicit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      rendered: false
    };
  }

  render() {
    const options = qs.parse(this.props.location.search);
    const renderDisabled = !this.state.ready || this.state.rendered;

    return (
      <Fragment>
        <Container>
        <Button
          onClick={() => {
            this.captcha.renderRecaptcha();
            this.setState({ rendered: true });
          }}
          disabled={renderDisabled}
        >
          Render
        </Button>
        </Container>
        <Reaptcha
          {...options}
          ref={e => (this.captcha = e)}
          siteKey={SITE_KEY}
          explicit
          onLoad={() => {
            this.setState({
              ready: true
            });
          }}
        />
      </Fragment>
    );
  }
}
