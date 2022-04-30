
const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
   
    modulusLength: 2048,
});

const port = process.env.SERVER_PORT || 8000;// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/QRcode", (req, res) => {
   let plainText = JSON.stringify(Object.keys(req.body)[0]) 
    console.log(plainText);
    let test = publicKey.export({
		type: "pkcs1",
		format: "pem",
	});
    
    const encryptedData = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(plainText)
      );
      console.log("encypted data: ", encryptedData.toString("base64"));
      let encr = encryptedData.toString("base64")
res.send([test,encr, encryptedData])   
});
app.post("/decrypt", (req, res) => {
    console.log(JSON.stringify(req.body))
    const decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,  
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(req.body)
      );
      let test = privateKey.export({
        type: "pkcs1",
        format: "pem",
      });
      let decryp = decryptedData.toString()
      console.log("decrypted data: ", decryptedData.toString());
 
 res.send([decryp, test])
 });
app.listen(port, () => console.log(`Listening on port ${port}`));




