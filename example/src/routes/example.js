/* @flow */

import React, { Component, Fragment } from 'react';
import qs from 'query-string';
import { Route } from 'react-router-dom';
import Reaptcha from 'reaptcha';

import Button from '../components/button';
import Container from '../components/container';
import Status from '../components/status';
import Input from '../components/input';
import { H2 } from '../components/header';
import { getSiteKey } from '../config';
import { NavLink } from '../components/link';

type Props = {
  location: {
    search: string
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

  submitForm = (invisible: boolean) => e => {
    e.preventDefault();
    if (invisible) {
      this.executeRecaptcha();
    } else {
      this.setState({ submitted: true });
    }
  };

  render() {
    const { render, size, theme } = qs.parse(this.props.location.search);
    const { loaded, rendered, verified, submitted, executing } = this.state;

    const explicit = render === 'explicit';
    const invisible = size === 'invisible';
    const sitekey = getSiteKey(invisible);

    return (
      <Fragment>
        <Container inline mb>
          <H2>Example form</H2>
          <Route
            path="/(.+)"
            render={() => (
              <NavLink to="/">
                <Button small short ml>
                  Back
                </Button>
              </NavLink>
            )}
          />
        </Container>
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
          <Container mb>
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
          </Container>
        </form>
      </Fragment>
    );
  }
}
