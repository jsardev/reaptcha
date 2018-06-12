import styled, { css } from 'styled-components';

const initialState = css`
  cursor: default;
  background-color: ${props => (props.white ? 'white' : props.theme.blue)};
  box-shadow: 0 3px 0 0
    ${props => (props.white ? 'lightgray' : props.theme.darkblue)};
`;

export default styled.button`
  ${initialState}

  padding: ${props => (props.small ? '.5rem' : '1rem')};
  outline: none;
  border: none;
  border-radius: 4px;
  color: ${props => (props.white ? 'black' : 'white')};
  font-size: ${props => (props.small ? '.5rem' : '1rem')};

  &:disabled { 
    opacity: .5;

    &:hover {
      ${initialState}
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${props =>
      props.white ? 'lightgray' : props.theme.darkblue};
    box-shadow: 0 3px 0 0 ${props =>
      props.white ? 'darkgray' : props.theme.darkestblue};
  }
`;
