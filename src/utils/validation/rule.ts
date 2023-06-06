import {message} from './msg';

const emptyValidation = (value: any) => {
  if (value === undefined || value === null || value === '') {
    return message.Empty;
  } else {
    return null;
  }
};

const ageValidation = (value: any) => {
  if (value) {
    let reg = /^[0-9]+$/i;
    if (reg.test(value) && parseInt(value, 10) > 0) {
      return null;
    } else {
      return value ? message.Age : message.Empty;
    }
  } else {
    return message.Empty;
  }
};

const contactValidation = (value: any) => {
  if (value) {
    let reg = /^[0-9]+$/i;
    if (reg.test(value)) {
      return null;
    } else {
      return value ? message.Contact : message.Empty;
    }
  } else {
    return message.Empty;
  }
};

const questionValidation = (value: any) => {
  let regX = /^[^-\s][A-Za-z0-9 _.,!?"'/$]+$/i;
  if (value === undefined || value === null || value === '') {
    return message.Empty;
  } else if (value === ' ') {
    return message.Question;
  } else if (!regX.test(value) && value.length > 1) {
    return message.Question;
  } else {
    return null;
  }
};

export const emailValidation = (value: any) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(value)) {
    return null;
  } else {
    return value ? message.Email : message.Empty;
  }
};

export const firstNameValidation = (value: any) => {
  let regX = /^[a-zA-Z]+$/g;
  if (value === undefined) {
    return message.Empty;
  } else if (regX.test(value)) {
    return null;
  } else {
    return value ? message.FirstName : message.Empty;
  }
};

export const lastNameValidation = (value: any) => {
  // let regX = /^[a-zA-Z]+$/g;
  let regX = /^[a-zA-Z\\s]*$/;
  if (value === undefined) {
    return message.Empty;
  } else if (regX.test(value)) {
    return null;
  } else {
    return value ? message.LastName : message.Empty;
  }
};

export const nameValidation = (value: any) => {
  let regX = /^[a-zA-Z\\s]*$/;
  if (value) {
    const result = regX.test(value);
    if (!result) {
      return {error: true, message};
    }
  }
};

const validation = {
  emptyValidation,
  ageValidation,
  questionValidation,
  contactValidation,
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  nameValidation,
};

export default validation;
