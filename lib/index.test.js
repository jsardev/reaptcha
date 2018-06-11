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

test('should pass id', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} id="some-id" />);

  t.true(
    wrapper
      .find('#some-id')
      .hostNodes()
      .exists()
  );
});

test('should pass className', t => {
  t.plan(1);

  const wrapper = mount(<Reaptcha {...defaultProps} className="class-1" />);

  t.true(
    wrapper
      .find('.class-1')
      .hostNodes()
      .exists()
  );
});

test('should render recaptcha', t => {
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
      explicit={false}
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
      isolated: null
    })
  );
});

test('should render invisible recaptcha', t => {
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
      isolated={true}
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
      isolated: true
    })
  );
});

test.serial('should render recaptcha explicitly', t => {
  t.plan(2);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit={true} />);

  t.false(renderSpy.calledOnce);

  return wrapper
    .instance()
    .renderRecaptcha()
    .then(() => {
      t.true(renderSpy.calledOnce);
    });
});

test.serial('should reset recaptcha', t => {
  t.plan(2);

  window.grecaptcha.render = sinon.stub().returns('reset-test-id');
  const wrapper = mount(<Reaptcha {...defaultProps} />);

  return wrapper
    .instance()
    .resetRecaptcha()
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
    .executeRecaptcha()
    .then(() => {
      t.true(executeSpy.calledOnce);
      t.true(executeSpy.calledWith('execute-test-id'));
    });
});

test.serial('should inject script', t => {
  t.plan(4);

  mount(<Reaptcha {...defaultProps} inject={true} />);

  t.is(document.scripts.length, 1);
  const script = document.scripts[0];

  t.truthy(script.src);
  t.true(script.async);
  t.true(script.defer);

  Array.from(document.scripts).forEach(script => script.remove());
});

test.serial('should clear scripts on unmount', t => {
  t.plan(2);

  const wrapper = mount(<Reaptcha {...defaultProps} inject={true} />);

  t.is(document.scripts.length, 1);
  wrapper.unmount();
  t.is(document.scripts.length, 0);
});

test.serial('should not inject script', t => {
  t.plan(1);

  mount(<Reaptcha {...defaultProps} inject={false} />);

  t.is(document.scripts.length, 0);
});

test('should call onLoad', t => {
  t.plan(1);

  const onLoadSpy = sinon.spy();
  mount(<Reaptcha {...defaultProps} onLoad={onLoadSpy} />);

  t.true(onLoadSpy.calledOnce);
});

test('should call onRender', t => {
  t.plan(1);

  const onRender = sinon.spy();
  mount(<Reaptcha {...defaultProps} onRender={onRender} />);

  t.true(onRender.calledOnce);
});

test.serial('should throw error on double render', t => {
  t.plan(3);

  const wrapper = mount(<Reaptcha {...defaultProps} explicit={true} />);
  const instance = wrapper.instance();

  return instance.renderRecaptcha().then(() => {
    t.true(renderSpy.calledOnce);
    return t.throws(instance.renderRecaptcha()).then(message => {
      t.is(message, 'This recaptcha instance has been already rendered.');
    });
  });
});

test.serial('should throw error when no grecaptcha available on render', t => {
  t.plan(2);

  window.grecaptcha = null;
  const wrapper = mount(<Reaptcha {...defaultProps} explicit={true} />);

  return t.throws(wrapper.instance().renderRecaptcha()).then(message => {
    t.is(message, 'Recaptcha is not ready for rendering yet.');
  });
});

test.serial(
  'should throw error when trying to execute while not in invisible mode',
  t => {
    t.plan(2);

    const wrapper = mount(<Reaptcha {...defaultProps} size="normal" />);

    return t.throws(wrapper.instance().executeRecaptcha()).then(message => {
      t.is(message, 'Manual execution is only available for invisible size.');
    });
  }
);
