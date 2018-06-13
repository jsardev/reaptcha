/* @flow */

import React, { Component } from 'react';

declare var window: {
  grecaptcha: {
    ready: (callback: Function) => Promise<void>,
    render: (
      container: ?HTMLElement,
      config: {
        sitekey: string,
        theme: ?string,
        size: ?string,
        badge: ?string,
        tabindex: ?number,
        callback: ?Function,
        'expired-callback': ?Function,
        'error-callback': ?Function,
        isolated: ?boolean
      }
    ) => number,
    execute: (id: ?number) => void,
    reset: (id: ?number) => void
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
  onRender?: Function,
  onVerify: Function,
  onExpire?: Function,
  onError?: Function,
  inject?: boolean,
  isolated?: boolean
};

class Reaptcha extends Component<Props> {
  id: ?number = null;
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
    inject: true,
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
        this.renderExplicitly();
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

  renderExplicitly(): Promise<void> {
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
          'expired-callback': this.props.onExpire,
          'error-callback': this.props.onError,
          isolated: isInvisible ? this.props.isolated : null
        });

        this.rendered = true;

        if (this.props.onRender) {
          this.props.onRender();
        }

        return resolve();
      } else {
        return reject('Recaptcha is not ready for rendering yet.');
      }
    });
  }

  reset(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rendered && this.id !== null) {
        window.grecaptcha.reset(this.id);
        return resolve();
      }
      reject('This recaptcha instance did not render yet.');
    });
  }

  execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._isInvisible()) {
        return reject('Manual execution is only available for invisible size.');
      }
      if (this.rendered && this.id !== null) {
        window.grecaptcha.execute(this.id);
        resolve();
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
