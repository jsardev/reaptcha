import React, {
  Fragment,
  SyntheticEvent,
  useEffect,
  useRef,
  useReducer,
  useState
} from 'react';
import Reaptcha, { Props as ReaptchaProps } from 'reaptcha';

import { getSiteKey } from '../config';

import Button from '../components/button';
import Container from '../components/container';
import Status from '../components/status';
import { H2 } from '../components/header';

export type Config = Pick<ReaptchaProps, 'size' | 'theme'> & {
  render: 'explicit' | 'automatic';
};

type Props = {
  config: Config;
};

type State = {
  token: string;
  loaded: boolean;
  rendered: boolean;
  verified: boolean;
  executed: boolean;
  executing: boolean;
};

const initialState = {
  token: '',
  loaded: false,
  rendered: false,
  verified: false,
  executed: false,
  executing: false
};

type Action = { type: 'RESET' } | { type: 'UPDATE'; value: Partial<State> };

const exampleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RESET':
      return { ...initialState, loaded: true };
    case 'UPDATE':
      return { ...state, ...action.value };
    default:
      return state;
  }
};

const Example = ({ config }: Props) => {
  const captcha = useRef<Reaptcha>(null);
  const [state, dispatch] = useReducer(exampleReducer, initialState);
  const [name, setName] = useState('');

  const onLoad = () => {
    dispatch({ type: 'UPDATE', value: { loaded: true } });
  };

  const onRender = () => {
    dispatch({ type: 'UPDATE', value: { rendered: true } });
  };

  const onVerify = (invisible: boolean) => (token: string) => {
    console.log({ name });

    dispatch({
      type: 'UPDATE',
      value: {
        token,
        verified: true,
        executed: true
      }
    });

    if (invisible) {
      dispatch({
        type: 'UPDATE',
        value: {
          executing: false,
          executed: true
        }
      });
    }
  };

  const onExpire = (invisible: boolean) => () => {
    dispatch({ type: 'UPDATE', value: { verified: false } });

    if (invisible) {
      dispatch({ type: 'UPDATE', value: { executed: true } });
    }
  };

  const renderRecaptcha = () => {
    captcha.current?.renderExplicitly();
    dispatch({ type: 'UPDATE', value: { rendered: true } });
  };

  const executeRecaptcha = () => {
    dispatch({ type: 'UPDATE', value: { executing: true } });
    captcha.current?.execute();
  };

  const resetRecaptcha = () => {
    captcha.current?.reset();
    dispatch({
      type: 'UPDATE',
      value: {
        verified: false,
        executed: false
      }
    });
  };

  const getResponseRecaptcha = () => {
    captcha.current?.getResponse().then(response => {
      alert(response);
    });
  };

  const submitForm = (invisible: boolean) => (
    e: SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (invisible) {
      executeRecaptcha();
    } else {
      dispatch({ type: 'UPDATE', value: { executed: false } });
    }
  };

  useEffect(() => {
    console.log(config);
    if (config.render === 'explicit') {
      dispatch({ type: 'RESET' });
    }
  }, [config.render, config.size, config.theme]);

  const { render, size, theme } = config;
  const explicit = render === 'explicit';
  const invisible = size === 'invisible';
  const sitekey = getSiteKey(invisible);

  return (
    <Fragment>
      <H2 mb>Example</H2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Container inline mb>
        <div>reCAPTCHA status:</div>
        <Container inline>
          <Status active={state.loaded}>Loaded</Status>
          <Status active={state.rendered}>Rendered</Status>
          <Status active={state.verified}>Verified</Status>
        </Container>
      </Container>
      <form onSubmit={submitForm(invisible)}>
        <Container mb>
          <Reaptcha
            key={render}
            ref={captcha}
            sitekey={sitekey}
            size={size}
            theme={theme}
            explicit={explicit}
            onLoad={onLoad}
            onRender={onRender}
            onVerify={onVerify(invisible)}
            onExpire={onExpire(invisible)}
          />
        </Container>
        <Container inline gap>
          {explicit && (
            <Button
              onClick={renderRecaptcha}
              disabled={!state.loaded || state.rendered}
              submitted={state.rendered}
            >
              {state.rendered ? 'Rendered' : 'Render'}
            </Button>
          )}
          {invisible && (
            <Button
              type="submit"
              disabled={
                (!state.verified && !invisible) ||
                state.executing ||
                state.executed ||
                !state.rendered
              }
              executing={state.executing}
              submitted={state.executed}
            >
              {state.executed
                ? 'Verified'
                : state.executing
                ? 'Verifying'
                : 'Verify'}
            </Button>
          )}
          <Button
            type="button"
            onClick={resetRecaptcha}
            disabled={!state.verified}
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={getResponseRecaptcha}
            disabled={!state.verified}
          >
            Get Response
          </Button>
        </Container>
      </form>
    </Fragment>
  );
};

export default Example;
