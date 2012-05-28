kanso-encryption
================

Tools used for encryption and decryption on couchdb.


sjcl
----

```
var sjcl = require('sjcl');
```

See the [project page](http://crypto.stanford.edu/sjcl/) for api.



cryptico
--------

```
var cryptico = require('cryptico');
```

See the [project page](http://cryptico.wwwtyro.net/) for api.

*Note 1* The generate RSA key has been enhanced to take an additional parameter. It looks like this
```
cryptico.generateRSAKey(PassPhrase, 1024, true);
```
This ensures the public key is different for the same PassPhrase. This helps eliminate attacks where precomputed PassPhrases are
compared against a users public key. The downside is the user has to store the their generated private key somewhere. This is a difficult
problem in a web environment so as to prevent their key from being exposed, and to have it available from all connected computers.


*Note 2*. This call below can take a _long_ time

```
var SamsRSAkey = cryptico.generateRSAKey(PassPhrase, 1024);
```

It takes about 15 seconds on my Mac Book Pro. If you are doing this is a couch show or document update handler, you might
have to increase your couch settings. You can do this in futon, in the configuration tab, and adjust the section 'couchdb',
option 'os_process_timeout' and increase the value.

