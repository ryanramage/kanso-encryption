var test = require('tap').test;
var cryptico = require('../cryptico.js');

test('different keys for same password', function(t){
    t.plan(1);

    var passphrase = 'I am not a crook';

    var generate = function(pass) {
        // first run
        var Bits = 1024;
        var RSAkey = cryptico.generateRSAKey(pass, Bits);
        return cryptico.publicKeyString(RSAkey);
    }

    var run1 = generate(passphrase);
    var run2 = generate(passphrase);

    t.notEqual(run1, run2, 'should not be equal')


});