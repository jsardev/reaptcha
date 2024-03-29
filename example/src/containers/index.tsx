import React, { Component, Fragment } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { theme } from '../config';

import Container from '../components/container';
import Section from '../components/section';
import { H1 } from '../components/header';
import Button from '../components/button';
import Link from '../components/link';

import Options from '../modules/options';
import Example, { Config } from '../modules/example';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

type State = {
  config: Config;
};

class App extends Component<Record<string, never>, State> {
  state: State = {
    config: {
      size: 'normal',
      theme: 'light',
      render: 'automatic'
    }
  };

  onChange = (configChange: Partial<Config>) =>
    this.setState(state => ({
      config: {
        ...state.config,
        ...configChange
      }
    }));

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Section blue>
            <Container page>
              <Container between mb>
                <H1>Reaptcha</H1>
                <Button small white>
                  <Link href="https://github.com/sarneeh/reaptcha">
                    Documentation
                  </Link>
                </Button>
              </Container>
              <div>reCAPTCHA for React.</div>
            </Container>
          </Section>
          <Section>
            <Container page>
              <Options onChange={this.onChange} />
            </Container>
          </Section>
          <Section gray>
            <Container page>
              <Example config={this.state.config} />
            </Container>
          </Section>
          <Section>
            <Container page>
              Created by{' '}
              <Link black href="https://github.com/sarneeh">
                Jakub Sarnowski
              </Link>
              .
            </Container>
          </Section>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
