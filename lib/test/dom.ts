export function createMockScript(src: string) {
  return Object.assign(document.createElement('script'), { src });
}

export function createMockScriptCollection(
  scripts: HTMLScriptElement[]
): HTMLCollectionOf<HTMLScriptElement> {
  const collection = {
    length: scripts.length,
    item: (index: number) => scripts[index] ?? null,
    namedItem: () => null,
    [Symbol.iterator]: function*() {
      yield* scripts;
    }
  } as HTMLCollectionOf<HTMLScriptElement>;

  scripts.forEach((script, i) => {
    Object.defineProperty(collection, i.toString(), {
      value: script,
      writable: false,
      configurable: true
    });
  });

  return collection;
}

export function createMockDocumentHead(
  head: HTMLHeadElement | null
): HTMLHeadElement {
  return head as HTMLHeadElement;
}
