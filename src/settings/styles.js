import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';

let CUSTOMCOLOR = {
  primary: '#4BA5FA',
  background: 'grey',
  black: 'black',
  white: 'white',
  error: 'red',
  graph: '#98CDFF',
  warn: '#ffb732',
  delete: '#FF6347',
  success: '#2CBB15',
  edit: '#4ba5fa'
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
