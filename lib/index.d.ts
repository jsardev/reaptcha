import { Component, ReactNode } from 'react';
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: Function) => void;
      render: (container?: HTMLElement, config?: RecaptchaConfig) => number;
      execute: (id?: number) => void;
      reset: (id?: number) => void;
      getResponse: (id?: number) => string;
    };
  }
}
declare type RecaptchaBaseConfig = {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  badge?: 'bottomright' | 'bottomleft' | 'inline';
  tabindex?: number;
  hl?: string;
  isolated?: boolean;
};
export declare type RecaptchaConfig = RecaptchaBaseConfig & {
  callback?: Function;
  'expired-callback'?: Function;
  'error-callback'?: Function;
};
declare type RenderProps = {
  renderExplicitly: () => Promise<void>;
  reset: () => Promise<void>;
  execute: () => Promise<void>;
  getResponse: () => Promise<string>;
  recaptchaComponent: ReactNode;
};
declare type Props = RecaptchaBaseConfig & {
  id?: string;
  className?: string;
  explicit?: boolean;
  onLoad?: () => void;
  onRender?: () => void;
  onVerify: (response: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  inject?: boolean;
  children?: (renderProps: RenderProps) => Node;
};
declare type State = {
  instanceId?: number;
  ready: boolean;
  rendered: boolean;
  invisible: boolean;
  timer?: number;
};
declare class Reaptcha extends Component<Props, State> {
  container?: HTMLDivElement | null;
  constructor(props: Props);
  static defaultProps: {
    id: string;
    className: string;
    theme: string;
    size: string;
    badge: string;
    tabindex: number;
    explicit: boolean;
    inject: boolean;
    isolated: boolean;
    hl: string;
  };
  _isAvailable: () => boolean;
  _inject: () => void;
  _prepare: () => void;
  _renderRecaptcha: (
    container: HTMLDivElement,
    config: RecaptchaConfig
  ) => number;
  _resetRecaptcha: () => void;
  _executeRecaptcha: () => void;
  _getResponseRecaptcha: () => string;
  _stopTimer: () => void;
  componentDidMount: () => void;
  shouldComponentUpdate: (nextProps: Props) => boolean;
  componentWillUnmount: () => void;
  renderExplicitly: () => Promise<void>;
  reset: () => Promise<void>;
  execute: () => Promise<void>;
  getResponse: () => Promise<string>;
  render: () => Node | JSX.Element;
}
export default Reaptcha;
