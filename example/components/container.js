import styled, { css } from 'styled-components';

const pageContainerMixin = css`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 600px) {
    margin: 0 1rem;
  }
`;

const inlineContainerMixin = css`
  display: flex;
  align-items: center;
`;

export default styled.div`
  ${props => (props.inline ? inlineContainerMixin : pageContainerMixin)};
`;
