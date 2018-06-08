/* @flow */

import React, { Component } from 'react';

declare var window: {
  grecaptcha: {
    ready: (callback: Function) => Promise<void>,
    render: (container: HTMLElement, config: mixed) => string,
    execute: (id: string) => void,
    reset: (id: string) => void
  }
};

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
  onVerify: Function,
  inject?: boolean,
  isolated: boolean
};

class Reaptcha extends Component<Props> {
  id: ?string = null;
  timer: ?IntervalID = null;
  container: ?HTMLDivElement = null;
  rendered: boolean = false;
  injected: boolean = false;

  static defaultProps = {
    id: '',
    className: '',
    theme: 'light',
    size: 'normal',
    badge: 'bottomright',
    tabindex: 0,
    explicit: false,
    inject: false,
    isolated: false
  };

  _isAvailable(): boolean {
    return Boolean(window && window.grecaptcha && window.grecaptcha.ready);
  }

  _isInvisible(): boolean {
    return this.props.size === 'invisible';
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

  UNSAFE_componentWillMount(): void {
    if (this.props.inject) {
      const script = document.createElement('script');

      script.async = true;
      script.defer = true;
      script.src = 'https://google.com/recaptcha/api.js?render=explicit';

      if (document.head) {
        document.head.appendChild(script);
        this.injected = true;
      }
    }
  }

  componentWillUnmount(): void {
    this._stopTimer();

    if (this.injected) {
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

  shouldComponentUpdate(): boolean {
    return !this.rendered;
  }

  renderRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rendered) {
        return reject('This recaptcha instance has been already rendered.');
      }
      if (this._isAvailable() && this.container) {
        const isInvisible = this._isInvisible();

        this.id = window.grecaptcha.render(this.container, {
          sitekey: this.props.sitekey,
          theme: isInvisible ? null : this.props.theme,
          size: this.props.size,
          badge: isInvisible ? this.props.badge : null,
          tabindex: this.props.tabindex,
          callback: this.props.onVerify,
          isolated: isInvisible ? this.props.isolated : null
        });

        this.rendered = true;

        return resolve();
      } else {
        return reject('Recaptcha is not ready for rendering yet.');
      }
    });
  }

  resetRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rendered && this.id) {
        window.grecaptcha.reset(this.id);
        return resolve();
      }
      reject('This recaptcha instance did not render yet.');
    });
  }

  executeRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._isInvisible()) {
        return reject('Manual execution is only available for invisible size.');
      }
      if (this.rendered && this.id) {
        window.grecaptcha.execute(this.id);
        return resolve();
      }
      return reject('This recaptcha instance did not render yet.');
    });
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        ref={e => (this.container = e)}
      />
    );
  }
}

export default Reaptcha;
