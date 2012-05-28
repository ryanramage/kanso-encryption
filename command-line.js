var cryptico = require('./cryptico');
var sjcl = require('./sjcl');

var password = process.argv[2];
var PlainText = process.argv[3];

var Bits = 1024;

var RSAkey = cryptico.generateRSAKey(password, Bits, false);
var PublicKeyString = cryptico.publicKeyString(RSAkey);

//console.log(RSAkey);


var EncryptionResult = cryptico.encrypt(PlainText, PublicKeyString);
//console.log(EncryptionResult);

var keystore = sjcl.encrypt(password, cryptico.rsa_key_to_string(RSAkey), {adata: PublicKeyString} );


var decrypted = sjcl.decrypt(password, keystore);


rsa2 = cryptico.rsa_key_from_string(decrypted);

//console.log(rsa2);

var PublicKeyString2 = cryptico.publicKeyString(rsa2);



var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, rsa2);
console.log(DecryptionResult);



