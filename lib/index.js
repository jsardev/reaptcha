/* @flow */

import React, { Component } from 'react';

import { injectScript, isAnyScriptPresent } from './utils';
import type { RecaptchaConfig } from './types';

type Props = {
  id?: string,
  className?: string,
  sitekey: string,
  theme?: 'light' | 'dark',
  size?: 'compact' | 'normal' | 'invisible',
  badge?: 'bottomright' | 'bottomleft' | 'inline',
  tabindex?: number,
  explicit?: boolean,
  onLoad?: Function,
  onRender?: Function,
  onVerify: Function,
  onExpire?: Function,
  onError?: Function,
  inject?: boolean,
  isolated?: boolean,
  hl?: string
};

type State = {
  instanceId: ?number,
  ready: boolean,
  rendered: boolean,
  invisible: boolean,
  timer: ?IntervalID
};

const USED_RECAPTCHA_SCRIPT_URL = 'https://recaptcha.net/recaptcha/api.js';

const RECAPTCHA_SCRIPTS_URLS = [
  'https://google.com/recaptcha',
  'https://recaptcha.net/recaptcha',
  'https://www.gstatic.com/recaptcha'
];

class Reaptcha extends Component<Props, State> {
  container: ?HTMLDivElement = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      instanceId: null,
      ready: false,
      rendered: false,
      invisible: this.props.size === 'invisible',
      timer: null
    };
  }

  static defaultProps = {
    id: '',
    className: 'g-recaptcha',
    theme: 'light',
    size: 'normal',
    badge: 'bottomright',
    tabindex: 0,
    explicit: false,
    inject: true,
    isolated: false,
    hl: ''
  };

  _isAvailable = (): boolean =>
    Boolean(window && window.grecaptcha && window.grecaptcha.ready);

  _inject = (): void => {
    if (this.props.inject && !isAnyScriptPresent(RECAPTCHA_SCRIPTS_URLS)) {
      injectScript(
        `${USED_RECAPTCHA_SCRIPT_URL}?render=explicit&hl=${this.props.hl}`
      );
    }
  };

  _prepare = (): void => {
    const { explicit, onLoad } = this.props;
    window.grecaptcha.ready(() => {
      this.setState({ ready: true }, () => {
        if (!explicit) {
          this.renderExplicitly();
        }
        if (onLoad) {
          onLoad();
        }
      });
    });
  };

  _renderRecaptcha = (
    container: HTMLDivElement,
    config: RecaptchaConfig
  ): number => window.grecaptcha.render(container, config);

  _resetRecaptcha = (): void => window.grecaptcha.reset(this.state.instanceId);

  _executeRecaptcha = (): void =>
    window.grecaptcha.execute(this.state.instanceId);

  _stopTimer = (): void => {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  };

  componentDidMount = (): void => {
    this._inject();

    if (this._isAvailable()) {
      this._prepare();
    } else {
      const timer = setInterval(() => {
        if (this._isAvailable()) {
          this._prepare();
          this._stopTimer();
        }
      }, 500);
      this.setState({ timer });
    }
  };

  shouldComponentUpdate = (): boolean => !this.state.rendered;

  componentWillUnmount = (): void => {
    this._stopTimer();

    if (this.state.rendered) {
      this._resetRecaptcha();
    }
  };

  renderExplicitly = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.state.rendered) {
        return reject(
          new Error('This recaptcha instance has been already rendered.')
        );
      }
      if (this.state.ready && this.container) {
        const instanceId = this._renderRecaptcha(this.container, {
          sitekey: this.props.sitekey,
          theme: this.state.invisible ? null : this.props.theme,
          size: this.props.size,
          badge: this.state.invisible ? this.props.badge : null,
          tabindex: this.props.tabindex,
          callback: this.props.onVerify,
          'expired-callback': this.props.onExpire,
          'error-callback': this.props.onError,
          isolated: this.state.invisible ? this.props.isolated : null,
          hl: this.state.invisible ? null : this.props.hl
        });

        this.setState(
          {
            instanceId,
            rendered: true
          },
          () => {
            if (this.props.onRender) {
              this.props.onRender();
            }
            resolve();
          }
        );
      } else {
        return reject(new Error('Recaptcha is not ready for rendering yet.'));
      }
    });
  };

  reset = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.state.rendered) {
        this._resetRecaptcha();
        return resolve();
      }
      reject(new Error('This recaptcha instance did not render yet.'));
    });
  };

  execute = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.state.invisible) {
        return reject(
          new Error('Manual execution is only available for invisible size.')
        );
      }
      if (this.state.rendered) {
        this._executeRecaptcha();
        resolve();
      }
      return reject(new Error('This recaptcha instance did not render yet.'));
    });
  };

  render = () => {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={e => (this.container = e)}
      />
    );
  };
}

export default Reaptcha;
