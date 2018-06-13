import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { ThemeProvider, injectGlobal } from 'styled-components';

import Container from '../components/container';
import Section from '../components/section';
import { H1, H2 } from '../components/header';
import Button from '../components/button';
import Link, { NavLink } from '../components/link';

import Home from '../routes/home';
import Automatic from '../routes/automatic';
import Explicit from '../routes/explicit';

injectGlobal`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const theme = {
  blue: '#4683F3',
  darkblue: '#3060D1',
  darkestblue: '#2F5AC9'
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Router basename="/reaptcha/">
      <Fragment>
        <Section blue>
          <Container page>
            <Container between>
              <Container inline>
                <H1>Reaptcha</H1>
                <Route
                  path="/(.+)"
                  render={() => (
                    <NavLink to="/">
                      <Button small white>
                        Back
                      </Button>
                    </NavLink>
                  )}
                />
              </Container>
              <div>
                <Link href="https://github.com/sarneeh/reaptcha">Docs</Link>
              </div>
            </Container>
            <div>reCAPTCHA for React.</div>
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
  </ThemeProvider>
);

export default hot(module)(App);
