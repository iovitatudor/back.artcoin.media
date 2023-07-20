const {CEP18Client} = require('casper-cep18-js-client');
const {Keys, CLPublicKey} = require('casper-js-sdk');
const config = require('../config');

module.exports = async function (req, res) {
  try {
    const cep18 = new CEP18Client(config.nodeUrl, config.networkName);
    const userPublicKey = CLPublicKey.fromHex(req.query.publicKey);

    cep18.setContractHash(config.contractHash);

    const balance = await cep18.balanceOf(userPublicKey);
    const balanceHEX = balance._hex;

    const result = {
      publicKey: req.query.privateKey,
      balance: parseInt(balanceHEX),
    };

    res.send(result);
  } catch (e) {
    const result = {
      publicKey: req.query.privateKey,
      balance: 0,
    };
    res.send(result);
  }
}