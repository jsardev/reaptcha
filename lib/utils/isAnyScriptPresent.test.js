import test from 'ava';

import isAnyScriptPresent from './isAnyScriptPresent';

global.document = {
  scripts: [
    { src: 'https://first.url?render=explicit' },
    { src: 'https://second.url?hl=en' },
    { src: 'https://third.url?hl=en' }
  ]
};

test('should return true', t => {
  t.true(isAnyScriptPresent(/https:\/\/second.url.*/));
});

test('should return false', t => {
  t.false(isAnyScriptPresent(/https:\/\/unknown.url.*/));
});
