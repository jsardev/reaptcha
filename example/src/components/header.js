import styled, { css } from 'styled-components';

const mb = css`
  margin-bottom: ${props => props.theme.margin};
`;

const mbs = css`
  margin-bottom: ${props => props.theme.smallmargin};
`;

const inline = css`
  display: inline-block;
`;

const header = css`
  margin: 0;
  font-weight: 400;

  ${props => (props.mb ? mb : null)};
  ${props => (props.mbs ? mbs : null)};
  ${props => (props.inline ? inline : null)};
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
