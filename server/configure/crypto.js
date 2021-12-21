const CryptoJS = require("crypto-js");
const env = require('./env')
// Encrypt
//var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
//console.log(ciphertext);
// Decrypt
//var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
//var originalText = bytes.toString(CryptoJS.enc.Utf8);

//console.log(originalText)


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