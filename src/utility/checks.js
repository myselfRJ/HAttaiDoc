const checkNumber = number => {
  if (number.length === 10) {
    return true;
  }
  return false;
};

function checkPassword(inputtxt) {
  console.log(inputtxt);
  if (inputtxt === undefined || null) {
    return false;
  }
  //6-20 Upper lower number special character
  var passw =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,20}$/;
  if (inputtxt.match(passw)) {
    return true;
  } else {
    return false;
  }
}

function samePassword(p1, p2) {
  if (p1 === p2) {
    return true;
  }
  return false;
}
const checkOtp = number => {
  if (number.length === 4) {
    return true;
  }
  return false;
};
export {checkNumber, checkPassword, samePassword, checkOtp};
