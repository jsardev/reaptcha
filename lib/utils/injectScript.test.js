import test from 'ava';
import sinon from 'sinon';

import injectScript from './injectScript';

test.serial('should inject script', t => {
  const appendChildSpy = sinon.spy();
  global.document = {
    createElement: sinon
      .stub()
      .withArgs('script')
      .returns({}),
    head: {
      appendChild: appendChildSpy
    }
  };

  injectScript('src');

  t.true(
    appendChildSpy.calledOnceWith({
      async: true,
      defer: true,
      src: 'src'
    })
  );
});

test.serial('should not throw when document head not present', t => {
  global.document = {
    createElement: sinon
      .stub()
      .withArgs('script')
      .returns({}),
    head: null
  };

  t.notThrows(() => injectScript('src'));
});
