import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import qs from 'query-string';

class Reaptcha extends Component {
  constructor(props) {
    super(props);
    this.widget = null;
    this.timer = null;
  }

  isRecaptchaAvailable() {
    return window && window.grecaptcha && window.grecaptcha.ready;
  }

  renderRecaptcha() {
    const { siteKey } = this.props;
    window.grecaptcha.ready(() => {
      window.grecaptcha.render(this.widget, {
        sitekey: siteKey,
        size: 'compact'
      });
    });
  }

  componentDidMount() {
    if (this.props.explicit) {
      if (this.isRecaptchaAvailable()) {
        this.renderRecaptcha();
      } else {
        this.timer = setInterval(() => {
          if (this.isRecaptchaAvailable()) {
            this.renderRecaptcha();
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

  renderScript() {
    const parameters = qs.stringify({
      render: this.props.explicit ? 'explicit' : 'onload'
    });
    return (
      <Helmet>
        <script
          name="sth"
          src={`https://www.google.com/recaptcha/api.js?${parameters}`}
          async
          defer
        />
      </Helmet>
    );
  }

  renderAutomaticRecaptchaContainer() {
    return <div className="g-recaptcha" data-sitekey={this.props.siteKey} />;
  }

  renderExplicitRecaptchaContainer() {
    return <div className="g-recaptcha" ref={e => (this.widget = e)} />;
  }

  render() {
    return (
      <Fragment>
        {this.renderScript()}
        {this.props.explicit
          ? this.renderExplicitRecaptchaContainer()
          : this.renderAutomaticRecaptchaContainer()}
      </Fragment>
    );
  }
}

export default Reaptcha;
