import React, { Component, Fragment } from 'react';

class Reaptcha extends Component {
  timer = null;
  container = null;

  _isAvailable() {
    return window && window.grecaptcha && window.grecaptcha.ready;
  }

  _prepare() {
    const { explicit, onLoad } = this.props;
    return window.grecaptcha.ready(() => {
      if (!explicit) {
        this.renderRecaptcha();
      }
      if (onLoad) {
        onLoad();
      }
    });
  }

  componentWillMount() {
    const script = document.createElement('script');

    script.async = true;
    script.defer = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;

    document.head.appendChild(script);
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    Array.from(document.scripts)
      .filter(script => script.src.indexOf('recaptcha') > 0)
      .forEach(script => script.remove());
  }

  componentDidMount() {
    if (this._isAvailable()) {
      this._prepare();
    } else {
      this.timer = setInterval(() => {
        if (this._isAvailable()) {
          this._prepare();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  renderRecaptcha() {
    if (this._isAvailable()) {
      const { siteKey, theme, size } = this.props;
      window.grecaptcha.render(this.container, {
        sitekey: siteKey,
        theme,
        size
      });
    }
  }

  render() {
    return <div className="g-recaptcha" ref={e => (this.container = e)} />;
  }
}

export default Reaptcha;
