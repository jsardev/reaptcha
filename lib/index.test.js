import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import jsdom from 'jsdom-global';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jsdom();

Enzyme.configure({ adapter: new Adapter() });

import Reaptcha from './index';

const renderSpy = sinon.spy();
const executeSpy = sinon.spy();
const resetSpy = sinon.spy();

const defaultProps = {
  sitekey: 'some-key',
  onVerify: () => {}
};

test.beforeEach(() => {
  Array.from(document.scripts).forEach(script => script.remove());

  window.grecaptcha = {
    ready: callback => callback(),
    render: renderSpy,
    reset: resetSpy,
    execute: executeSpy
  };

  renderSpy.resetHistory();
  executeSpy.resetHistory();
  resetSpy.resetHistory();
});

test.serial('should pass id', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} id="some-id" />);

  t.true(
    wrapper
      .find('#some-id')
      .hostNodes()
      .exists()
  );
});

test.serial('should pass className', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} className="class-1" />);

  t.true(
    wrapper
      .find('.class-1')
      .hostNodes()
      .exists()
  );
});

test.serial('should have default className', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} />);

  t.true(
    wrapper
      .find('.g-recaptcha')
      .hostNodes()
      .exists()
  );
});

test.serial('should render recaptcha', t => {
  t.plan(2);

  const onVerify = sinon.stub();
  const onExpire = sinon.stub();
  const onError = sinon.stub();

  mount(
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
      badge: null,
      tabindex: 2,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      isolated: null,
      hl: ''
    })
  );
});

test.serial('should render recaptcha on delayed grecaptcha load', t => {
  t.plan(1);
  const clock = sinon.useFakeTimers();

  window.grecaptcha = null;
  setTimeout(() => {
    window.grecaptcha = {
      ready: callback => callback(),
      render: renderSpy,
      reset: resetSpy,
      execute: executeSpy
    };
  }, 500);

  mount(<Reaptcha {...defaultProps} />);

  clock.tick(500);

  t.true(renderSpy.calledOnce);

  clock.restore();
});

test.serial('should render invisible recaptcha', t => {
  t.plan(2);

  const onVerify = sinon.stub();
  const onExpire = sinon.stub();
  const onError = sinon.stub();

  mount(
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
      theme: null,
      size: 'invisible',
      badge: 'bottomleft',
      tabindex: 3,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      isolated: true,
      hl: null
    })
  );
});

test.serial('should render recaptcha with hl', t => {
  t.plan(1);

  mount(<Reaptcha {...defaultProps} hl="fr" />);

  t.true(
    renderSpy.calledWith(
      sinon.match.any,
      sinon.match({
        hl: 'fr'
      })
    )
  );
});

test.serial('should render recaptcha explicitly', t => {
  t.plan(2);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit />);

  t.false(renderSpy.calledOnce);

  return wrapper
    .instance()
    .renderExplicitly()
    .then(() => {
      t.true(renderSpy.calledOnce);
    });
});

test.serial('should not render recaptcha when grecaptcha not available', t => {
  t.plan(1);
  const clock = sinon.useFakeTimers();
  window.grecaptcha = null;

  mount(<Reaptcha {...defaultProps} />);

  clock.tick(1000);

  t.false(renderSpy.calledOnce);

  clock.restore();
});

test.serial('should reset recaptcha', t => {
  t.plan(2);

  window.grecaptcha.render = sinon.stub().returns('reset-test-id');
  const wrapper = mount(<Reaptcha {...defaultProps} />);

  return wrapper
    .instance()
    .reset()
    .then(() => {
      t.true(resetSpy.calledOnce);
      t.true(resetSpy.calledWith('reset-test-id'));
    });
});

test.serial('should execute recaptcha', t => {
  t.plan(2);

  window.grecaptcha.render = sinon.stub().returns('execute-test-id');
  const wrapper = mount(<Reaptcha {...defaultProps} size="invisible" />);

  return wrapper
    .instance()
    .execute()
    .then(() => {
      t.true(executeSpy.calledOnce);
      t.true(executeSpy.calledWith('execute-test-id'));
    });
});

test.serial('should inject script', t => {
  t.plan(4);

  mount(<Reaptcha {...defaultProps} />);
  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.true(script.async);
  t.true(script.defer);
  t.truthy(script.src);
});

test.serial('should not inject script', t => {
  t.plan(1);

  mount(<Reaptcha {...defaultProps} inject={false} />);

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
  test.serial(
    `should not inject script if one with src ${src} already present`,
    t => {
      t.plan(1);

      const script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);

      mount(<Reaptcha {...defaultProps} />);

      t.is(document.scripts.length, 1);
    }
  );
});

test.serial('should inject script with hl parameter if specified', t => {
  t.plan(3);

  mount(<Reaptcha {...defaultProps} hl="en" />);

  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.truthy(script.src);
  t.regex(script.src, new RegExp('hl=en'));
});

test.serial('should inject script without hl parameter if not specified', t => {
  t.plan(3);

  mount(<Reaptcha {...defaultProps} />);

  t.is(document.scripts.length, 1);
  const script = document.scripts[0];
  t.truthy(script.src);
  t.notRegex(script.src, new RegExp('hl='));
});

test.serial('should inject only one script on multiple instances', t => {
  t.plan(1);

  mount(
    <div>
      <Reaptcha {...defaultProps} />
      <Reaptcha {...defaultProps} />
      <Reaptcha {...defaultProps} />
    </div>
  );

  t.is(document.scripts.length, 1);
});

test.serial('should reset recaptcha on unmount', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} />);

  wrapper.unmount();

  t.true(resetSpy.calledOnce);
});

test.serial('should call onLoad', t => {
  t.plan(1);

  const onLoadSpy = sinon.spy();
  mount(<Reaptcha {...defaultProps} onLoad={onLoadSpy} />);

  t.true(onLoadSpy.calledOnce);
});

test.serial('should call onRender', t => {
  t.plan(1);

  const onRender = sinon.spy();
  mount(<Reaptcha {...defaultProps} onRender={onRender} />);

  t.true(onRender.calledOnce);
});

test.serial('should throw error on double render', t => {
  t.plan(2);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit />);
  const instance = wrapper.instance();

  return instance.renderExplicitly().then(() => {
    t.true(renderSpy.calledOnce);
    return t.throwsAsync(
      instance.renderExplicitly(),
      'This recaptcha instance has been already rendered.'
    );
  });
});

test.serial('should throw error when no grecaptcha available on render', t => {
  t.plan(1);

  window.grecaptcha.ready = () => {};
  const wrapper = mount(<Reaptcha {...defaultProps} explicit />);

  return t.throwsAsync(
    wrapper.instance().renderExplicitly(),
    'Recaptcha is not ready for rendering yet.'
  );
});

test.serial('should throw error when recaptcha not rendered on reset', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit />);

  return t.throwsAsync(
    wrapper.instance().reset(),
    'This recaptcha instance did not render yet.'
  );
});

test.serial(
  'should throw error when trying to execute while not in invisible mode',
  t => {
    t.plan(1);

    const wrapper = mount(<Reaptcha {...defaultProps} size="normal" />);

    return t.throwsAsync(
      wrapper.instance().execute(),
      'Manual execution is only available for invisible size.'
    );
  }
);

test.serial(
  'should throw error when trying to execute while not rendered',
  t => {
    t.plan(1);

    const wrapper = mount(
      <Reaptcha {...defaultProps} size="invisible" explicit />
    );

    return t.throwsAsync(
      wrapper.instance().execute(),
      'This recaptcha instance did not render yet.'
    );
  }
);

test.serial('should not throw error on unmount when not rendered', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit />);

  t.notThrows(() => wrapper.unmount());
});
