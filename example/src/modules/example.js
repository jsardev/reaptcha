/* @flow */

import React, { Component, Fragment } from 'react';
import Reaptcha from 'reaptcha';

import { getSiteKey } from '../config';

import Button from '../components/button';
import Container from '../components/container';
import Status from '../components/status';
import Input from '../components/input';
import { H2 } from '../components/header';

type Props = {
  config: {
    render?: string,
    size?: string,
    theme?: string
  }
};

type State = {
  token: string,
  loaded: boolean,
  rendered: boolean,
  verified: boolean,
  submitted: boolean,
  executing: boolean
};

export default class Example extends Component<Props, State> {
  captcha: ?Reaptcha = null;

  state = {
    token: '',
    loaded: false,
    rendered: false,
    verified: false,
    submitted: false,
    executing: false
  };

  onLoad = () => this.setState({ loaded: true });

  onRender = () => this.setState({ rendered: true });

  onVerify = (invisible: boolean) => (token: string) => {
    this.setState({ token, verified: true });
    if (invisible) {
      this.setState({ executing: false, submitted: true });
    }
  };

  onExpire = () => this.setState({ verified: false });

  renderRecaptcha = () => {
    if (this.captcha) {
      this.captcha.renderExplicitly();
    }
    this.setState({ rendered: true });
  };

  executeRecaptcha = () => {
    if (this.captcha) {
      this.setState({ executing: true });
      this.captcha.execute();
    }
  };

  resetRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset();
      this.setState({
        verified: false,
        submitted: false
      });
    }
  };

  submitForm = (invisible: boolean) => e => {
    e.preventDefault();
    if (invisible) {
      this.executeRecaptcha();
    } else {
      this.setState({ submitted: true });
    }
  };

  render() {
    const { render, size, theme } = this.props.config;
    const { loaded, rendered, verified, submitted, executing } = this.state;

    const explicit = render === 'explicit';
    const invisible = size === 'invisible';
    const sitekey = getSiteKey(invisible);

    return (
      <Fragment>
        <H2 mb>Example</H2>
        <Container inline mb>
          <div>reCAPTCHA status:</div>
          <Container inline>
            <Status active={loaded}>Loaded</Status>
            <Status active={rendered}>Rendered</Status>
            <Status active={verified}>Verified</Status>
          </Container>
        </Container>
        <form onSubmit={this.submitForm(invisible)}>
          <Container mb>
            <Input id="name" name="name" placeholder="Your name" label="Name" />
          </Container>
          <Container mb>
            <Reaptcha
              ref={e => (this.captcha = e)}
              sitekey={sitekey}
              size={size}
              theme={theme}
              explicit={explicit}
              onLoad={this.onLoad}
              onRender={this.onRender}
              onVerify={this.onVerify(invisible)}
              onExpire={this.onExpire}
            />
          </Container>
          <Container inline>
            {explicit &&
              !rendered && (
                <Button onClick={this.renderRecaptcha} disabled={!loaded}>
                  Verify
                </Button>
              )}
            {(!explicit || rendered) && (
              <Button
                type="submit"
                disabled={(!verified && !invisible) || executing || submitted}
                executing={executing}
                submitted={submitted}
              >
                {submitted ? 'Done!' : executing ? 'Verifying' : 'Submit'}
              </Button>
            )}
            <Button onClick={this.resetRecaptcha} disabled={!verified} ml>
              Reset
            </Button>
          </Container>
        </form>
      </Fragment>
    );
  }
}
