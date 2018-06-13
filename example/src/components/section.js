import styled, { css } from 'styled-components';

const blue = css`
  background-color: ${props => props.theme.blue};
  color: ${props => props.theme.white};
`;

const gray = css`
  background-color: ${props => props.theme.gray};
  color: ${props => props.theme.black};
`;

export default styled.div`
  padding: 2rem 0;
  width: 100%;

  ${props => (props.blue ? blue : null)};
  ${props => (props.gray ? gray : null)};

  &:first-of-type {
    margin-top: 0;
  }
`;
