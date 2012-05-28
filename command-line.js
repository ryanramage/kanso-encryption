var cryptico = require('./cryptico');
var sjcl = require('./sjcl');

var fs = require('fs');
var path = require('path');

var dir_name = '.kanso';
var file_name = 'keystore';

var password = process.argv[2];

var storage_dir = findStorageDir(process.env);

if (isKeyStored(storage_dir)) {
    console.log('key already exists in ' + storage_dir);
} else {
    var keystoreFile = generateKeystore(password);
    store(keystoreFile, storage_dir);

}

function generateKeystore(passphrase) {
    var Bits = 1024;
    var RSAkey = cryptico.generateRSAKey(passphrase, Bits, true);
    var PublicKeyString = cryptico.publicKeyString(RSAkey);

    console.log('Public Key:');
    console.log(PublicKeyString);
    var keystore = sjcl.encrypt(passphrase, cryptico.rsa_key_to_string(RSAkey), {adata: PublicKeyString} );
    return keystore;
}

function findStorageDir(env) {
    var home = env.HOME;
    if (!home) home = __dirname;
    return path.join(home, dir_name);
}

function isKeyStored(dir) {
    var stored = false;
    if (path.existsSync(dir)) {
        if (path.existsSync(path.join(dir, file_name))) {
            stored = true;
        }
    }
    return stored;
}



function store(keystore, dir) {
    fs.mkdir(dir, 0700, function(err){

        var location = path.join(dir, file_name)

        fs.writeFile(location, keystore, function (err) {
          if (err) throw err;
          console.log('Private key saved at ' + location);
        });
    });
}









