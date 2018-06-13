/* @flow */

import React, { Component, Fragment } from 'react';
import qs from 'query-string';
import Reaptcha from 'reaptcha';

import Button from '../components/button';
import Container from '../components/container';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

type Props = {
  location: {
    search: string
  }
};

type State = {
  ready: boolean,
  rendered: boolean
};

export default class Example extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ready: false,
      rendered: false
    };
  }

  captcha: ?Reaptcha = null;

  render() {
    const { render, size, theme } = qs.parse(this.props.location.search);
    const renderDisabled = !this.state.ready || this.state.rendered;

    const isExplicit = render === 'explicit';

    return (
      <Fragment>
        {isExplicit && (
          <Container>
            <Button
              onClick={() => {
                if (this.captcha) {
                  this.captcha.renderExplicitly();
                }
                this.setState({ rendered: true });
              }}
              disabled={renderDisabled}
            >
              Render
            </Button>
          </Container>
        )}
        <Reaptcha
          ref={e => (this.captcha = e)}
          sitekey={SITE_KEY}
          onLoad={() => {
            this.setState({
              ready: true
            });
          }}
          onVerify={() => {
            // Do something
          }}
          explicit={isExplicit}
          size={size}
          theme={theme}
        />
      </Fragment>
    );
  }
}
