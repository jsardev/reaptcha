/* @flow */

declare var window: {
  grecaptcha: {
    ready: (callback: Function) => Promise<void>,
    render: (container: ?HTMLElement, config: RecaptchaConfig) => number,
    execute: (id: ?number) => void,
    reset: (id: ?number) => void,
    getResponse: (id: ?number) => string
  }
};

export type RecaptchaConfig = {
  sitekey: string,
  theme: ?string,
  size: ?string,
  badge: ?string,
  tabindex: ?number,
  callback: ?Function,
  'expired-callback': ?Function,
  'error-callback': ?Function,
  isolated: ?boolean,
  hl: ?string
};
