/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import Container from './container';

const InputLabel = styled.label`
  + input {
    margin-left: 0.5rem;
  }
`;

const Input = styled(Field)`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.darkwhite};

  &:focus {
    outline: none;
  }
`;

type Props = {
  id: string,
  name: string,
  label: string,
  placeholder: string
};

const TextInput = ({ id, name, label, placeholder }: Props) => (
  <Container inline>
    <InputLabel htmlFor={id}>{label}:</InputLabel>
    <Input
      id={id}
      type="text"
      name={name}
      placeholder={placeholder}
      autoComplete="off"
    />
  </Container>
);

export default TextInput;
