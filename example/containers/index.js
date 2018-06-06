import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { injectGlobal } from 'styled-components';

import Container from '../components/container';
import Section from '../components/section';
import Header from '../components/header';
import SubHeader from '../components/subheader';
import Button from '../components/button';
import Link from '../components/link';

import Home from '../routes/home';
import Automatic from '../routes/automatic';
import Explicit from '../routes/explicit';

injectGlobal`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => (
  <Router basename="/reaptcha">
    <Fragment>
      <Section blue>
        <Container page>
          <Container inline>
            <Header>Reaptcha</Header>
            <Route
              path="/(.+)"
              render={() => (
                <Link to="/">
                  <Button small white>
                    Back
                  </Button>
                </Link>
              )}
            />
          </Container>
          <SubHeader>reCAPTCHA for React.</SubHeader>
        </Container>
      </Section>
      <Section>
        <Container page>
          <Route exact path="/" component={Home} />
          <Route exact path="/automatic" component={Automatic} />
          <Route exact path="/explicit" component={Explicit} />
        </Container>
      </Section>
    </Fragment>
  </Router>
);

export default hot(module)(App);
