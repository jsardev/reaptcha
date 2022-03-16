/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import jsdom from 'jsdom-global';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Reaptcha, { Grecaptcha, Props } from './index';

jsdom();

Enzyme.configure({ adapter: new Adapter() });

const renderSpy = sinon.spy();
const executeSpy = sinon.spy();
const resetSpy = sinon.spy();
const getResponseStub = sinon.stub().returns('stubbed-response');

const defaultProps = {
  sitekey: 'some-key',
  onVerify: () => {}
};

const stubGrecaptcha = (mockedProps: Partial<Grecaptcha>) => {
  window.grecaptcha = {
    ...(window.grecaptcha as Grecaptcha),
    ...mockedProps
  };
};

test.beforeEach(() => {
  Array.from(document.scripts).forEach(script => script.remove());

  window.grecaptcha = {
    ready: callback => callback(),
    render: renderSpy,
    reset: resetSpy,
    execute: executeSpy,
    getResponse: getResponseStub
  };

  renderSpy.resetHistory();
  executeSpy.resetHistory();
  resetSpy.resetHistory();
  getResponseStub.resetHistory();
});

test('should pass id', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} id="some-id" />);

  t.true(
    wrapper
      .find('#some-id')
      .hostNodes()
      .exists()
  );
});

test('should pass className', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(
    <Reaptcha {...defaultProps} className="class-1" />
  );

  t.true(
    wrapper
      .find('.class-1')
      .hostNodes()
      .exists()
  );
});

test('should have default className', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  t.true(
    wrapper
      .find('.g-recaptcha')
      .hostNodes()
      .exists()
  );
});

test('should execute render prop if passed', t => {
  t.plan(2);

  const childrenSpy = sinon.spy(({ recaptchaComponent }) => recaptchaComponent);

  mount<Reaptcha>(<Reaptcha {...defaultProps}>{childrenSpy}</Reaptcha>);

  t.true(childrenSpy.called);
  t.true(
    childrenSpy.alwaysCalledWith(
      sinon.match({
        renderExplicitly: sinon.match.func,
        reset: sinon.match.func,
        execute: sinon.match.func,
        recaptchaComponent: sinon.match.defined
      })
    )
  );
});

test('should render recaptcha', t => {
  t.plan(2);

  const onVerify = sinon.stub();
  const onExpire = sinon.stub();
  const onError = sinon.stub();

  mount<Reaptcha>(
    <Reaptcha
      sitekey="my-key"
      theme="dark"
      size="normal"
      tabindex={2}
      onVerify={onVerify}
      onExpire={onExpire}
      onError={onError}
    />
  );

  t.true(renderSpy.calledOnce);
  t.true(
    renderSpy.calledWith(sinon.match.any, {
      sitekey: 'my-key',
      theme: 'dark',
      size: 'normal',
      badge: undefined,
      tabindex: 2,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      isolated: undefined,
      hl: ''
    })
  );
});

test('should render recaptcha on delayed grecaptcha load', t => {
  t.plan(1);
  const clock = sinon.useFakeTimers();

  window.grecaptcha = undefined;
  setTimeout(() => {
    window.grecaptcha = {
      ready: callback => callback(),
      render: renderSpy,
      reset: resetSpy,
      execute: executeSpy,
      getResponse: () => ''
    };
  }, 500);

  mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  clock.tick(500);

  t.true(renderSpy.calledOnce);

  clock.restore();
});

test('should render invisible recaptcha', t => {
  t.plan(2);

  const onVerify = sinon.stub();
  const onExpire = sinon.stub();
  const onError = sinon.stub();

  mount<Reaptcha>(
    <Reaptcha
      sitekey="my-key"
      badge="bottomleft"
      size="invisible"
      tabindex={3}
      onVerify={onVerify}
      onExpire={onExpire}
      onError={onError}
      explicit={false}
      isolated
    />
  );

  t.true(renderSpy.calledOnce);
  t.true(
    renderSpy.calledWith(sinon.match.any, {
      sitekey: 'my-key',
      theme: 'light',
      size: 'invisible',
      badge: 'bottomleft',
      tabindex: 3,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      isolated: true,
      hl: undefined
    })
  );
});

test('should render invisible recaptcha in dark mode', t => {
  t.plan(2);

  const onVerify = sinon.stub();
  const onExpire = sinon.stub();
  const onError = sinon.stub();

  mount<Reaptcha>(
    <Reaptcha
      sitekey="my-key"
      badge="bottomleft"
      size="invisible"
      theme="dark"
      tabindex={3}
      onVerify={onVerify}
      onExpire={onExpire}
      onError={onError}
      explicit={false}
      isolated
    />
  );

  t.true(renderSpy.calledOnce);
  t.true(
    renderSpy.calledWith(sinon.match.any, {
      sitekey: 'my-key',
      theme: 'dark',
      size: 'invisible',
      badge: 'bottomleft',
      tabindex: 3,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      isolated: true,
      hl: undefined
    })
  );
});

test('should render recaptcha with hl', t => {
  t.plan(1);

  mount<Reaptcha>(<Reaptcha {...defaultProps} hl="fr" />);

  t.true(
    renderSpy.calledWith(
      sinon.match.any,
      sinon.match({
        hl: 'fr'
      })
    )
  );
});

test('should render recaptcha explicitly', t => {
  t.plan(2);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} explicit />);

  t.false(renderSpy.calledOnce);

  return wrapper
    .instance()
    .renderExplicitly()
    .then(() => {
      t.true(renderSpy.calledOnce);
    });
});

test('should not render recaptcha when grecaptcha not available', t => {
  t.plan(1);
  const clock = sinon.useFakeTimers();
  window.grecaptcha = undefined;

  mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  clock.tick(1000);

  t.false(renderSpy.calledOnce);

  clock.restore();
});

test('should reset recaptcha', t => {
  t.plan(2);

  stubGrecaptcha({ render: sinon.stub().returns('reset-test-id') });

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  return wrapper
    .instance()
    .reset()
    .then(() => {
      t.true(resetSpy.calledOnce);
      t.true(resetSpy.calledWith('reset-test-id'));
    });
});

test('should execute recaptcha', t => {
  t.plan(2);

  stubGrecaptcha({ render: sinon.stub().returns('execute-test-id') });
  const wrapper = mount<Reaptcha>(
    <Reaptcha {...defaultProps} size="invisible" />
  );

  return wrapper
    .instance()
    .execute()
    .then(() => {
      t.true(executeSpy.calledOnce);
      t.true(executeSpy.calledWith('execute-test-id'));
    });
});

test('should getResponse from recaptcha', t => {
  t.plan(3);

  stubGrecaptcha({ render: sinon.stub().returns('get-response-test-id') });
  const wrapper = mount<Reaptcha>(
    <Reaptcha {...defaultProps} size="invisible" />
  );

  return wrapper
    .instance()
    .getResponse()
    .then(response => {
      t.true('stubbed-response' === response);
      t.true(getResponseStub.calledOnce);
      t.true(getResponseStub.calledWith('get-response-test-id'));
    });
});

test('should inject script', t => {
  t.plan(4);

  mount<Reaptcha>(<Reaptcha {...defaultProps} />);
  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.true(script.async);
  t.true(script.defer);
  t.truthy(script.src);
});

test('should not inject script', t => {
  t.plan(1);

  mount<Reaptcha>(<Reaptcha {...defaultProps} inject={false} />);

  t.is(document.scripts.length, 0);
});

[
  'https://google.com/recaptcha',
  'https://www.google.com/recaptcha',
  'https://recaptcha.net/recaptcha',
  'https://www.recaptcha.net/recaptcha',
  'https://gstatic.com/recaptcha',
  'https://www.gstatic.com/recaptcha'
].forEach(src => {
  test(`should not inject script if one with src ${src} already present`, t => {
    t.plan(1);

    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);

    mount<Reaptcha>(<Reaptcha {...defaultProps} />);

    t.is(document.scripts.length, 1);
  });
});

test('should inject script with hl parameter if specified', t => {
  t.plan(3);

  mount<Reaptcha>(<Reaptcha {...defaultProps} hl="en" />);

  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.truthy(script.src);
  t.regex(script.src, new RegExp('hl=en'));
});

test('should inject script without hl parameter if not specified', t => {
  t.plan(3);

  mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.truthy(script.src);
  t.notRegex(script.src, new RegExp('hl='));
});

test('should inject only one script on multiple instances', t => {
  t.plan(1);

  mount<Reaptcha>(
    <div>
      <Reaptcha {...defaultProps} />
      <Reaptcha {...defaultProps} />
      <Reaptcha {...defaultProps} />
    </div>
  );

  t.is(document.scripts.length, 1);
});

test('should reset recaptcha on unmount', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} />);

  wrapper.unmount();

  t.true(resetSpy.calledOnce);
});

test('should call onLoad', t => {
  t.plan(1);

  const onLoadSpy = sinon.spy();
  mount<Reaptcha>(<Reaptcha {...defaultProps} onLoad={onLoadSpy} />);

  t.true(onLoadSpy.calledOnce);
});

test('should call onRender', t => {
  t.plan(1);

  const onRender = sinon.spy();
  mount<Reaptcha>(<Reaptcha {...defaultProps} onRender={onRender} />);

  t.true(onRender.calledOnce);
});

test('should throw error on double render', t => {
  t.plan(2);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} explicit />);
  const instance = wrapper.instance();

  return instance.renderExplicitly().then(() => {
    t.true(renderSpy.calledOnce);
    return t.throwsAsync(
      instance.renderExplicitly(),
      undefined,
      'This recaptcha instance has been already rendered.'
    );
  });
});

test('should throw error when no grecaptcha available on render', t => {
  t.plan(1);

  stubGrecaptcha({
    ready: () => {}
  });
  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} explicit />);

  return t.throwsAsync(
    wrapper.instance().renderExplicitly(),
    undefined,
    'Recaptcha is not ready for rendering yet.'
  );
});

test('should throw error when recaptcha not rendered on reset', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} explicit />);

  return t.throwsAsync(
    wrapper.instance().reset(),
    undefined,
    'This recaptcha instance did not render yet.'
  );
});

test('should throw error when trying to execute while not in invisible mode', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} size="normal" />);

  return t.throwsAsync(
    wrapper.instance().execute(),
    undefined,
    'Manual execution is only available for invisible size.'
  );
});

test('should throw error when trying to execute while not rendered', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(
    <Reaptcha {...defaultProps} size="invisible" explicit />
  );

  return t.throwsAsync(
    wrapper.instance().execute(),
    undefined,
    'This recaptcha instance did not render yet.'
  );
});

test('should throw error when trying to getResponse while not rendered', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(
    <Reaptcha {...defaultProps} size="invisible" explicit />
  );

  return t.throwsAsync(
    wrapper.instance().getResponse(),
    undefined,
    'This recaptcha instance did not render yet.'
  );
});

test('should not throw error on unmount when not rendered', t => {
  t.plan(1);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} explicit />);

  t.notThrows(() => wrapper.unmount());
});

test('should derive invisible state from size prop', t => {
  t.plan(2);

  const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} size="normal" />);

  t.is(wrapper.state('invisible'), false);

  wrapper.setProps({ size: 'invisible' });

  t.is(wrapper.state('invisible'), true);
});

const propsThatShouldRerenderRecaptcha: Array<Partial<Props>> = [
  { sitekey: 'new-sitekey' },
  { theme: 'dark' },
  { size: 'invisible' },
  { badge: 'bottomleft' },
  { tabindex: 100 },
  { hl: 'ja' },
  { isolated: true }
];

propsThatShouldRerenderRecaptcha.forEach(props => {
  test(`should rerender recaptcha when changing ${
    Object.keys(props)[0]
  } prop`, t => {
    t.plan(1);

    const wrapper = mount<Reaptcha>(<Reaptcha {...defaultProps} />);

    const recaptchaElement = wrapper.find('div');
    const recaptchaElementKey = recaptchaElement.key();

    return new Promise(resolve => {
      wrapper.setState({ rendered: true }, () => {
        wrapper.setProps(props as Pick<Props, keyof Props>, () => {
          /**
           * We're doing a setState() in componentDidUpdate
           * and Enzyme probably doesn't wait for this to process.
           * This is the cleanest workaround I found.
           */
          setTimeout(() => {
            wrapper.update();
            const newRecaptchaElement = wrapper.find('div');
            const newRecaptchaElementKey = newRecaptchaElement.key();

            t.not(recaptchaElementKey, newRecaptchaElementKey);

            resolve();
          }, 0);
        });
      });
    });
  });
});
