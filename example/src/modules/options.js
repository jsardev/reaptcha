/* @flow */

import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';

import { H2, H3 } from '../components/header';
import Container from '../components/container';
import Button from '../components/button';
import Radio from '../components/radio';

const initialConfig = {
  theme: 'light',
  size: 'normal',
  render: 'automatic'
};

type Props = {
  onChange: Function
};

const Options = (props: Props) => (
  <Formik
    onSubmit={values => props.onChange(values)}
    initialValues={initialConfig}
    render={() => (
      <Fragment>
        <H2 mb>Configuration</H2>
        <Form>
          <Container mb>
            <H3 mbs>Theme</H3>
            <Radio id="theme-1" name="theme" label="Light" value="light" />
            <Radio id="theme-2" name="theme" label="Dark" value="dark" />
          </Container>
          <Container mb>
            <H3 mbs>Size</H3>
            <Radio id="size-1" name="size" label="Normal" value="normal" />
            <Radio id="size-2" name="size" label="Compact" value="compact" />
            <Radio
              id="size-3"
              name="size"
              label="Invisible"
              value="invisible"
            />
          </Container>
          <Container mb>
            <H3 mbs>Render</H3>
            <Radio
              id="render-1"
              name="render"
              label="Automatic"
              value="automatic"
            />
            <Radio
              id="render-2"
              name="render"
              label="Explicit"
              value="explicit"
            />
          </Container>
          <Button type="submit">Apply</Button>
        </Form>
      </Fragment>
    )}
  />
);

export default Options;
