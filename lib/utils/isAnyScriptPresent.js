/* @flow */

const getFilteredScripts = (scriptSrc: string): Array<HTMLScriptElement> =>
  Array.from(document.scripts).filter(
    script => script.src.indexOf(scriptSrc) > -1
  );

const isScriptPresent = (scriptSrc: string): boolean =>
  getFilteredScripts(scriptSrc).length > 0;

export default (scripts: Array<string>): boolean =>
  scripts.reduce(
    (isPresent, url) => (isPresent ? isPresent : isScriptPresent(url)),
    false
  );
