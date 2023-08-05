import {JSEncrypt} from 'jsencrypt';
import {CONSTANTS} from './constant';

const OtpEncryption = value => {
  let encryptValue = new JSEncrypt();
  encryptValue.setPublicKey(CONSTANTS.cert);
  let encryptData = encryptValue.encrypt(value);
  return encryptData;
};
export default OtpEncryption;
