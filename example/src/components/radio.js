/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import Container from './container';

const Radio = styled.input.attrs({
  type: 'radio'
})`
  margin: 0;

  + label {
    margin-left: 0.5rem;
  }
`;

type Props = {
  id: string,
  name: string,
  label: string,
  value: string
};

const RadioInput = ({ id, name, label, value }: Props) => (
  <Container inline>
    <Field
      name={name}
      render={({ field }) => (
        <Radio
          {...field}
          id={id}
          type="radio"
          value={value}
          checked={value === field.value}
        />
      )}
    />
    <label htmlFor={id}>{label}</label>
  </Container>
);

export default RadioInput;
