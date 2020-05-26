var express = require('express');
var nedb = require('nedb');
var expressNedbRest = require('express-nedb-rest');
var cors = require('cors')
var bodyParser = require('body-parser')

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
var datastore1 = new nedb({
    filename: "./db1.dll",
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

var datastore3 = new nedb({
    filename: "./db2.dll",
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

var datastore2 = new nedb({
    filename: "./settings.dll",
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
restApi.addDatastore('db1', datastore1);
restApi.addDatastore('db2', datastore3);
restApi.addDatastore('settings', datastore2);

// setup express server to serve rest service
oApp.use('/', restApi);

oApp.listen(8080, function () {
    console.log('Nedb rest api on port 8080');
});

var mail = express();
mail.use(cors())
mail.use(bodyParser());
const nodemailer = require('nodemailer');

async function main(data) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ovvo9352@gmail.com", // generated ethereal user
            pass: "Qwertyui12345678", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${data.fio} 👥 <foo>`,
        to: `${data.teacher}`, // list of receivers
        subject: "Тест ✔", // Subject line
        text: `ФИО:${data.fio}\nГруппа:${data.group}\nКоличесиво баллов:${data.score}/${data.countOfQuestion}(${data.percent})\nПотрачено времени:${data.time}`, // plain text body
    });
}



mail.post('/', function (req, res) {
    main(req.body).catch(console.error);
    res.status(200).send('success')
});

mail.listen(8888, function () {
    console.log('Nodemailer on port 8888!');
});