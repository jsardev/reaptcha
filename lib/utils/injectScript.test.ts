/* eslint-disable no-global-assign */

import test from 'ava';
import sinon from 'sinon';
import jsdom from 'jsdom-global';

import injectScript from './injectScript';

jsdom();

test.serial('should inject script', t => {
  const scriptObj = {} as HTMLScriptElement;

  const appendChildSpy = sinon.spy();
  const createElementStub = sinon
    .stub()
    .withArgs('script')
    .returns(scriptObj);

  sinon.stub(document, 'createElement').get(() => createElementStub);
  sinon.stub(document.head, 'appendChild').get(() => appendChildSpy);

  injectScript('src');

  t.true(scriptObj.async);
  t.true(scriptObj.async);
  t.is(scriptObj.src, 'src');
  t.true(appendChildSpy.calledOnceWith(scriptObj));
});

test.serial('should not throw when document head not present', t => {
  const createElementStub = sinon
    .stub()
    .withArgs('script')
    .returns({});

  sinon.stub(document, 'createElement').get(() => createElementStub);
  sinon.stub(document, 'head').get(() => null);

  t.notThrows(() => injectScript('src'));
});
