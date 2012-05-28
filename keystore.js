var cryptico = require('cryptico');
var sjcl = require('sjcl');


exports.generate = function(passphrase) {
    var Bits = 1024;
    var RSAkey = cryptico.generateRSAKey(passphrase, Bits, true);
    var PublicKeyString = cryptico.publicKeyString(RSAkey);

    var keystore = sjcl.encrypt(passphrase, cryptico.rsa_key_to_string(RSAkey), {adata: PublicKeyString} );
    return keystore;
}


exports.decryptData = function(passphrase, cipherText, keystore) {
    var key_str = sjcl.decrypt(passphrase, keystore );
    var RSAKey = cryptico.rsa_key_from_string(key_str);
    return cryptico.decrypt(cipherText, RSAKey);
}

exports.signAndEncryptData = function(passphrase, plaintext, recipient_public_key, keystore) {
    var key_str = sjcl.decrypt(passphrase, keystore );
    var RSAKey = cryptico.rsa_key_from_string(key_str);
    return cryptico.encrypt(plaintext, recipiant_public_key, RSAKey);
}

