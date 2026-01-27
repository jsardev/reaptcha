import { describe, it, expect, vi, beforeEach } from 'vitest';
import injectScript from './injectScript';
import { createMockDocumentHead } from '../test/dom';

describe('injectScript', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should inject script', () => {
    const scriptObj = {} as HTMLScriptElement;
    const appendChildSpy = vi.fn();

    vi.spyOn(document, 'createElement').mockReturnValue(scriptObj);
    vi.spyOn(document.head, 'appendChild').mockImplementation(appendChildSpy);

    injectScript('src');

    expect(scriptObj.async).toBe(true);
    expect(scriptObj.defer).toBe(true);
    expect(scriptObj.src).toBe('src');
    expect(appendChildSpy).toHaveBeenCalledWith(scriptObj);
  });

  it('should not throw when document head not present', () => {
    const createElementStub = vi.fn().mockReturnValue({});

    vi.spyOn(document, 'createElement').mockImplementation(createElementStub);
    vi.spyOn(document, 'head', 'get').mockReturnValue(
      createMockDocumentHead(null)
    );

    expect(() => injectScript('src')).not.toThrow();
  });
});
