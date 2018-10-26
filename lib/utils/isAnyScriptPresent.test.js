import test from 'ava';

import isAnyScriptPresent from './isAnyScriptPresent';

global.document = {
  scripts: [
    { src: 'https://some.url?render=explicit' },
    { src: 'https://another.url?hl=en' }
  ]
};

test('should return true', t => {
  t.true(isAnyScriptPresent(['https://unknown.url', 'https://another.url']));
});

test('should return false', t => {
  t.false(isAnyScriptPresent(['https://unknown.url']));
});
