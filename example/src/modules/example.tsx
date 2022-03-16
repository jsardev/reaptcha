import React, { Component, Fragment, SyntheticEvent } from 'react';
import Reaptcha, { Props as ReaptchaProps } from 'reaptcha';

import { getSiteKey } from '../config';

import Button from '../components/button';
import Container from '../components/container';
import Status from '../components/status';
import { H2 } from '../components/header';

export type Config = Pick<ReaptchaProps, 'size' | 'theme'> & {
  render: 'explicit' | 'automatic';
};

type Props = {
  config: Config;
};

type State = {
  token: string;
  loaded: boolean;
  rendered: boolean;
  verified: boolean;
  executed: boolean;
  executing: boolean;
};

const initialState = {
  token: '',
  loaded: false,
  rendered: false,
  verified: false,
  executed: false,
  executing: false
};

const CONFIG_KEYS_THAT_SHOULD_RESET_STATE: Array<keyof Config> = [
  'size',
  'theme'
];

export default class Example extends Component<Props, State> {
  captcha?: Reaptcha | null;

  state = initialState;

  onLoad = () => this.setState({ loaded: true });

  onRender = () => this.setState({ rendered: true });

  onVerify = (invisible: boolean) => (token: string) => {
    this.setState({ token, verified: true, executed: true });
    if (invisible) {
      this.setState({ executing: false, executed: true });
    }
  };

  onExpire = (invisible: boolean) => () => {
    this.setState({ verified: false });
    if (invisible) {
      this.setState({ executed: true });
    }
  };

  renderRecaptcha = () => {
    if (this.captcha) {
      this.captcha.renderExplicitly();
    }
    this.setState({ rendered: true });
  };

  executeRecaptcha = () => {
    this.setState({ executing: true });
    if (this.captcha) {
      this.captcha.execute();
    }
  };

  resetRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset();
      this.setState({
        verified: false,
        executed: false
      });
    }
  };

  getResponseRecaptcha = () => {
    if (this.captcha) {
      this.captcha.getResponse().then(response => {
        alert(response);
      });
    }
  };

  submitForm = (invisible: boolean) => (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invisible) {
      this.executeRecaptcha();
    } else {
      this.setState({ executed: true });
    }
  };

  componentDidUpdate(prevProps: Props) {
    const configDidChange = CONFIG_KEYS_THAT_SHOULD_RESET_STATE.some(
      key => this.props.config[key] !== prevProps.config[key]
    );

    if (
      (this.props.config.render === 'explicit' && configDidChange) ||
      this.props.config.render !== prevProps.config.render
    ) {
      this.setState({ ...initialState, loaded: true });
    }
  }

  render() {
    const { render, size, theme } = this.props.config;
    const { loaded, rendered, verified, executed, executing } = this.state;

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
            <Reaptcha
              key={render}
              ref={e => (this.captcha = e)}
              sitekey={sitekey}
              size={size}
              theme={theme}
              explicit={explicit}
              onLoad={this.onLoad}
              onRender={this.onRender}
              onVerify={this.onVerify(invisible)}
              onExpire={this.onExpire(invisible)}
            />
          </Container>
          <Container inline gap>
            {explicit && (
              <Button
                onClick={this.renderRecaptcha}
                disabled={!loaded || rendered}
                submitted={rendered}
              >
                {rendered ? 'Rendered' : 'Render'}
              </Button>
            )}
            {invisible && (
              <Button
                type="submit"
                disabled={
                  (!verified && !invisible) ||
                  executing ||
                  executed ||
                  !rendered
                }
                executing={executing}
                submitted={executed}
              >
                {executed ? 'Verified' : executing ? 'Verifying' : 'Verify'}
              </Button>
            )}
            <Button
              type="button"
              onClick={this.resetRecaptcha}
              disabled={!verified}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={this.getResponseRecaptcha}
              disabled={!verified}
            >
              Get Response
            </Button>
          </Container>
        </form>
      </Fragment>
    );
  }
}
