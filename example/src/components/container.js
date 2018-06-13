import styled, { css } from 'styled-components';

const containerMixin = css`
  margin-bottom: 1rem;
`;

const pageContainerMixin = css`
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 600px) {
    margin: 0 1rem;
  }
`;

const inlineContainerMixin = css`
  display: flex;
  align-items: center;

  button,
  a {
    margin-right: 1rem;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const betweenContainerMixin = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default styled.div`
  ${props => {
    if (props.page) return pageContainerMixin;
    if (props.inline) return inlineContainerMixin;
    if (props.between) return betweenContainerMixin;
    return containerMixin;
  }};
`;
