import styled from 'styled-components';

export type Props = {
  black?: boolean;
};

export default styled.a<Props>`
  text-decoration: none;
  color: ${props => (props.black ? props.theme.black : props.theme.white)};

  &:hover {
    color: ${props => props.theme.darkestwhite};
  }
`;
