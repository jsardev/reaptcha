import test from 'ava';
import sinon from 'sinon';
import jsdom from 'jsdom-global';

import isAnyScriptPresent from './isAnyScriptPresent';

jsdom();

sinon
  .stub(document, 'scripts')
  .get(() => [
    { src: 'https://first.url?render=explicit' },
    { src: 'https://second.url?hl=en' },
    { src: 'https://third.url?hl=en' }
  ]);

test('should return true', t => {
  t.true(isAnyScriptPresent(/https:\/\/second.url.*/));
});

test('should return false', t => {
  t.false(isAnyScriptPresent(/https:\/\/unknown.url.*/));
});
