import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import qs from 'query-string';

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

  renderRecaptcha() {
    if (this._isAvailable()) {
      const { siteKey, theme, size } = this.props;
      window.grecaptcha.render(this.container, {
        sitekey: siteKey,
        theme,
        size,
        callback: this.cb
      });
    }
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

  componentWillUnmount() {
    clearInterval(this.timer);

    Array.from(document.scripts)
      .filter(script => script.src.indexOf('recaptcha') > 0)
      .forEach(script => script.remove());
  }

  _renderScript() {
    const parameters = qs.stringify({
      render: this.props.explicit ? 'explicit' : 'onload'
    });
    return (
      <Helmet>
        <script
          src={`https://www.google.com/recaptcha/api.js?${parameters}`}
          async
          defer
        />
      </Helmet>
    );
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
        {this._renderScript()}
        {this.props.explicit
          ? this._renderExplicitContainer()
          : this._renderAutomaticContainer()}
      </Fragment>
    );
  }
}

export default Reaptcha;
