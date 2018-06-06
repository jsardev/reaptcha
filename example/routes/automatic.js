import React from 'react';
import qs from 'query-string';

import Reaptcha from '../../index';

const SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';

export default props => {
  const options = qs.parse(props.location.search);
  return <Reaptcha siteKey={SITE_KEY} {...options} />;
};
