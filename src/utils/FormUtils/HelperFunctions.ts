import {FormDataModel} from '../../components/Form/Form';

export const getFormFields: (formData: FormDataModel) => {
  [p: string]: string | number | boolean;
} = (formData: FormDataModel) => {
  const fields: {[key: string]: string | number} = {};
  for (const key in formData) {
    if (!key.includes('Error')) {
      fields[key] = formData[key];
    }
  }
  return fields;
};

export const getFormattedDate = date => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return formattedToday;
};
