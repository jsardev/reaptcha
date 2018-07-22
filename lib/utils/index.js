/* @flow */

const getFilteredScripts = (scriptSrc: string): Array<HTMLScriptElement> =>
  Array.from(document.scripts).filter(
    script => script.src.indexOf(scriptSrc) > -1
  );

const isScriptPresent = (scriptSrc: string): boolean =>
  getFilteredScripts(scriptSrc).length > 0;

export const isAnyScriptPresent = (scripts: Array<string>): boolean =>
  scripts.reduce(
    (isPresent, url) => (isPresent ? isPresent : isScriptPresent(url)),
    false
  );

export const injectScript = (scriptSrc: string): void => {
  const script = document.createElement('script');

  script.async = true;
  script.defer = true;
  script.src = scriptSrc;

  if (document.head) {
    document.head.appendChild(script);
  }
};
