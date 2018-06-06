import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import Container from './container';

const RadioInput = styled.input.attrs({
  type: 'radio'
})`
  margin: 0;

  + label {
    margin-left: 0.5rem;
  }
`;

export default ({ id, name, label, value }) => (
  <Container inline>
    <Field
      name={name}
      render={({ field }) => (
        <RadioInput
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
