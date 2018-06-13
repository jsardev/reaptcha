import styled from 'styled-components';

export default styled.div`
  margin: 0.5rem 0;
  padding: 1rem 0;
  width: 100%;
  background-color: ${props => (props.blue ? props.theme.blue : 'none')};
  color: ${props => (props.blue ? props.theme.white : 'inherit')};

  &:first-of-type {
    margin-top: 0;
  }
`;
