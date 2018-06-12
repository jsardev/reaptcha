# Reaptcha

[![npm version](https://badge.fury.io/js/reaptcha.svg)](https://badge.fury.io/js/reaptcha)
[![TravisCI badge](https://travis-ci.org/sarneeh/reaptcha.svg?branch=master)](https://travis-ci.org/)
[![Greenkeeper badge](https://badges.greenkeeper.io/sarneeh/reaptcha.svg)](https://greenkeeper.io/)
[![GitHub license](https://img.shields.io/github/license/sarneeh/reaptcha.svg)](https://github.com/sarneeh/reaptcha)

[![NPM](https://nodei.co/npm/reaptcha.png)](https://nodei.co/npm/reaptcha/)

A simple React wrapper for [Google reCAPTCHA](https://developers.google.com/recaptcha/).

## Why another library?

I've been using other React wrappers for reCAPTCHA like [react-recaptcha](https://github.com/appleboy/react-recaptcha) or [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha) but unfortunately both of them provide a non-react way (declaring the callbacks outside React components, not inside them) to handle all the reCAPTCHA callbacks which didn't feel clean and I didn't like this approach personally.

This is why I've decided to give it a try to create a cleaner approach and this is the result.

What are the advantages?

- All callbacks in your React component
- Inject the reCAPTCHA script automatically (this is only available in `react-google-recaptcha`)

## Installation

Just install the package with `npm`:

`npm install --save reaptcha`

or with `yarn`:

`yarn add reaptcha`

## Usage

First of all, you'll need a reCAPTCHA API key. To find out how to get it - [check this guide](https://developers.google.com/recaptcha/intro).

### Default - Automatic render

By default Reaptcha injects the reCAPTCHA script into your `head` DOM element and renders a `I'm a robot` captcha.

Here's a quick example how can you use `Reaptcha` to verify your form submission:

```js
import React, { Component } from 'react';
import Reaptcha from 'reaptcha';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
  }

  onVerify = () => {
    this.setState({
      verified: true
    });
  };

  render() {
    return (
      <form>
        <Reaptcha sitekey="YOUR_API_KEY" onVerify={this.onVerify} />
        <button type="submit" disabled={!this.state.verified}>
          Submit
        </button>
      </form>
    );
  }
}
```

### Explicit render

In order to render `Reaptcha` explicitly, you need to pass the `explicit` prop, store the reference to the instance and call the `renderExplicitly` function manually.

**Caution!** In order to prevent race-conditions, make sure you render the reCAPTCHA after the script successfuly loads. To do that, pass a function the the `onLoad` prop where you'll get informed that everything is ready to render.

Here's an example:

```js
import React, { Fragment, Component } from 'react';
import Reaptcha from 'reaptcha';

class MyForm extends Component {
  constructor(props: Props) {
    super(props);
    this.captcha = null;
    this.state = {
      captchaReady: false
    };
  }

  onLoad = () => {
    this.setState({
      captchaReady: true
    });
  };

  onVerify = () => {
    // Do something
  };

  render() {
    return (
      <Fragment>
        <button
          onClick={() => {
            this.captcha.renderExplicitly();
          }}
          disabled={this.state.recaptchaReady}
        >
          Render reCAPTCHA
        </button>
        <Reaptcha
          ref={e => (this.captcha = e)}
          sitekey="YOUR_API_KEY"
          onLoad={this.onLoad}
          onVerify={this.onVerify}
          explicit
        />
      </Fragment>
    );
  }
}
```

### Invisible

When you want to have an invisible reCAPTCHA, you'll have to `execute` it manually (as user won't have any possibility to do it). This can be done similarly to explicit rendering - saving the reference to the `Reaptcha` instance and call the `execute` method on it.

Additionally, invisible reCAPTCHA can be of course also rendered automatically or explicitly - this is your choice and the reference how to do it is right above.

```js
import React, { Fragment, Component } from 'react';
import Reaptcha from 'reaptcha';

class MyForm extends Component {
  constructor(props: Props) {
    super(props);
    this.captcha = null;
  }

  onVerify = () => {
    // Do something
  };

  render() {
    return (
      <Fragment>
        <Reaptcha
          ref={e => (this.captcha = e)}
          sitekey="YOUR_API_KEY"
          onVerify={this.onVerify}
          size="invisible"
        />
        <button
          onClick={() => {
            this.captcha.execute();
          }}
        >
          Execute reCAPTCHA
        </button>
      </Fragment>
    );
  }
}
```

### Reset

You can also manually reset your reCAPTCHA instance. It's similar to executing it:

```js
<Fragment>
  <Reaptcha
    ref={e => (this.captcha = e)}
    sitekey="YOUR_API_KEY"
    onVerify={() => {
      // Do something
    }}
  />
  <button onClick={() => this.captcha.reset()}>Reset</button>
</Fragment>
```

### Instance methods

It's known that calling methods of a React component class is a really bad practice, but as we're doing something uncommon to typical React components - it's the only method that popped in that actually is intuitive and React-ish.

So to get access to the methods, just save the reference to the component instance:

```js
<Reaptcha ref={e => this.captcha = e} />
```

**If you have an idea how to do this better, feel free to file an issue to discuss it!**

Available and usable `Reaptcha` instance methods:

| Name             | Returns | Description                               |
| ---------------- | ------- | ----------------------------------------- |
| renderExplicitly | Promise | Renders the reCAPTCHA instance explicitly |
| reset            | Promise | Resets the reCAPTCHA instance             |
| execute          | Promise | Executes the reCAPTCHA instance           |

## Customisation

Reaptcha allows to customize your reCAPTCHA instances with any available properties documented in the reCAPTCHA docs for all of the types:

- [I'm a robot](https://developers.google.com/recaptcha/docs/display#render_param)
- [Invisible](https://developers.google.com/recaptcha/docs/invisible#render_param)

| Name      | Required | Type                                      | Default         | Description                                                                                    |
| --------- | -------- | ----------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| id        | no       | `string`                                  | -               | Id for the container element                                                                   |
| className | no       | `string`                                  | `g-recaptcha`   | Classname for the container element                                                            |
| sitekey   | yes      | `string`                                  | -               | Your reCAPTCHA API key                                                                         |
| theme     | no       | `'light' | 'dark'`                        | `'light'`       | reCAPTCHA color theme                                                                          |
| size      | no       | `'compact' | 'normal' | 'invisible'`      | `'normal'`      | reCAPTCHA size                                                                                 |
| badge     | no       | `'bottomright' | 'bottomleft' | 'inline'` | `'bottomright'` | Position of the reCAPTCHA badge                                                                |
| tabindex  | no       | `number`                                  | 0               | Tabindex of the challenge                                                                      |
| explicit  | no       | `boolean`                                 | false           | Allows to explicitly render reCAPTCHA                                                          |
| inject    | no       | `boolean`                                 | true            | Injecting the reCAPTCHA script into DOM                                                        |
| isolated  | no       | `boolean`                                 | false           | For plugin owners to not interfere with existing reCAPTCHA installations on a page             |
| onLoad    | no       | `Function`                                | -               | Callback function executed when the reCAPTCHA script sucessfully loads                         |
| onRender  | no       | `Function`                                | -               | Callback function executed when the reCAPTCHA successfuly renders                              |
| onVerify  | yes      | `Function`                                | -               | Callback function executed on user's captcha verification                                      |
| onExpire  | no       | `Function`                                | -               | Callback function executed when the reCAPTCHA response expires and the user needs to re-verify |
| onError   | no       | `Function`                                | -               | Callback function executed when reCAPTCHA fails with an error                                  |

### Caveats
There are props that are size-specific and some of the props are **not available** for all of the sizes. 

The size-exclusive props are:

*  I'm a robot: `theme`
*  Invisible: `badge`, `isolated`