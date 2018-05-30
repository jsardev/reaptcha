import React, { Component, Fragment } from 'react';
import Container from '../components/container';
import Button from '../components/button';
import Link from '../components/link';

class Home extends Component {
  render() {
    return (
      <Container inline>
        <Link to="/automatic">
          <Button>Automatic</Button>
        </Link>
        <Link to="/explicit">
          <Button>Explicit</Button>
        </Link>
      </Container>
    );
  }
}

export default Home;
