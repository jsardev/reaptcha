import React, { Component, Fragment } from 'react';

const RECAPTCHA_CLASSNAME = 'g-recaptcha';

class Reaptcha extends Component {
  timer = null;
  container = null;

  _isAvailable() {
    return window && window.grecaptcha && window.grecaptcha.ready;
  }

  _prepare() {
    return window.grecaptcha.ready(() => this.props.onLoad());
  }

  componentWillMount() {
    const params = `?render=${this.props.explicit ? 'explicit' : 'onload'}`;
    const script = document.createElement('script');

    script.async = true;
    script.defer = true;
    script.src = `https://www.google.com/recaptcha/api.js${params}`;

    document.head.appendChild(script);
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    Array.from(document.scripts)
      .filter(script => script.src.indexOf('recaptcha') > 0)
      .forEach(script => script.remove());
  }

  componentDidMount() {
    if (this.props.explicit) {
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

  _renderAutomaticContainer() {
    return (
      <div
        className={RECAPTCHA_CLASSNAME}
        data-sitekey={this.props.siteKey}
        data-theme={this.props.theme}
        data-size={this.props.size}
      />
    );
  }

  _renderExplicitContainer() {
    return (
      <div className={RECAPTCHA_CLASSNAME} ref={e => (this.container = e)} />
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.explicit
          ? this._renderExplicitContainer()
          : this._renderAutomaticContainer()}
      </Fragment>
    );
  }
}

export default Reaptcha;
