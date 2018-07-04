/* @flow */

const NORMAL_SITE_KEY = '6LcIEVwUAAAAAEnR50W15N0XjSGG8vOTVgVCfqU6';
const INVISIBLE_SITE_KEY = '6LesI14UAAAAAFwOYJfOm84jpq8Wzlb9T4HQDOtS';

export const getSiteKey = (invisible: boolean) =>
  invisible ? INVISIBLE_SITE_KEY : NORMAL_SITE_KEY;

export const theme = {
  blue: '#4683F3',
  darkblue: '#3060D1',
  darkestblue: '#2F5AC9',
  green: '#3BB273',
  darkgreen: '#36A269',
  orange: '#E1BC29',
  darkorange: '#CDAB26',
  white: '#ffffff',
  darkwhite: '#e5e5e5',
  darkestwhite: '#cccccc',
  black: '#000000',
  gray: '#f5f5f5',
  red: '#E15554',

  margin: '1rem',
  smallmargin: '.5rem'
};
