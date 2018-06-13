/* @flow */

import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider, injectGlobal } from 'styled-components';

import { theme } from '../config';

import Container from '../components/container';
import Section from '../components/section';
import { H1 } from '../components/header';
import Button from '../components/button';
import Link from '../components/link';

import Options from '../modules/options';
import Example from '../modules/example';

injectGlobal`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

type State = {
  key: number,
  config: any
};

class App extends Component<{}, State> {
  state = {
    key: 0,
    config: {}
  };

  onChange = config => this.setState({ key: this.state.key + 1, config });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
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
              <Example key={this.state.key} config={this.state.config} />
            </Container>
          </Section>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
