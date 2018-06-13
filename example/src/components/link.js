import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const link = css`
  text-decoration: none;
  color: ${props => props.theme.white};

  &:hover {
    color: ${props => props.theme.darkwhite};
  }
`;

export const NavLink = styled(Link)`
  ${link};
`;

export default styled.a`
  ${link};
`;
