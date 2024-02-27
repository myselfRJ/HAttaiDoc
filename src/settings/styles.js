import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';

let CUSTOMCOLOR = {
  primary: '#4BA5FA',
  background: '#ffffff',
  black: 'black',
  white: 'white',
  error: 'red',
  graph: '#98CDFF',
  warn: '#ffb732',
  delete: '#FF6347',
  success: '#2CBB15',
  //#91D685,#C9E4FD
  edit: '#4ba5fa',
  disable: '#A9A9A9',
  borderColor: '#C0DFFC',
  backgroundColor: '#D0E8FF',
  recent: '#e5e5e5',
  fadeGreen: '#2CBB1530',
  fadeYellow: '#FFEEAC61',
  selector: '#F4F7Fa',
  lightgreen: '#DFFFDA',
  disableslot: '#EEEEEE',
  disableslotText: '#9E9E9E',
  selectionTab: '#0069CB',
  selectionText: '#C2C2C2',
  fadeBlue: '#EAF5FF',
  darkgreen: '#399B29',
};
const DARKCOLOR = {
  primary: 'red',
  background: 'grey',
  black: 'black',
  white: 'white',
};
const CUSTOMFONTFAMILY = {
  heading: 'OpenSans-SemiBold',
  body: 'OpenSans-Regular',
};
const CUSTOMFONTSIZE = {
  h1: moderateScale(20),
  h2: moderateScale(18),
  h3: moderateScale(14),
  h4: moderateScale(12),
  h5: moderateScale(10),
};
// CUSTOMCOLOR=DARKCOLOR;
export {CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE};
