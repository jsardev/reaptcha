import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLink = Link;

export default styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    color: lightgray;
  }
`;
