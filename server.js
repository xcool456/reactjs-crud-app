var express = require('express');
var nedb = require('nedb');
var expressNedbRest = require('express-nedb-rest');
var cors = require('cors')

const crypto = require("crypto");
let algorithm = "aes-256-cbc";
let secret = "superSecretKey";
let key = crypto
  .createHash("sha256")
  .update(String(secret))
  .digest("base64")
  .substr(0, 32);

// setup express app
var oApp = express();

oApp.use(cors())

// create  NEDB datastore
var datastore = new nedb({
    filename: "./db.dll",
    autoload: true,
    afterSerialization(plaintext) {
      const iv = crypto.randomBytes(16);
      const aes = crypto.createCipheriv(algorithm, key, iv);
      let ciphertext = aes.update(plaintext);
      ciphertext = Buffer.concat([iv, ciphertext, aes.final()]);
      return ciphertext.toString("base64");
    },
    beforeDeserialization(ciphertext) {
      const ciphertextBytes = Buffer.from(ciphertext, "base64");
      const iv = ciphertextBytes.slice(0, 16);
      const data = ciphertextBytes.slice(16);
      const aes = crypto.createDecipheriv(algorithm, key, iv);
      let plaintextBytes = Buffer.from(aes.update(data));
      plaintextBytes = Buffer.concat([plaintextBytes, aes.final()]);
      return plaintextBytes.toString();
    },
  });
// create rest api router and connect it to datastore  
var restApi = expressNedbRest();
restApi.addDatastore('db', datastore);

// setup express server to serve rest service
oApp.use('/', restApi);

oApp.listen(8080, function () {
    console.log('you may use nedb rest api at port 8080');
});