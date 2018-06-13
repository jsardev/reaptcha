import styled, { css } from 'styled-components';

const whiteButton = css`
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.white};
  box-shadow: 0 3px 0 0 ${props => props.theme.darkwhite};

  &:hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.darkwhite};
    box-shadow: 0 3px 0 0 ${props => props.theme.darkestwhite};
  }
`;

const blueButton = css`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.blue};
  box-shadow: 0 3px 0 0 ${props => props.theme.darkblue};

  &:hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.darkblue};
    box-shadow: 0 3px 0 0 ${props => props.theme.darkestblue};
  }
`;

const greenButton = css`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.green};
  box-shadow: 0 3px 0 0 ${props => props.theme.darkgreen};

  &:hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.darkgreen};
    box-shadow: 0 3px 0 0 ${props => props.theme.darkestgreen};
  }
`;

const orangeButton = css`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.orange};
  box-shadow: 0 3px 0 0 ${props => props.theme.darkorange};

  &:hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.darkorange};
    box-shadow: 0 3px 0 0 ${props => props.theme.darkestorange};
  }
`;

const ml = css`
  margin-left: ${props => props.theme.smallmargin};
`;

const mr = css`
  margin-right: ${props => props.theme.smallmargin};
`;

const initialState = css`
  cursor: default;

  ${props => (props.ml ? ml : null)};
  ${props => (props.mr ? mr : null)};

  ${props => {
    if (props.executing) return orangeButton;
    if (props.submitted) return greenButton;
    if (props.white) return whiteButton;
    return blueButton;
  }};

  a {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }
`;

export default styled.button`
  ${initialState};

  outline: none;
  border: none;
  border-radius: 4px;
  padding: ${props => (props.short ? '.3rem' : props.small ? '.5rem' : '1rem')};
  font-size: ${props => (props.small || props.small ? '.7rem' : '1rem')};
  margin-bottom: 3px;

  &:disabled {
    opacity: 0.5;
  }
`;
