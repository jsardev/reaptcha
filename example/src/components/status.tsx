import styled, { css } from 'styled-components';

export type Props = {
  active?: boolean;
};

const redBadge = css`
  background-color: ${props => props.theme.red};
`;

const greenBadge = css`
  background-color: ${props => props.theme.green};
`;

export default styled.div<Props>`
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 0.7rem;
  padding: 0.25rem;
  color: ${props => props.theme.white};

  &:first-of-type {
    margin-left: 0.5rem;
  }

  &:last-of-type {
    margin-right: 0;
  }

  ${props => {
    if (props.active) return greenBadge;
    return redBadge;
  }};
`;
