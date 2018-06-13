/* @flow */

const NORMAL_SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';
const INVISIBLE_SITE_KEY = '6LesI14UAAAAAFwOYJfOm84jpq8Wzlb9T4HQDOtS';

export default (invisible: boolean) =>
  invisible ? INVISIBLE_SITE_KEY : NORMAL_SITE_KEY;
