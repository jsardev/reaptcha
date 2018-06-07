/* @flow */

import React, { Component } from 'react';

type Props = {
  sitekey: string,
  theme?: 'light' | 'dark',
  size?: 'compact' | 'normal' | 'invisible',
  badge?: 'bottomright' | 'bottomleft' | 'inline',
  tabindex: number,
  explicit?: boolean,
  onLoad?: Function,
  onVerify: Function,
  inject: boolean
};

type State = {
  rendered: boolean
};

class Reaptcha extends Component<Props, State> {
  static defaultProps = {
    theme: 'light',
    size: 'normal',
    badge: 'bottomright',
    tabindex: 0,
    inject: false
  };

  state = {
    rendered: false,
    injected: false
  };

  timer = null;
  container = null;

  _isAvailable(): boolean {
    return window && window.grecaptcha && window.grecaptcha.ready;
  }

  _prepare(): void {
    const { explicit, onLoad } = this.props;
    window.grecaptcha.ready(() => {
      if (!explicit) {
        this.renderRecaptcha();
      }
      if (onLoad) {
        onLoad();
      }
    });
  }

  _stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillMount(): void {
    if (this.props.inject) {
      const script = document.createElement('script');

      script.async = true;
      script.defer = true;
      script.src = 'https://google.com/recaptcha/api.js?render=explicit';

      document.head && document.head.appendChild(script);
    }
  }

  componentWillUnmount(): void {
    this._stopTimer();

    if (this.state.injected) {
      Array.from(document.scripts)
        .filter(script => script.src.indexOf('recaptcha') > 0)
        .forEach(script => script.remove());
    }
  }

  componentDidMount(): void {
    if (this._isAvailable()) {
      this._prepare();
    } else {
      this.timer = setInterval(() => {
        if (this._isAvailable()) {
          this._prepare();
          this._stopTimer();
        }
      }, 500);
    }
  }

  renderRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._isAvailable()) {
        const { sitekey, theme, size, badge, tabindex, onVerify } = this.props;

        const isInvisible = size === 'invisible';

        window.grecaptcha.render(this.container, {
          sitekey,
          theme: isInvisible ? null : theme,
          size,
          badge: isInvisible ? badge : null,
          tabindex,
          callback: onVerify
        });

        this.setState({ rendered: true });

        resolve();
      } else if (this.state.rendered) {
        reject('This recaptcha instance has been already rendered.');
      } else {
        reject('Recaptcha is not ready for rendering yet.');
      }
    });
  }

  render() {
    return <div className="g-recaptcha" ref={e => (this.container = e)} />;
  }
}

export default Reaptcha;
