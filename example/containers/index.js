import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled, { injectGlobal } from 'styled-components';

import Reaptcha from '../../index';

import Container from '../components/container';
import Section from '../components/section';
import Header from '../components/header';
import SubHeader from '../components/subheader';
import Button from '../components/button';
import Link from '../components/link';

injectGlobal`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

// const SITE_KEY = 'YOUR_SITE_KEY';
const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Section>
            <Container inline>
              <Header>Reaptcha</Header>
              <Route
                path="/(.+)"
                render={() => (
                  <Link to="/">
                    <Button small>Back</Button>
                  </Link>
                )}
              />
            </Container>
            <SubHeader>reCAPTCHA for React.</SubHeader>
          </Section>
          <Section>
            <Route
              exact
              path="/"
              render={() => (
                <Container inline>
                  <Link to="/automatic">
                    <Button>Automatic</Button>
                  </Link>
                  <Link to="/explicit">
                    <Button>Explicit</Button>
                  </Link>
                </Container>
              )}
            />
            <Route
              exact
              path="/automatic"
              render={() => <Reaptcha siteKey={SITE_KEY} />}
            />
            <Route
              exact
              path="/explicit"
              render={() => <Reaptcha siteKey={SITE_KEY} explicit />}
            />
          </Section>
        </Container>
      </Router>
    );
  }
}

export default hot(module)(App);
