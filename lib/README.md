![Reaptcha](https://i.imgur.com/44zEjD5.png)

[![Latest npm version](https://img.shields.io/npm/v/reaptcha/latest.svg)]()
[![GitHub license](https://img.shields.io/github/license/sarneeh/reaptcha.svg)](https://github.com/sarneeh/reaptcha)
[![TravisCI badge](https://travis-ci.com/sarneeh/reaptcha.svg?branch=master)](https://travis-ci.com/)
[![Coverage Status](https://coveralls.io/repos/github/sarneeh/reaptcha/badge.svg?branch=master)](https://coveralls.io/github/sarneeh/reaptcha?branch=master)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Minified package size](https://img.shields.io/bundlephobia/min/reaptcha.svg)]()
[![Minified gzipped package size](https://img.shields.io/bundlephobia/minzip/reaptcha.svg)]()

A clean, modern and simple React wrapper for [Google reCAPTCHA](https://developers.google.com/recaptcha/).

## Demo

https://sarneeh.github.io/reaptcha/

## Motivation

I've been using other React wrappers for reCAPTCHA like [react-recaptcha](https://github.com/appleboy/react-recaptcha) or [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha) but unfortunately both of them provide a non-react way (declaring the callbacks outside React components, not inside them) to handle all the reCAPTCHA callbacks which didn't feel clean and I didn't like this approach personally.

This is why I've decided to give it a try to create a cleaner approach and this is the result.

## Features

- **All callbacks in your React component**
- 100% test coverage
- Automatic reCAPTCHA script injection and cleanup
- Usable with multiple reCAPTCHA instances
- Full control over every reCAPTCHA instance
- reCAPTCHA instance methods with promises and clean error messages
- SSR ready

## Installation

Just install the package with `npm`:

```
npm install --save reaptcha
```

or with `yarn`:

```
yarn add reaptcha
```

## Usage

**IMPORTANT NOTE: `Reaptcha` injects reCAPTCHA script into DOM automatically by default. If you are doing it manually, [check out this description](#attaching-recaptcha-script-manually).**

First of all, you'll need a reCAPTCHA API key. To find out how to get it - [check this guide](https://developers.google.com/recaptcha/intro).

To see how `Reaptcha` actually works, visit the [example page](https://sarneeh.github.io/reaptcha).

If you'd also like to see the code for the example, it is right [here](https://github.com/sarneeh/reaptcha/tree/master/example/src).

### Default - Automatic render

By default `Reaptcha` injects the reCAPTCHA script into your `head` DOM element and renders a `I'm a robot` captcha.

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

  onVerify = recaptchaResponse => {
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

  onVerify = recaptchaResponse => {
    // Do something
  };

  render() {
    return (
      <Fragment>
        <Reaptcha
          ref={e => (this.captcha = e)}
          sitekey="YOUR_API_KEY"
          onLoad={this.onLoad}
          onVerify={this.onVerify}
          explicit
        />
        <button
          onClick={() => {
            this.captcha.renderExplicitly();
          }}
          disabled={this.state.recaptchaReady}
        >
          Render reCAPTCHA
        </button>
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

  onVerify = recaptchaResponse => {
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
    onVerify={recaptchaResponse => {
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
<Reaptcha ref={e => (this.captcha = e)} />
```

**If you have an idea how to do this better, feel free to file an issue to discuss it!**

Available and usable `Reaptcha` instance methods:

| Name             | Returns           | Description                               |
| ---------------- | ----------------- | ----------------------------------------- |
| renderExplicitly | `Promise<void>`   | Renders the reCAPTCHA instance explicitly |
| reset            | `Promise<void>`   | Resets the reCAPTCHA instance             |
| execute          | `Promise<void>`   | Executes the reCAPTCHA instance           |
| getResponse      | `Promise<string>` | Returns the reCATPCHA response            |

### Render prop

Using instance methods can be avoided by passing `children` render function.

```js
<Reaptcha>
  {({ renderExplicitly, reset, execute, recaptchaComponent }) => {
    return (
      <div>
        {recaptchaComponent}

        <button onClick={reset}>Reset</button>
      </div>
    );
  }}
</Reaptcha>
```

When passing `children` render prop, you are responsible for rendering `recaptchaComponent` into the DOM.

## Customisation

`Reaptcha` allows to customize your reCAPTCHA instances with any available properties documented in the reCAPTCHA docs for all of the types:

- [I'm a robot](https://developers.google.com/recaptcha/docs/display#render_param)
- [Invisible](https://developers.google.com/recaptcha/docs/invisible#render_param)

| Name      | Required           | Type                                        | Default         | Description                                                                                                                                                      |
| --------- | ------------------ | ------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | :heavy_minus_sign: | `string`                                    | -               | Id for the container element                                                                                                                                     |
| className | :heavy_minus_sign: | `string`                                    | `'g-recaptcha'` | Classname for the container element                                                                                                                              |
| sitekey   | :heavy_plus_sign:  | `string`                                    | -               | Your reCAPTCHA API key                                                                                                                                           |
| theme     | :heavy_minus_sign: | `'light' \| 'dark'`                         | `'light'`       | reCAPTCHA color theme                                                                                                                                            |
| size      | :heavy_minus_sign: | `'compact' \| 'normal' \| 'invisible'`      | `'normal'`      | reCAPTCHA size                                                                                                                                                   |
| badge     | :heavy_minus_sign: | `'bottomright' \| 'bottomleft' \| 'inline'` | `'bottomright'` | Position of the reCAPTCHA badge                                                                                                                                  |
| tabindex  | :heavy_minus_sign: | `number`                                    | 0               | Tabindex of the challenge                                                                                                                                        |
| explicit  | :heavy_minus_sign: | `boolean`                                   | false           | Allows to explicitly render reCAPTCHA                                                                                                                            |
| inject    | :heavy_minus_sign: | `boolean`                                   | true            | Handle reCAPTCHA script DOM injection automatically                                                                                                              |
| isolated  | :heavy_minus_sign: | `boolean`                                   | false           | For plugin owners to not interfere with existing reCAPTCHA installations on a page                                                                               |
| hl        | :heavy_minus_sign: | `string`                                    | -               | [Language code](https://developers.google.com/recaptcha/docs/language) for reCAPTCHA                                                                             |  |
| onLoad    | :heavy_minus_sign: | `Function`                                  | -               | Callback function executed when the reCAPTCHA script sucessfully loads                                                                                           |
| onRender  | :heavy_minus_sign: | `Function`                                  | -               | Callback function executed when the reCAPTCHA successfuly renders                                                                                                |
| onVerify  | :heavy_plus_sign:  | `Function`                                  | -               | Callback function executed on user's captcha verification. It's being called with the [user response token](https://developers.google.com/recaptcha/docs/verify) |
| onExpire  | :heavy_minus_sign: | `Function`                                  | -               | Callback function executed when the reCAPTCHA response expires and the user needs to re-verify                                                                   |
| onError   | :heavy_minus_sign: | `Function`                                  | -               | Callback function executed when reCAPTCHA fails with an error                                                                                                    |
| children  | :heavy_minus_sign: | `Function`                                  | -               | Render function that can be used to get access to instance methods without the need to explicitly use refs                                                       |

## Caveats

### Array.from

This library is using `Array.from` which is [not supported by few browsers](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/from) i.e. Internet Explorer or Opera. If you want to use `reaptcha` and keep supporting these browsers, you need to use a polyfill for it.

### Size-specific props

There are props that are size-specific and some of the props are **not available** for all of the sizes. Although if you will pass these props nothing bad will happen, they will just be ignored.

The size-exclusive props are:

- I'm a robot: `theme`
- Invisible: `badge`, `isolated`

### Attaching reCAPTCHA script manually

If you want to attach the reCAPTCHA script manually to the DOM, simply pass the `inject` prop as `false`, like this:

`<Reaptcha {...props} inject={false} />`

This way `Reaptcha` won't inject the scripts by itself and won't break because of multiple reCAPTCHA scripts attached.
