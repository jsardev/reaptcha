import styled, { css } from 'styled-components';

export type Props = {
  mb?: boolean;
  page?: boolean;
  flex?: boolean;
  inline?: boolean;
  between?: boolean;
  gap?: boolean;
};

const mb = css`
  margin-bottom: ${props => props.theme.margin};
`;

const page = css`
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 600px) {
    margin: 0 ${props => props.theme.margin};
  }
`;

const flex = css`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const inline = css`
  display: flex;
  align-items: center;
`;

const between = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const gap = css<Props>`
  gap: ${props => props.theme.smallmargin};
`;

export default styled.div<Props>`
  ${props => (props.mb ? mb : null)};
  ${props => (props.page ? page : null)};
  ${props => (props.flex ? flex : null)};
  ${props => (props.inline ? inline : null)};
  ${props => (props.between ? between : null)};
  ${props => (props.gap ? gap : null)};
`;
