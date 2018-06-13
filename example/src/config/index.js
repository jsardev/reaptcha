/* @flow */

const NORMAL_SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';
const INVISIBLE_SITE_KEY = '6LesI14UAAAAAFwOYJfOm84jpq8Wzlb9T4HQDOtS';

export const getSiteKey = (invisible: boolean) =>
  invisible ? INVISIBLE_SITE_KEY : NORMAL_SITE_KEY;

export const theme = {
  blue: '#4683F3',
  darkblue: '#3060D1',
  darkestblue: '#2F5AC9',
  green: '#32cd32',
  darkgreen: '#2db82d',
  orange: '#ffa500',
  darkorange: '#e59400',
  white: '#ffffff',
  darkwhite: '#e5e5e5',
  darkestwhite: '#cccccc',
  black: '#000000'
};
