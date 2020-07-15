import CryptoJS from 'crypto-js'
const UID = "U73E59C7A8";
const ts = Math.floor((new Date()).getTime() / 1000);
let str = "ts="+ts+"&uid=" + UID; // 参数字符串
const KEY = "mco3q5yvvxp9pwlh";
const result = CryptoJS.HmacSHA1(str, KEY);
const sig = result.toString(CryptoJS.enc.Base64)
str =  str + "&sig=" + sig; // 最终构造的已加密的参数字符串
export default str