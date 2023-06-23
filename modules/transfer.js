const {CEP18Client} = require('casper-cep18-js-client');
const {Keys, CLPublicKey} = require('casper-js-sdk');
const config = require('../config');

module.exports = async function (req, res) {
  try {
    const cep18 = new CEP18Client(config.nodeUrl, config.networkName);
    const ownerKeys = Keys.Ed25519.loadKeyPairFromPrivateFile(config.ownerKeysPath);

    // const senderPublicKey = CLPublicKey.fromHex(req.query.sender);
    // const recipientPublicKey = CLPublicKey.fromHex(req.query.recipient);

    cep18.setContractHash(config.contractHash);

    const spenderPublicKey = CLPublicKey.fromHex('018a483f15a13b4044c0c449072d2d614b2c8c69f88d29bbfec5057b2cb46a92a9');
    const ownerPublicKey =  CLPublicKey.fromHex('01f0d0b7dfd44d16c5d398d0d702467afa28a9a82ee31b12d69ed187654e29152b');

    const deploy = cep18.transferFrom(
        {
          owner: ownerPublicKey,
          recipient: spenderPublicKey,
          amount: 5_000_000_000
        },
        5_000_000_000,
        ownerPublicKey,
        config.networkName,
        [ownerKeys]
    );

    // const deploy = cep18.approve(
    //     {
    //       spender: spenderPublicKey,
    //       amount: 5_000_000_000
    //     },
    //     5_000_000_000,
    //     ownerPublicKey,
    //     config.networkName,
    //     [ownerKeys]
    // );


    // const deploy = await cep18.transfer(
    //     {
    //       recipient: recipientPublicKey,
    //       amount: 5_000_000_000
    //     },
    //     5_000_000_000,
    //     senderPublicKey,
    //     config.networkName,
    //     [ownerKeys]
    // );

    const deployStatus = await deploy.send(config.nodeUrl);
    console.log(deployStatus);
    res.send(deployStatus);
  } catch (e) {
    res.send(`Error - ${e}`);
  }
}