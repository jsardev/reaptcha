import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled, { injectGlobal } from 'styled-components';

import Home from '../routes/home';
import Automatic from '../routes/automatic';
import Explicit from '../routes/explicit';

import Container from '../components/container';
import Section from '../components/section';
import Header from '../components/header';
import SubHeader from '../components/subheader';
import Button from '../components/button';

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
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/automatic"
              render={() => <Automatic siteKey={SITE_KEY} />}
            />
            <Route
              exact
              path="/explicit"
              render={() => <Explicit siteKey={SITE_KEY} />}
            />
          </Section>
        </Container>
      </Router>
    );
  }
}

export default hot(module)(App);
