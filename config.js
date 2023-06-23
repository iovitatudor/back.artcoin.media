const config = {
  nodeUrl: 'http://135.181.208.231:7777/rpc',
  networkName: 'casper-test',
  ownerKeysPath: './keys/secret_key.pem',
  contractArgs: {
    name: 'Artcoin',
    symbol: 'AC',
    decimals: 9,
    totalSupply: 1_000_000_000_000_000_000
  },
  recipientKeys: './recipientKeys/secret_key.pem',
  contractHash: 'hash-366519ebaf58c936bc1d6de938c3dc43f0220b327dcf8a69f43bc1703109ce53'
};

module.exports = config;