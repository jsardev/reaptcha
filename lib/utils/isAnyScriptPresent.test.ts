import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import isAnyScriptPresent from './isAnyScriptPresent';
import { createMockScript, createMockScriptCollection } from '../test/dom';

describe('isAnyScriptPresent', () => {
  beforeAll(() => {
    vi.spyOn(document, 'scripts', 'get').mockReturnValue(
      createMockScriptCollection([
        createMockScript('https://first.url?render=explicit'),
        createMockScript('https://second.url?hl=en'),
        createMockScript('https://third.url?hl=en')
      ])
    );
  });

  it('should return true', () => {
    expect(isAnyScriptPresent(/https:\/\/second.url.*/)).toBe(true);
  });

  it('should return false', () => {
    expect(isAnyScriptPresent(/https:\/\/unknown.url.*/)).toBe(false);
  });
});
