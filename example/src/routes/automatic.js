/* @flow */

import React from 'react';
import qs from 'query-string';
import Reaptcha from 'reaptcha';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

type Props = {
  location: {
    search: string
  }
};

const Automatic = (props: Props) => {
  const options = qs.parse(props.location.search);
  return <Reaptcha sitekey={SITE_KEY} {...options} inject />;
};

export default Automatic;
