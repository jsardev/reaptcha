/* @flow */

import React, { Component } from 'react';
import type { Ref } from 'react';

declare var window: {
  grecaptcha: {
    ready: (callback: Function) => Promise<void>,
    render: (container: HTMLElement, config: mixed) => string,
    execute: (id: string) => void,
    reset: (id: string) => void
  }
};

type Props = {
  sitekey: string,
  theme?: 'light' | 'dark',
  size?: 'compact' | 'normal' | 'invisible',
  badge?: 'bottomright' | 'bottomleft' | 'inline',
  tabindex: number,
  explicit: boolean,
  onLoad?: Function,
  onVerify: Function,
  inject: boolean
};

class Reaptcha extends Component<Props> {
  id: ?string = null;
  timer: ?IntervalID = null;
  container: ?HTMLDivElement = null;
  rendered: boolean = false;
  injected: boolean = false;

  static defaultProps = {
    theme: 'light',
    size: 'normal',
    badge: 'bottomright',
    tabindex: 0,
    inject: false
  };

  _isAvailable(): boolean {
    return window && window.grecaptcha && Boolean(window.grecaptcha.ready);
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
      if (this._isAvailable() && this.container) {
        const { sitekey, theme, size, badge, tabindex, onVerify } = this.props;

        const isInvisible = size === 'invisible';

        this.id = window.grecaptcha.render(this.container, {
          sitekey,
          theme: isInvisible ? null : theme,
          size,
          badge: isInvisible ? badge : null,
          tabindex,
          callback: onVerify
        });

        this.rendered = true;

        resolve();
      } else if (this.rendered) {
        reject('This recaptcha instance has been already rendered.');
      }
      reject('Recaptcha is not ready for rendering yet.');
    });
  }

  resetRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rendered && this.id) {
        window.grecaptcha.reset(this.id);
      }
      reject('This recaptcha instance did not render yet.');
    });
  }

  executeRecaptcha(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rendered && this.id) {
        window.grecaptcha.execute(this.id);
      }
      reject('This recaptcha instance did not render yet.');
    });
  }

  render() {
    return <div className="g-recaptcha" ref={e => (this.container = e)} />;
  }
}

export default Reaptcha;
