import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLink = Link;

export default styled.a`
  text-decoration: none;
  color: ${props => props.theme.white};

  &:hover {
    color: ${props => props.theme.darkwhite};
  }
`;
