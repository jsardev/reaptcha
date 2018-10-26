/* @flow */

export default (scriptSrc: string): void => {
  const script = document.createElement('script');

  script.async = true;
  script.defer = true;
  script.src = scriptSrc;

  if (document.head) {
    document.head.appendChild(script);
  }
};
