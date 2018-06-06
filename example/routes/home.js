import React, { Component, Fragment } from 'react';
import { Formik, Form } from 'formik';
import qs from 'query-string';

import SubHeader from '../components/subheader';
import Container from '../components/container';
import Button from '../components/button';
import Radio from '../components/radio';
import Link from '../components/link';
import { FormGroup } from '../components/form';

const initialConfig = {
  theme: 'light',
  size: 'normal'
};

export default () => (
  <Formik
    onSubmit={() => {}}
    initialValues={initialConfig}
    render={({ values }) => (
      <Fragment>
        <Container>
          <Form>
            <FormGroup>
              <SubHeader>Theme</SubHeader>
              <Radio id="theme-1" name="theme" label="Light" value="light" />
              <Radio id="theme-2" name="theme" label="Dark" value="dark" />
            </FormGroup>
            <FormGroup>
              <SubHeader>Size</SubHeader>
              <Radio id="size-1" name="size" label="Normal" value="normal" />
              <Radio id="size-2" name="size" label="Compact" value="compact" />
            </FormGroup>
          </Form>
        </Container>
        <Container inline>
          <Link to={`/automatic?${qs.stringify(values)}`}>
            <Button>Automatic</Button>
          </Link>
          <Link to={`/explicit?${qs.stringify(values)}`}>
            <Button>Explicit</Button>
          </Link>
        </Container>
      </Fragment>
    )}
  />
);
