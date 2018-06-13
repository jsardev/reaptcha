import styled from 'styled-components';

export default styled.a`
  text-decoration: none;
  color: ${props => props.theme.white};

  &:hover {
    color: ${props => props.theme.darkwhite};
  }
`;
