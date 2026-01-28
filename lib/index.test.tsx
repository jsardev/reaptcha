/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import { test, describe, vi, beforeEach, expect, it } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';

import Reaptcha, { Props } from './index';

describe('reaptcha', () => {
  const renderSpy = vi.fn();
  const executeSpy = vi.fn();
  const resetSpy = vi.fn();
  const getResponseStub = vi.fn();

  const defaultProps = {
    sitekey: 'some-key',
    onVerify: () => {}
  };

  beforeEach(() => {
    vi.resetAllMocks();

    Array.from(document.scripts).forEach(script => script.remove());

    window.grecaptcha = {
      ready: callback => callback(),
      render: renderSpy,
      reset: resetSpy,
      execute: executeSpy,
      getResponse: getResponseStub
    };
  });

  it('should pass id', () => {
    const { container } = render(<Reaptcha {...defaultProps} id="some-id" />);
    const wrapper = container.querySelector('#some-id');

    expect(wrapper).toBeTruthy();
  });

  it('should pass className', () => {
    const { container } = render(
      <Reaptcha {...defaultProps} className="class-1" />
    );

    expect(container.getElementsByClassName('class-1')).toHaveLength(1);
  });

  it('should have default className', () => {
    const { container } = render(<Reaptcha {...defaultProps} />);

    expect(container.getElementsByClassName('g-recaptcha')).toHaveLength(1);
  });

  it('should execute render prop if passed', () => {
    const childrenSpy = vi
      .fn()
      .mockImplementation(({ recaptchaComponent }) => recaptchaComponent);

    render(<Reaptcha {...defaultProps}>{childrenSpy}</Reaptcha>);

    expect(childrenSpy).toHaveBeenCalled();
    expect(childrenSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        renderExplicitly: expect.any(Function),
        reset: expect.any(Function),
        execute: expect.any(Function),
        recaptchaComponent: expect.any(Object)
      })
    );
  });

  it('should render recaptcha', () => {
    const ref = React.createRef<Reaptcha>();

    render(
      <Reaptcha
        {...defaultProps}
        ref={ref}
        sitekey="my-key"
        theme="dark"
        size="normal"
        tabindex={2}
      />
    );

    expect(renderSpy).toBeCalledTimes(1);
    expect(renderSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        sitekey: 'my-key',
        theme: 'dark',
        size: 'normal',
        badge: undefined,
        tabindex: 2,
        callback: ref.current!._onVerify,
        'expired-callback': ref.current!._onExpire,
        'error-callback': ref.current!._onError,
        isolated: undefined,
        hl: ''
      })
    );
  });

  it('should render recaptcha on delayed grecaptcha load', () => {
    vi.useFakeTimers();

    window.grecaptcha = undefined;
    setTimeout(() => {
      window.grecaptcha = {
        ready: callback => callback(),
        render: renderSpy,
        reset: resetSpy,
        execute: executeSpy,
        getResponse: () => ''
      };
    }, 500);

    render(<Reaptcha {...defaultProps} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(renderSpy).toBeCalledTimes(1);

    vi.useRealTimers();
  });

  it('should render invisible recaptcha', () => {
    const ref = React.createRef<Reaptcha>();

    render(
      <Reaptcha
        {...defaultProps}
        ref={ref}
        sitekey="my-key"
        badge="bottomleft"
        size="invisible"
        tabindex={3}
        explicit={false}
        isolated
      />
    );

    expect(renderSpy).toBeCalledTimes(1);
    expect(renderSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        sitekey: 'my-key',
        theme: 'light',
        size: 'invisible',
        badge: 'bottomleft',
        tabindex: 3,
        callback: ref.current!._onVerify,
        'expired-callback': ref.current!._onExpire,
        'error-callback': ref.current!._onError,
        isolated: true,
        hl: undefined
      })
    );
  });

  it('should render invisible recaptcha in dark mode', () => {
    const ref = React.createRef<Reaptcha>();

    render(
      <Reaptcha
        {...defaultProps}
        ref={ref}
        sitekey="my-key"
        badge="bottomleft"
        size="invisible"
        theme="dark"
        tabindex={3}
        explicit={false}
        isolated
      />
    );

    expect(renderSpy).toBeCalledTimes(1);
    expect(renderSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        sitekey: 'my-key',
        theme: 'dark',
        size: 'invisible',
        badge: 'bottomleft',
        tabindex: 3,
        callback: ref.current!._onVerify,
        'expired-callback': ref.current!._onExpire,
        'error-callback': ref.current!._onError,
        isolated: true,
        hl: undefined
      })
    );
  });

  it('should render recaptcha with hl', () => {
    render(<Reaptcha {...defaultProps} hl="fr" />);

    expect(renderSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        hl: 'fr'
      })
    );
  });

  it('should render recaptcha explicitly', async () => {
    const ref = React.createRef<Reaptcha>();

    render(<Reaptcha {...defaultProps} ref={ref} explicit />);

    expect(renderSpy).not.toBeCalled();

    waitFor(() => ref.current!.renderExplicitly());

    expect(renderSpy).toBeCalledTimes(1);
  });

  it('should not render recaptcha when grecaptcha not available', () => {
    vi.useFakeTimers();
    window.grecaptcha = undefined;

    render(<Reaptcha {...defaultProps} />);

    vi.advanceTimersByTime(1000);

    expect(renderSpy).not.toBeCalled();

    vi.useRealTimers();
  });

  it('should reset recaptcha', async t => {
    const ref = React.createRef<Reaptcha>();
    renderSpy.mockReturnValue('reset-test-id');

    render(<Reaptcha {...defaultProps} ref={ref} />);

    await ref.current!.reset();
    expect(resetSpy).toBeCalled();
    expect(resetSpy).toBeCalledWith('reset-test-id');
  });

  it('should execute recaptcha', async t => {
    const ref = React.createRef<Reaptcha>();
    renderSpy.mockReturnValue('execute-test-id');

    render(<Reaptcha {...defaultProps} ref={ref} size="invisible" />);

    await ref.current!.execute();
    expect(executeSpy).toBeCalled();
    expect(executeSpy).toBeCalledWith('execute-test-id');
  });

  it('should getResponse from recaptcha', async t => {
    const ref = React.createRef<Reaptcha>();
    renderSpy.mockReturnValue('get-response-test-id');
    getResponseStub.mockReturnValue('stubbed-response');

    render(<Reaptcha {...defaultProps} ref={ref} size="invisible" />);

    const response = await ref.current!.getResponse();
    expect(response).toEqual('stubbed-response');
    expect(getResponseStub).toBeCalled();
    expect(getResponseStub).toBeCalledWith('get-response-test-id');
  });

  it('should inject script', () => {
    render(<Reaptcha {...defaultProps} />);

    expect(document.scripts).toHaveLength(1);

    const script = document.scripts[0];
    expect(script.async).toBe(true);
    expect(script.defer).toBe(true);
    expect(script.src).toBeTruthy();
  });

  it('should not inject script', () => {
    render(<Reaptcha {...defaultProps} inject={false} />);

    expect(document.scripts).toHaveLength(0);
  });

  [
    'https://google.com/recaptcha',
    'https://www.google.com/recaptcha',
    'https://recaptcha.net/recaptcha',
    'https://www.recaptcha.net/recaptcha',
    'https://gstatic.com/recaptcha',
    'https://www.gstatic.com/recaptcha'
  ].forEach(src => {
    it(`should not inject script if one with src ${src} already present`, () => {
      const script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);

      render(<Reaptcha {...defaultProps} />);

      expect(document.scripts).toHaveLength(1);
    });
  });

  it('should inject script with hl parameter if specified', () => {
    render(<Reaptcha {...defaultProps} hl="en" />);

    expect(document.scripts).toHaveLength(1);
    const script = document.scripts[0];
    expect(script.src).toBeTruthy();
    expect(script.src).toMatch(new RegExp('hl=en'));
  });

  it('should inject script without hl parameter if not specified', () => {
    render(<Reaptcha {...defaultProps} />);

    expect(document.scripts).toHaveLength(1);
    const script = document.scripts[0];
    expect(script.src).toBeTruthy();
    expect(script.src).not.toMatch(new RegExp('hl='));
  });

  it('should inject only one script on multiple instances', () => {
    render(
      <div>
        <Reaptcha {...defaultProps} />
        <Reaptcha {...defaultProps} />
        <Reaptcha {...defaultProps} />
      </div>
    );

    expect(document.scripts).toHaveLength(1);
  });

  it('should call onLoad', () => {
    const onLoadSpy = vi.fn();
    render(<Reaptcha {...defaultProps} onLoad={onLoadSpy} />);

    expect(onLoadSpy).toBeCalledTimes(1);
  });

  it('should call onRender', () => {
    const onRender = vi.fn();
    render(<Reaptcha {...defaultProps} onRender={onRender} />);

    expect(onRender).toBeCalledTimes(1);
  });

  it('should call onVerify', () => {
    const ref = React.createRef<Reaptcha>();
    const onVerify = vi.fn();
    render(<Reaptcha {...defaultProps} ref={ref} onVerify={onVerify} />);

    ref.current!._onVerify('response');

    expect(onVerify).toBeCalledTimes(1);
    expect(onVerify).toBeCalledWith('response');
  });

  it('should call onExpire', () => {
    const ref = React.createRef<Reaptcha>();
    const onExpire = vi.fn();
    render(<Reaptcha {...defaultProps} ref={ref} onExpire={onExpire} />);

    ref.current!._onExpire();

    expect(onExpire).toBeCalledTimes(1);
  });

  it('should call onError', () => {
    const ref = React.createRef<Reaptcha>();
    const onError = vi.fn();
    render(<Reaptcha {...defaultProps} ref={ref} onError={onError} />);

    ref.current!._onError();

    expect(onError).toBeCalledTimes(1);
  });

  it('should throw error on double render', async t => {
    const ref = React.createRef<Reaptcha>();
    render(<Reaptcha {...defaultProps} ref={ref} explicit />);

    await ref.current!.renderExplicitly();
    expect(renderSpy).toBeCalledTimes(1);
    return expect(() => ref.current!.renderExplicitly()).rejects.toThrowError(
      'This recaptcha instance has been already rendered.'
    );
  });

  it('should throw error when no grecaptcha available on render', () => {
    const ref = React.createRef<Reaptcha>();
    window.grecaptcha = undefined;
    render(<Reaptcha {...defaultProps} ref={ref} explicit />);

    return expect(() => ref.current!.renderExplicitly()).rejects.toThrowError(
      'Recaptcha is not ready for rendering yet.'
    );
  });

  it('should throw error when recaptcha not rendered on reset', () => {
    const ref = React.createRef<Reaptcha>();
    render(<Reaptcha {...defaultProps} ref={ref} explicit />);

    return expect(() => ref.current!.reset()).rejects.toThrowError(
      'This recaptcha instance did not render yet.'
    );
  });

  it('should throw error when trying to execute while not in invisible mode', () => {
    const ref = React.createRef<Reaptcha>();
    render(<Reaptcha {...defaultProps} ref={ref} size="normal" />);

    return expect(() => ref.current!.execute()).rejects.toThrowError(
      'Manual execution is only available for invisible size.'
    );
  });

  it('should throw error when trying to execute while not rendered', () => {
    const ref = React.createRef<Reaptcha>();
    render(<Reaptcha {...defaultProps} ref={ref} size="invisible" explicit />);

    return expect(() => ref.current!.execute()).rejects.toThrowError(
      'This recaptcha instance did not render yet.'
    );
  });

  it('should throw error when trying to getResponse while not rendered', () => {
    const ref = React.createRef<Reaptcha>();
    render(<Reaptcha {...defaultProps} ref={ref} size="invisible" explicit />);

    return expect(() => ref.current!.getResponse()).rejects.toThrowError(
      'This recaptcha instance did not render yet.'
    );
  });

  it('should not throw error on unmount when not rendered', () => {
    const component = render(<Reaptcha {...defaultProps} explicit />);

    expect(() => component.unmount()).not.toThrowError();
  });

  it('should derive invisible state from size prop', () => {
    const ref = React.createRef<Reaptcha>();
    const { rerender } = render(
      <Reaptcha {...defaultProps} ref={ref} size="normal" />
    );

    expect(ref.current?.state.invisible).toBe(false);
    rerender(<Reaptcha {...defaultProps} ref={ref} size="invisible" />);
    expect(ref.current?.state.invisible).toBe(true);
  });

  const propsThatShouldRerenderRecaptcha: Array<Partial<Props>> = [
    { sitekey: 'new-sitekey' },
    { theme: 'dark' },
    { size: 'invisible' },
    { badge: 'bottomleft' },
    { tabindex: 100 },
    { hl: 'ja' },
    { isolated: true }
  ];

  propsThatShouldRerenderRecaptcha.forEach(props => {
    it(`should rerender recaptcha when changing ${
      Object.keys(props)[0]
    } prop`, () => {
      const { rerender } = render(<Reaptcha {...defaultProps} />);

      rerender(<Reaptcha {...defaultProps} {...props} />);

      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });

  propsThatShouldRerenderRecaptcha.forEach(props => {
    it(`should not rerender recaptcha when changing ${
      Object.keys(props)[0]
    } prop on explicit render`, () => {
      const { rerender } = render(<Reaptcha {...defaultProps} explicit />);

      rerender(<Reaptcha {...defaultProps} {...props} explicit />);

      expect(renderSpy).toHaveBeenCalledTimes(0);
    });
  });
});
