/* @flow */

import React, { Component, Fragment } from 'react';
import qs from 'query-string';
import Reaptcha from 'reaptcha';

import Button from '../components/button';
import { FormGroup } from '../components/form';
import Input from '../components/input';
import { H2 } from '../components/header';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

type Props = {
  location: {
    search: string
  }
};

type State = {
  ready: boolean,
  rendered: boolean,
  verified: boolean,
  submitted: boolean
};

export default class Example extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ready: false,
      rendered: false,
      verified: false,
      submitted: false
    };
  }

  captcha: ?Reaptcha = null;

  render() {
    const { render, size, theme } = qs.parse(this.props.location.search);

    const renderDisabled = !this.state.ready || this.state.rendered;
    const isExplicit = render === 'explicit';

    return (
      <Fragment>
        <H2>Example form</H2>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.setState({ submitted: true });
          }}
        >
          <FormGroup>
            <Input id="name" name="name" placeholder="Your name" label="Name" />
          </FormGroup>
          <FormGroup>
            <Reaptcha
              ref={e => (this.captcha = e)}
              sitekey={SITE_KEY}
              size={size}
              theme={theme}
              explicit={isExplicit}
              onLoad={() => {
                this.setState({
                  ready: true
                });
              }}
              onRender={() => {
                this.setState({
                  rendered: true
                });
              }}
              onVerify={() => {
                this.setState({
                  verified: true
                });
              }}
              onExpire={() => {
                this.setState({
                  verified: false
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            {isExplicit &&
              !this.state.rendered && (
                <Button
                  onClick={() => {
                    if (this.captcha) {
                      this.captcha.renderExplicitly();
                    }
                    this.setState({ rendered: true });
                  }}
                  disabled={renderDisabled}
                >
                  Verify
                </Button>
              )}
            {!isExplicit && (
              <Button
                type="submit"
                disabled={!this.state.verified || this.state.submitted}
                submitted={this.state.submitted}
              >
                {this.state.submitted ? 'Done!' : 'Submit'}
              </Button>
            )}
          </FormGroup>
        </form>
      </Fragment>
    );
  }
}
