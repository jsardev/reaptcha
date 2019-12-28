import * as React from 'react';

export type RenderProps = {
  renderExplicitly: () => Promise<void>;
  reset: () => Promise<void>;
  execute: () => Promise<void>;
  getResponse: () => Promise<string>;
  recaptchaComponent: React.ReactNode;
};

export interface ReaptchaProps {
  id?: string;
  className?: string;
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  badge?: 'bottomright' | 'bottomleft' | 'inline';
  tabindex?: number;
  explicit?: boolean;
  onLoad?: () => void;
  onRender?: () => void;
  onVerify: (response: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  inject?: boolean;
  isolated?: boolean;
  hl?: string;
  children?: (renderProps: RenderProps) => React.ReactNode;
}

export default class Reaptcha extends React.Component<ReaptchaProps> {
  public execute(): Promise<void>;

  public reset(): Promise<void>;

  public renderExplicitly(): Promise<void>;
  
  public getResponse(): Promise<string>;
}
