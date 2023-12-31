const {CEP18Client} = require('casper-cep18-js-client');
const {Keys, CLPublicKey} = require('casper-js-sdk');
const config = require('../config');
const to = '01f0d0b7dfd44d16c5d398d0d702467afa28a9a82ee31b12d69ed187654e29152b';
const from = '018a483f15a13b4044c0c449072d2d614b2c8c69f88d29bbfec5057b2cb46a92a9';
const CryptoJS = require('crypto-js');

module.exports = async function (req, res) {
  try {
    const cep18 = new CEP18Client(config.nodeUrl, config.networkName);
    const ownerKeys = Keys.Ed25519.loadKeyPairFromPrivateFile(config.ownerKeysPath);

    const cipherData = req.query.data;
    const parsedData = cipherData.replaceAll(" ", "+");

    const bytes = await CryptoJS.AES.decrypt(parsedData, process.env.PASSPHRASE);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);

    const data = JSON.parse(originalData);

    const ownerPublicKey = CLPublicKey.fromHex(data.from);
    const recipientPublicKey = CLPublicKey.fromHex(data.to);
    const amount = data.amount * 1000000000;

    cep18.setContractHash(config.contractHash);

    const deploy = await cep18.transfer(
        {
          recipient: recipientPublicKey,
          amount: amount,
        },
        5_000_000_000,
        ownerPublicKey,
        config.networkName,
        [ownerKeys]
    );

    const deployStatus = await deploy.send(config.nodeUrl);
    res.send(deployStatus);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
}