const CryptoJS = require("crypto-js");
const env = require('./env')

const myEncrypt = (text) => {
    var ciphertext = CryptoJS.AES.encrypt(text, env.key_encrypt).toString();
    return ciphertext
}

const myDecrypt = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, env.key_encrypt);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}



module.exports = { myEncrypt, myDecrypt }