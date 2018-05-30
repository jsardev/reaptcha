import styled from 'styled-components';

export default styled.button`
  padding: ${props => (props.small ? '.5rem' : '1rem')};
  outline: none;
  border: none;
  border-radius: 4px;
  margin: 0 1rem 0 0;
  color: white;
  font-size: ${props => (props.small ? '.5rem' : '1rem')};
  background-color: #4683F3;
  box-shadow: 0 3px 0 0 #3060D1;

  &:hover {
    cursor: pointer;
    background-color: #3060D1
    box-shadow: 0 3px 0 0 #2F5AC9;
  }
`;
