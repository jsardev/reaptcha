export default (regex: RegExp): boolean =>
  Array.from(document.scripts).reduce<boolean>(
    (isPresent, script) => (isPresent ? isPresent : regex.test(script.src)),
    false
  );
