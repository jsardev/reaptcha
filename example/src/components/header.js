import styled, { css } from 'styled-components';

const header = css`
  font-weight: 400;
  margin: 0 0 1rem 0;
  display: inline-block;

  + a button {
    margin: 0 0 0.5rem 0.5rem;
  }

  &:last-child {
    margin: 0;
  }
`;

export const H1 = styled.h1`
  ${header};
  font-size: 2rem;
`;

export const H2 = styled.h2`
  ${header};
  font-size: 1.2rem;
`;

export const H3 = styled.h3`
  ${header};
  font-size: 1rem;
`;
