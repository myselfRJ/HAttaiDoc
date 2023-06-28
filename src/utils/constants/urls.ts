// import Config from 'react-native-config';

export const URLS = {
  generateOtp: (method: 'api' | 'authenticated') =>
    `/${method}/users/generate-otp`,
  resendOtp: '/api/users/resend-otp',
  validateOtp: (method: 'api' | 'authenticated') =>
    `/${method}/users/validate-otp`,
  signUp: '/api/users/sign-up',
  socialSignIn: (platform: 'google' | 'facebook') =>
    `/oauth2/authorize/${platform}?redirect_uri=trunome-content://authorization/redirect`,
  // getMenu: (date: number, orderForLater: boolean) =>
  //   '/api/menu-items/page' +
  //   (orderForLater
  //     ? '?timestamp=' + date + '&orderForLater=true'
  //     : '?orderForLater=false'),
  // getDish: (id: number) => `/authenticated/menu-items/${id}`,
  // cart: (id?: number) => `/authenticated/cart/${id ? id : ''}`,
  // cartMenuItems: (id: number) => `/authenticated/cart/menu-item/${id}`,
  profile: (picture?: boolean) =>
    `/authenticated/users/profile${picture ? '-picture' : ''}`,
  infoBySubCategory: (id?: number) =>
    `/authenticated/sub-category/${id}/contents/page`,
  infoByTopic: '/authenticated/contents/search',
  allTestTypes: '/authenticated/test-types',
  createTest: '/authenticated/users/tests',
  myTests: 'authenticated/users/tests/page',
  testDetails: (id?: number) => `/authenticated/users/tests/${id ? id : ''}`,
  createQuestion: '/authenticated/users/questions',
  getAskQuestion: '/authenticated/users/questions/page',
  faqs: '/authenticated/users/faq/page',
  answer: (id?: number) => `/authenticated/questions/${id}/all-answers`,
  faqAnswer: (id?: number) => `/authenticated/users/faq/${id}`,
  categories: '/authenticated/categories',
  subCategories: (id?: number) =>
    `/authenticated/categories/${id}/sub-categories`,
  categoryWithSubCategory: '/authenticated/categories/sub-categories',
  subCategoryTopic: (id?: number) =>
    `/authenticated/sub-categories/${id}/topics`,
  getContent: (id?: number) => `authenticated/topics/${id}/contents`,
  searchContent: '/authenticated/contents/search',
  logout: '/authenticated/users/logout',
  sendCode: (field: 'email' | 'phone' | 'email_check' | 'phone_check') =>
    `authenticated/users/send-code?field=${field}`,
  verifyCode: (field: 'email' | 'phone') =>
    `authenticated/users/validate?field=${field}`,
  updateDetails: (field: 'email' | 'phone') =>
    `authenticated/users/update?field=${field}`,
  refresh_token: '/api/refresh-token',
  uploadPrescription: (id?: any) => `/authenticated/tests/${id}/prescriptions`,
  communityFaqs: 'authenticated/users/all-questions/page',
};
