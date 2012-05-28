kanso-encryption
================

Tools used for encryption and decryption on couchdb.


sjcl
----

```
var sjcl = require('sjcl');
```

See the (project page)[http://crypto.stanford.edu/sjcl/] for api.



cryptico
--------

```
var cryptico = require('cryptico');
```

See the (project page)[http://cryptico.wwwtyro.net/] for api.

*Note*. This call below can take a _long_ time

```
var SamsRSAkey = cryptico.generateRSAKey(PassPhrase, 1024);
```

It takes about 15 seconds on my Mac Book Pro. If you are doing this is a couch show or document update handler, you might
have to increase your couch settings. You can do this in futon, in the configuration tab, and adjust the section 'couchdb',
option 'os_process_timeout' and increase the value.

