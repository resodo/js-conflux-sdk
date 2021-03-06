---
id: javascript_sdk
title: Javascript SDK
custom_edit_url: https://github.com/Conflux-Chain/js-conflux-sdk/edit/master/api.md
keywords:
  - conflux
  - javascript
  - sdk
---

- Account.js
    - [Account](#Account.js/Account)
- Conflux.js
    - [Conflux](#Conflux.js/Conflux)
- Message.js
    - [Message](#Message.js/Message)
- Transaction.js
    - [Transaction](#Transaction.js/Transaction)
- contract
    - Contract.js
        - [Contract](#contract/Contract.js/Contract)

----------------------------------------

## Account <a id="Account.js/Account"></a>

*no description*

## Account.random <a id="Account.js/random"></a>

Create a new Account with random privateKey.

* **Parameters**

Name    | Type | Required | Default | Description
--------|------|----------|---------|------------
entropy |      | true     |         |

* **Returns**

`Account` 

* **Examples**

```
> Account.random()   Account {      privateKey: '0xd28edbdb7bbe75787b84c5f525f47666a3274bb06561581f00839645f3c26f66',      publicKey: '0xc42b53ae2ef95fee489948d33df391c4a9da31b7a3e29cf772c24eb42f74e94ab3bfe00bf29a239c17786a5b921853b7c5344d36694db43aa849e401f91566a5',      address: '0x1cecb4a2922b7007e236daf0c797de6e55496e84'    }> Account.random() // gen a different account from above   Account {      privateKey: '0x1b67150f56f49556ef7e3899024d83c125d84990d311ec08fa98aa1433bc0f53',      publicKey: '0xd442207828ffd4dad918fea0d75d42dbea1fe5e3789c00a82e18ce8229714eae3f70b12f2f1abd795ad3e5c52a5a597289eb5096548438c233431f498b47b9a6',      address: '0x16c25691aadc3363f5862d264072584f3ebf4613'    }> Account.random('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');   Account {      privateKey: '0x1d41e006afd28ea339922d8ab4be93154a14d4f1b6d0ad4e7aabf807e7536a5f',      publicKey: '0x4c07c75d3fdc5b1d6afef6ec374b0eaac86bcaa771a1d536bc4ce6f111b1c60e414b370e4cf31bf7770ae6818a3518c485398a43857d9053153f6eb4f5644a90',      address: '0x113d49784c80d6f8fdbc0bef5a5ab0d9c9fee520'    }> Account.random('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');// gen a different account from above, even use same entropy   Account {      privateKey: '0x5a34ff3318674c33209ce856218890e9a6ee3811e8a51e3094ed1e6a94bf58ef',      publicKey: '0xe530d77c3ed6115cb46ba79821085bf67d2a7a8c808c1d52dec03fd7a82e569c2136dba84b21d40f46d90484722b21a9d5a8038495adf93f2eed564ababa2422',      address: '0x1f63fcef4aaa88c03cbb5c9fb34be69dee65d0a8'    }
```

## Account.prototype.constructor <a id="Account.js/constructor"></a>

Create a account by privateKey.

* **Parameters**

Name       | Type            | Required | Default | Description
-----------|-----------------|----------|---------|------------
privateKey | `string,Buffer` | true     |         |

* **Returns**

`Account` 

## Account.prototype.signTransaction <a id="Account.js/signTransaction"></a>

Sign a transaction.

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------------
options | `object` | true     |         | See 'Transaction'

* **Returns**

`Transaction` 

## Account.prototype.signMessage <a id="Account.js/signMessage"></a>

Sign a string.

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------
message | `string` | true     |         |

* **Returns**

`Message` 

* **Examples**

```
> const account = new Account('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef')> const msg = account.signMessage('Hello World!')> console.log(msg);   Message {      message: 'Hello World',      signature: '0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01'    }
```

## Account.prototype.toString <a id="Account.js/toString"></a>

*no description*

* **Returns**

`string` Account address as string.

----------------------------------------

## Conflux <a id="Conflux.js/Conflux"></a>

A sdk of conflux.

## Conflux.prototype.constructor <a id="Conflux.js/constructor"></a>

*no description*

* **Parameters**

Name                        | Type            | Required | Default        | Description
----------------------------|-----------------|----------|----------------|-----------------------------------------------------------
options                     | `object`        | false    |                | Conflux and Provider constructor options.
options.url                 | `string`        | false    | ''             | Url of provider to create.
options.defaultEpoch        | `string,number` | false    | "latest_state" | Default epochNumber.
options.defaultGasPrice     | `string,number` | false    |                | The default gas price in drip to use for transactions.
options.defaultGas          | `string,number` | false    |                | The default maximum gas provided for a transaction.
options.defaultStorageLimit | `string,number` | false    |                | The default maximum storage limit bytes for a transaction.
options.defaultChainId      | `number`        | false    |                | The default chain ID of the connected network

* **Examples**

```
> const { Conflux } = require('js-conflux-sdk');> const cfx = new Conflux({url:'http://testnet-jsonrpc.conflux-chain.org:12537'});
```

```
> const cfx = new Conflux({     url: 'http://localhost:8000',     defaultGasPrice: 100,     defaultGas: 100000,     defaultStorageLimit: 4096,     defaultChainId: 0,     logger: console,   });
```

## ~~Conflux.prototype.defaultEpoch~~ <a id="Conflux.js/defaultEpoch"></a>

`number,string`

Default epoch number for following methods:- `Conflux.getBalance`- `Conflux.getNextNonce`- `Conflux.getCode`- `Conflux.call`

## ~~Conflux.prototype.defaultGasPrice~~ <a id="Conflux.js/defaultGasPrice"></a>

`number,string`

Default gas price for following methods:- `Conflux.sendTransaction`- `Conflux.call`- `Conflux.estimateGas`

## ~~Conflux.prototype.defaultGas~~ <a id="Conflux.js/defaultGas"></a>

`number,string`

Default gas limit for following methods:- `Conflux.sendTransaction`- `Conflux.call`- `Conflux.estimateGas`

## ~~Conflux.prototype.defaultStorageLimit~~ <a id="Conflux.js/defaultStorageLimit"></a>

`number,string`

Default storage limit for following methods:- `Conflux.sendTransaction`- `Conflux.call`- `Conflux.estimateGas`

## ~~Conflux.prototype.defaultChainId~~ <a id="Conflux.js/defaultChainId"></a>

`number`

Default chain id for following methods:- `Conflux.sendTransaction`- `Conflux.call`- `Conflux.estimateGas`

## Conflux.prototype.setProvider <a id="Conflux.js/setProvider"></a>

Create and set `provider`.

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------------------------
url     | `string` | true     |         | Url of provider to create.
options | `object` | false    |         | Provider constructor options.

* **Returns**

`Object` 

* **Examples**

```
> cfx.provider;   HttpProvider {     url: 'http://testnet-jsonrpc.conflux-chain.org:12537',     timeout: 60000,     ...   }> cfx.setProvider('http://localhost:8000');> cfx.provider;   HttpProvider {     url: 'http://localhost:8000',     timeout: 60000,     ...   }
```

## Conflux.prototype.Account <a id="Conflux.js/Account"></a>

A shout cut for `new Account(privateKey);`

* **Parameters**

Name       | Type            | Required | Default | Description
-----------|-----------------|----------|---------|--------------------------
privateKey | `string,Buffer` | true     |         | See `Account.constructor`

* **Returns**

`Account` 

## Conflux.prototype.Contract <a id="Conflux.js/Contract"></a>

A shout cut for `new Contract(cfx, options);`

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|---------------------------
options | `object` | true     |         | See `Contract.constructor`

* **Returns**

`Contract` 

## Conflux.prototype.close <a id="Conflux.js/close"></a>

close connection.

* **Examples**

```
> cfx.close();
```

## Conflux.prototype.getGasPrice <a id="Conflux.js/getGasPrice"></a>

Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.

* **Returns**

`Promise.<JSBI>` Gas price in drip.

* **Examples**

```
> await cfx.getGasPrice();   "0"
```

## Conflux.prototype.getEpochNumber <a id="Conflux.js/getEpochNumber"></a>

Returns the current epochNumber the client is on.

* **Parameters**

Name        | Type            | Required | Default      | Description
------------|-----------------|----------|--------------|-----------------------------------------
epochNumber | `string,number` | false    | latest_mined | The end epochNumber to count balance of.

* **Returns**

`Promise.<number>` EpochNumber

* **Examples**

```
> await cfx.getEpochNumber();   200109
```

## Conflux.prototype.getLogs <a id="Conflux.js/getLogs"></a>

Gets past logs, matching the given options.

* **Parameters**

Name                | Type                    | Required | Default | Description
--------------------|-------------------------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
options             | `object`                | false    |         |
options.fromEpoch   | `string,number`         | false    |         | The number of the start block(>=), 'latest_mined' or 'latest_state'.
options.toEpoch     | `string,number`         | false    |         | The number of the stop block(<=), 'latest_mined' or 'latest_state'.
options.blockHashes | `Array.<string>`        | false    |         | The block hash list
options.address     | `string,Array.<string>` | false    |         | An address or a list of addresses to only get logs from particular account(s).
options.topics      | `array`                 | false    |         | An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x12...']. You can also pass an array for each topic with options for that topic e.g. [null, ['option1', 'option2']]
options.limit       | `number`                | false    |         | Limit log number.

* **Returns**

`Promise.<LogIterator>` Array of log objects.- `string` address: Address this event originated from.- `string[]` topics: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the event.- `string` data: The data containing non-indexed log parameter.- `string` type: TODO- `boolean` removed: TODO- `number` epochNumber: The epochNumber this log was created in. null when still pending.- `string` blockHash: Hash of the block this event was created in. null when it’s still pending.- `string` transactionHash: Hash of the transaction this event was created in.- `string` transactionIndex: Integer of the transaction’s index position the event was created in.- `number` logIndex: Integer of the event index position in the block.- `number` transactionLogIndex: Integer of the event index position in the transaction.

* **Examples**

```
> await cfx.getLogs({      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      fromEpoch: 0,      toEpoch: 'latest_mined',      limit: 1,      topics: [        '0xb818399ffd68e821c34de8d5fbc5aeda8456fdb9296fc1b02bf6245ade7ebbd4',        '0x0000000000000000000000001ead8630345121d19ee3604128e5dc54b36e8ea6'      ]    });   [   {      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      blockHash: '0x701afee0ffc49aaebadf0e6618b6ec1715d31e7aa639e2e00dc8df10994e0283',      data: '0x',      epochNumber: 542556,      logIndex: 0,      removed: false,      topics: [        '0xb818399ffd68e821c34de8d5fbc5aeda8456fdb9296fc1b02bf6245ade7ebbd4',        '0x0000000000000000000000001ead8630345121d19ee3604128e5dc54b36e8ea6'      ],      transactionHash: '0x5a301d2c342709d7de9da24bd096ab3754ea328b016d85ab3410d375616f5d0d',      transactionIndex: 0,      transactionLogIndex: 0,      type: 'mined'     },   ]
```

```
> logIter = cfx.getLogs({      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      fromEpoch: 'latest_mined',      limit: 2,      })> await logIter.next({threshold: 0.01, delta: 1000});   {      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      ...   }> await logIter.next();   {      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      ...   }> await logIter.next();   undefined
```

```
> logIter = cfx.getLogs({      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      fromEpoch: 'latest_mined',      limit: 2,      })> for await (const log of iter) {       console.log(log);     }   {      address: '0xbd72de06cd4a94ad31ed9303cf32a2bccb82c404',      ...   }   ...
```

## Conflux.prototype.getBalance <a id="Conflux.js/getBalance"></a>

Get the balance of an address at a given epochNumber.

* **Parameters**

Name        | Type            | Required | Default           | Description
------------|-----------------|----------|-------------------|-----------------------------------------
address     | `string`        | true     |                   | The address to get the balance of.
epochNumber | `string,number` | false    | this.defaultEpoch | The end epochNumber to count balance of.

* **Returns**

`Promise.<JSBI>` Address balance number in drip.

* **Examples**

```
> let balance = await cfx.getBalance("0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b");> balance;   1793636034970586632n> balance = await cfx.getBalance("0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b", 0);> balance.toString(10);   "0"
```

## Conflux.prototype.getNextNonce <a id="Conflux.js/getNextNonce"></a>

Get the address next transaction nonce.

* **Parameters**

Name        | Type            | Required | Default           | Description
------------|-----------------|----------|-------------------|-----------------------------------------------------
address     | `string`        | true     |                   | The address to get the numbers of transactions from.
epochNumber | `string,number` | false    | this.defaultEpoch | The end epochNumber to count transaction of.

* **Returns**

`Promise.<number>` 

* **Examples**

```
> await cfx.getNextNonce("0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b");   61> await cfx.getNextNonce("0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b", 0);   0
```

## Conflux.prototype.getBlockByEpochNumber <a id="Conflux.js/getBlockByEpochNumber"></a>

Get the epochNumber pivot block info.

* **Parameters**

Name        | Type            | Required | Default | Description
------------|-----------------|----------|---------|--------------------------------------------------------------
epochNumber | `string,number` | true     |         | EpochNumber or string in ["latest_state", "latest_mined"]
detail      | `boolean`       | false    | false   | `true` return transaction object, `false` return TxHash array

* **Returns**

`Promise.<(object|null)>` The block info (same as `getBlockByHash`).

* **Examples**

```
> await cfx.getBlockByEpochNumber(449);   {     hash: '0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40',     ...   }
```

## Conflux.prototype.getBlocksByEpochNumber <a id="Conflux.js/getBlocksByEpochNumber"></a>

Get block hash array of a epochNumber.

* **Parameters**

Name        | Type            | Required | Default | Description
------------|-----------------|----------|---------|----------------------------------------------------------
epochNumber | `string,number` | true     |         | EpochNumber or string in ["latest_state", "latest_mined"]

* **Returns**

`Promise.<Array.<string>>` Block hash array, last one is the pivot block hash of this epochNumber.

* **Examples**

```
> await cfx.getBlocksByEpochNumber(0);   ['0x2da120ad267319c181b12136f9e36be9fba59e0d818f6cc789f04ee937b4f593']> await cfx.getBlocksByEpochNumber(449);   [   '0x3d8b71208f81fb823f4eec5eaf2b0ec6b1457d381615eff2fbe24605ea333c39',   '0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40'   ]
```

## Conflux.prototype.getBestBlockHash <a id="Conflux.js/getBestBlockHash"></a>

> TODO

* **Returns**

`Promise.<string>` 

* **Examples**

```
> await cfx.getBestBlockHash();   "0x43ddda130fff8539b9f3c431aa1b48e021b3744aacd224cbd4bcdb64373f3dd5"
```

## Conflux.prototype.getBlockByHash <a id="Conflux.js/getBlockByHash"></a>

Returns a block matching the block hash.

* **Parameters**

Name      | Type      | Required | Default | Description
----------|-----------|----------|---------|--------------------------------------------------------------
blockHash | `string`  | true     |         | The hash of block to be get.
detail    | `boolean` | false    | false   | `true` return transaction object, `false` return TxHash array

* **Returns**

`Promise.<(object|null)>` Block info object.- `string` miner: The address of the beneficiary to whom the mining rewards were given.- `string|null` hash: Hash of the block. `null` when its pending block.- `string` parentHash: Hash of the parent block.- `string[]` refereeHashes: Array of referee hashes.- `number|null` epochNumber: The current block epochNumber in the client's view. `null` when it's not in best block's past set.- `boolean|null` stable: If the block stable or not. `null` for pending stable.- `string` nonce: Hash of the generated proof-of-work. `null` when its pending block.- `number` gas: The maximum gas allowed in this block.- `string` difficulty: Integer string of the difficulty for this block.- `number` height: The block heights. `null` when its pending block.- `number` size: Integer the size of this block in bytes.- `number` blame: 0 if there's nothing to blame; k if the block is blaming on the state info of its k-th ancestor.- `boolean` adaptive: If the block's weight adaptive or not.- `number` timestamp: The unix timestamp for when the block was collated.- `string` transactionsRoot: The hash of the transactions of the block.- `string[]` transactions: Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.- `string` deferredLogsBloomHash: The hash of the deferred block's log bloom filter- `string` deferredReceiptsRoot: The hash of the receipts of the block after deferred execution.- `string` deferredStateRoot: The root of the final state trie of the block after deferred execution.- `object` deferredStateRootWithAux: Information of deferred state root

* **Examples**

```
> await cfx.getBlockByHash('0xc6fd0c924b1bb2a828d622b46bad4c3806bc1b778f545adb457c5de0aedd0e80');   {      epochNumber: 231939,      height: 231939,      size: 384,      timestamp: 1578972801,      gasLimit: 3000000000n,      difficulty: 29649377n,      transactions: [        '0x62c94c660f6ae9191bd3ff5e6c078015f84a3ad3f22e14c97f3b1117549b8530'      ],      stable: true,      adaptive: false,      blame: 0,      deferredLogsBloomHash: '0xd397b3b043d87fcd6fad1291ff0bfd16401c274896d8c63a923727f077b8e0b5',      deferredReceiptsRoot: '0x959684cc863003d5ac5cb31bcf5baf7e1b4fc60963fcc36fbc1bf4394a0e2e3c',      deferredStateRoot: '0xa930f70fc49e1ab5441031775138817ff951421fad1298b69cda26a10f1fe2b9',      hash: '0xc6fd0c924b1bb2a828d622b46bad4c3806bc1b778f545adb457c5de0aedd0e80',      miner: '0x0000000000000000000000000000000000000014',      nonce: '0xd7adc50635950329',      parentHash: '0xd601491dc9e0f80ceccbf0142490fcb47a4e1801d6fcea34119ffc338b59712c',      refereeHashes: [        '0x6826206c6eaa60a6950182f90d2a608c07c7af6802131204f7365c1e96b1f85c'      ],      transactionsRoot: '0xe26c8940951305914fa69b0a8e431255962cfe95f2481283ec08437eceec03e2'    }
```

```
> await cfx.getBlockByHash('0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40', true);   {    hash: '0xc6fd0c924b1bb2a828d622b46bad4c3806bc1b778f545adb457c5de0aedd0e80',    transactions: [      {        nonce: 1,        value: 0n,        gasPrice: 10n,        gas: 10000000n,        v: 1,        transactionIndex: 0,        status: 0,        blockHash: '0xc6fd0c924b1bb2a828d622b46bad4c3806bc1b778f545adb457c5de0aedd0e80',        contractCreated: null,        data: '0x47e7ef2400000000000000000000000099b52de54f2f922fbd6e46d99654d2063bd7f0dc00000000000000000000000000000000000000000000000000000000000003e8',        from: '0x99b52de54f2f922fbd6e46d99654d2063bd7f0dc',        hash: '0x62c94c660f6ae9191bd3ff5e6c078015f84a3ad3f22e14c97f3b1117549b8530',        r: '0xdc383e4afb5b389e4074e6d4acbb847fd0908bbca60602d66e60169f1340630',        s: '0x14efbc60c095b507609639b219d233418a7fc7ee835902e69e1735897b45fb38',        to: '0x28d995f3818426dbbe8e357cc1cdb67be043b0df'      }    ],    ...   }
```

## Conflux.prototype.getBlockByHashWithPivotAssumption <a id="Conflux.js/getBlockByHashWithPivotAssumption"></a>

Get block by `blockHash` if pivot block of `epochNumber` is `pivotBlockHash`.

* **Parameters**

Name           | Type     | Required | Default | Description
---------------|----------|----------|---------|----------------------------------------------------------------
blockHash      | `string` | true     |         | Block hash which epochNumber expect to be `epochNumber`.
pivotBlockHash | `string` | true     |         | Block hash which expect to be the pivot block of `epochNumber`.
epochNumber    | `number` | true     |         | EpochNumber or string in ["latest_state", "latest_mined"]

* **Returns**

`Promise.<object>` The block info (same as `getBlockByHash`).

* **Examples**

```
> await cfx.getBlockByHashWithPivotAssumption(   '0x3d8b71208f81fb823f4eec5eaf2b0ec6b1457d381615eff2fbe24605ea333c39',   '0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40'   449,   );   {     hash: '0x3d8b71208f81fb823f4eec5eaf2b0ec6b1457d381615eff2fbe24605ea333c39',     ...   }
```

## Conflux.prototype.getTransactionByHash <a id="Conflux.js/getTransactionByHash"></a>

Returns a transaction matching the given transaction hash.

* **Parameters**

Name   | Type     | Required | Default | Description
-------|----------|----------|---------|----------------------
txHash | `string` | true     |         | The transaction hash.

* **Returns**

`Promise.<(object|null)>` Transaction info object- `string` blockHash: Hash of the block where this transaction was in and got executed. `null` when its pending.- `number` transactionIndex: Integer of the transactions index position in the block.- `string` hash: Hash of the transaction.- `number` nonce: The number of transactions made by the sender prior to this one.- `string` from: Address of the sender.- `string` to: Address of the receiver. null when its a contract creation transaction.- `string` value: Value transferred in Drip.- `string` data: The data send along with the transaction.- `number` gas: Gas provided by the sender.- `number` gasPrice: Gas price provided by the sender in Drip.- `string` status: '0x0' successful execution; '0x1' exception happened but nonce still increased; '0x2' exception happened and nonce didn't increase.- `string|null` contractCreated: The contract address created, if the transaction was a contract creation, otherwise null.- `string` r: ECDSA signature r- `string` s: ECDSA signature s- `string` v: ECDSA recovery id

* **Examples**

```
> await cfx.getTransactionByHash('0xbe007c3eca92d01f3917f33ae983f40681182cf618defe75f490a65aac016914');   {      "blockHash": "0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40",      "transactionIndex": 0,      "hash": "0xbe007c3eca92d01f3917f33ae983f40681182cf618defe75f490a65aac016914",      "nonce": 0,      "from": "0xa70ddf9b9750c575db453eea6a041f4c8536785a",      "to": "0x63f0a574987f6893e068a08a3fb0e63aec3785e6",      "value": "1000000000000000000"      "data": "0x",      "gas": 21000,      "gasPrice": "819",      "status": 0,      "contractCreated": null,      "r": "0x88e43a02a653d5895ffa5495718a5bd772cb157776108c5c22cee9beff890650",      "s": "0x24e3ba1bb0d11c8b1da8d969ecd0c5e2372326a3de71ba1231c876c0efb2c0a8",      "v": 0,    }
```

## Conflux.prototype.getTransactionReceipt <a id="Conflux.js/getTransactionReceipt"></a>

Returns the receipt of a transaction by transaction hash.> Note: The receipt is not available for pending transactions and returns null.

* **Parameters**

Name   | Type     | Required | Default | Description
-------|----------|----------|---------|----------------------
txHash | `string` | true     |         | The transaction hash.

* **Returns**

`Promise.<(object|null)>` - `number` outcomeStatus: `0`: the transaction was successful, `1`: EVM reverted the transaction.- `string` stateRoot: The state root of transaction execution.- `number` epochNumber: EpochNumber where this transaction was in.- `string` blockHash: Hash of the block where this transaction was in.- `string` transactionHash: Hash of the transaction.- `number` index: Integer of the transactions index position in the block.- `string` from: Address of the sender.- `string` to: Address of the receiver. null when its a contract creation transaction.- `string|null` contractCreated: The contract address created, if the transaction was a contract creation, otherwise null.- `number` gasUsed: The amount of gas used by this specific transaction alone.- `[object]` logs: Array of log objects, which this transaction generated.- `[string]` logs[].address: The address of the contract executing at the point of the `LOG` operation.- `[string]` logs[].topics: The topics associated with the `LOG` operation.- `[string]` logs[].data: The data associated with the `LOG` operation.- `string` logsBloom: Log bloom.

* **Examples**

```
> await cfx.getTransactionReceipt('0xbe007c3eca92d01f3917f33ae983f40681182cf618defe75f490a65aac016914');   {    "outcomeStatus": 0,    "stateRoot": "0x3854f64be6c124dffd0ddca57270846f0f43a119ea681b4e5d022ade537d9f07",    "epochNumber": 449,    "blockHash": "0x59339ff28bc235cceac9fa588ebafcbf61316e6a8c86c7a1d7239b9445d98e40",    "transactionHash": "0xbe007c3eca92d01f3917f33ae983f40681182cf618defe75f490a65aac016914"    "index": 0,    "from": "0xa70ddf9b9750c575db453eea6a041f4c8536785a",    "to": "0x63f0a574987f6893e068a08a3fb0e63aec3785e6",    "contractCreated": null,    "gasUsed": 21000,    "logs": [],    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",   }
```

## Conflux.prototype.sendTransaction <a id="Conflux.js/sendTransaction"></a>

Creates new message call transaction or a contract creation, if the data field contains code.> FIXME: rpc `cfx_sendTransaction` not implement yet.> NOTE: if `from` options is a instance of `Account`, this methods will sign by account local and send by `cfx_sendRawTransaction`, else send by `cfx_sendTransaction`

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|--------------------
options | `object` | true     |         | See `format.sendTx`

* **Returns**

`Promise.<PendingTransaction>` The PendingTransaction object.

* **Examples**

```
> // TODO call with address, need `cfx_sendTransaction`
```

```
> const account = cfx.Account(KEY);> await cfx.sendTransaction({      from: account, // from account instance will sign by local.      to: ADDRESS,      value: Drip.fromCFX(0.023),    });   "0x459473cb019bb59b935abf5d6e76d66564aafa313efd3e337b4e1fa6bd022cc9"
```

```
> await cfx.sendTransaction({      from: account,      to: account, // to account instance      value: Drip.fromCFX(0.03),    }).get(); // send then get transaction by hash.   {    "blockHash": null,    "transactionIndex": null,    "hash": "0xf2b258b49d33dd22419526e168ebb79b822889cf8317ce1796e816cce79e49a2",    "contractCreated": null,    "data": "0x",    "from": "0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b",    "nonce": 111,    "status": null,    "to": "0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b",    "value": "30000000000000000",    ...   }
```

```
> const promise = cfx.sendTransaction({ // Not await here, just get promise      from: account1,      to: ADDRESS1,      value: Drip.fromCFX(0.007),    });> await promise; // transaction   "0x91fbdfb33f3a585f932c627abbe268c7e3aedffc1633f9338f9779c64702c688"> await promise.get(); // get transaction   {    "blockHash": null,    "transactionIndex": null,    "hash": "0x91fbdfb33f3a585f932c627abbe268c7e3aedffc1633f9338f9779c64702c688",    ...   }> await promise.mined(); // wait till transaction mined   {    "blockHash": "0xe9b22ce311003e26c7330ac54eea9f8afea0ffcd4905828f27c9e2c02f3a00f7",    "transactionIndex": 0,    "hash": "0x91fbdfb33f3a585f932c627abbe268c7e3aedffc1633f9338f9779c64702c688",    ...   }> await promise.executed(); // wait till transaction executed in right status. and return it's receipt.   {    "blockHash": "0xe9b22ce311003e26c7330ac54eea9f8afea0ffcd4905828f27c9e2c02f3a00f7",    "index": 0,    "transactionHash": "0x91fbdfb33f3a585f932c627abbe268c7e3aedffc1633f9338f9779c64702c688",    "outcomeStatus": 0,    ...   }> await promise.confirmed(); // wait till transaction risk coefficient '<' threshold.   {    "blockHash": "0xe9b22ce311003e26c7330ac54eea9f8afea0ffcd4905828f27c9e2c02f3a00f7",    "index": 0,    "transactionHash": "0x91fbdfb33f3a585f932c627abbe268c7e3aedffc1633f9338f9779c64702c688",    "outcomeStatus": 0,    ...   }
```

## Conflux.prototype.sendRawTransaction <a id="Conflux.js/sendRawTransaction"></a>

Signs a transaction. This account needs to be unlocked.

* **Parameters**

Name | Type            | Required | Default | Description
-----|-----------------|----------|---------|------------------------
hex  | `string,Buffer` | true     |         | Raw transaction string.

* **Returns**

`Promise.<PendingTransaction>` The PendingTransaction object. See `sendTransaction`

* **Examples**

```
> await cfx.sendRawTransaction('0xf85f800382520894bbd9e9b...');   "0xbe007c3eca92d01f3917f33ae983f40681182cf618defe75f490a65aac016914"
```

## Conflux.prototype.getCode <a id="Conflux.js/getCode"></a>

Get the code at a specific address.

* **Parameters**

Name        | Type            | Required | Default           | Description
------------|-----------------|----------|-------------------|----------------------------------------------------------
address     | `string`        | true     |                   | The contract address to get the code from.
epochNumber | `string,number` | false    | this.defaultEpoch | EpochNumber or string in ["latest_state", "latest_mined"]

* **Returns**

`Promise.<string>` Code hex string

* **Examples**

```
> await cfx.getCode('0xb385b84f08161f92a195953b980c8939679e906a');   "0x6080604052348015600f57600080fd5b506004361060325760003560e01c806306661abd1460375780638..."
```

## Conflux.prototype.call <a id="Conflux.js/call"></a>

Executes a message call transaction, which is directly executed in the VM of the node,but never mined into the block chain.

* **Parameters**

Name        | Type            | Required | Default           | Description
------------|-----------------|----------|-------------------|----------------------------------------
options     | `object`        | true     |                   | See `format.sendTx`
epochNumber | `string,number` | false    | this.defaultEpoch | The end epochNumber to execute call of.

* **Returns**

`Promise.<string>` Hex bytes the contract method return.

## Conflux.prototype.estimateGasAndCollateral <a id="Conflux.js/estimateGasAndCollateral"></a>

Executes a message call or transaction and returns the amount of the gas used.

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------------------
options | `object` | true     |         | See `format.estimateTx`

* **Returns**

`Promise.<object>` The gas used and storage occupied for the simulated call/transaction.- `BigInt` gasUsed: The gas used.- `BigInt` storageCollateralized: The storage collateralized in Byte.

----------------------------------------

## Message <a id="Message.js/Message"></a>

*no description*

## Message.sign <a id="Message.js/sign"></a>

Signs the hash with the privateKey.

* **Parameters**

Name        | Type            | Required | Default | Description
------------|-----------------|----------|---------|------------
privateKey  | `string,Buffer` | true     |         |
messageHash | `string,Buffer` | true     |         |

* **Returns**

`string` The signature as hex string.

* **Examples**

```
> Message.sign(   '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', // privateKey   '0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',   )   "0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01"
```

## Message.recover <a id="Message.js/recover"></a>

Recovers the signers publicKey from the signature.

* **Parameters**

Name        | Type            | Required | Default | Description
------------|-----------------|----------|---------|------------
signature   | `string,Buffer` | true     |         |
messageHash | `string,Buffer` | true     |         |

* **Returns**

`string` The publicKey as hex string.

* **Examples**

```
> Message.recover(   '0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01',   '0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',   )   "0x4646ae5047316b4230d0086c8acec687f00b1cd9d1dc634f6cb358ac0a9a8ffffe77b4dd0a4bfb95851f3b7355c781dd60f8418fc8a65d14907aff47c903a559"
```

## Message.prototype.constructor <a id="Message.js/constructor"></a>

*no description*

* **Parameters**

Name    | Type     | Required | Default | Description
--------|----------|----------|---------|------------
message | `string` | true     |         |

* **Returns**

`Message` 

* **Examples**

```
> msg = new Message('Hello World');   Message {      message: 'Hello World',    }> msg.sign('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef');   Message {      message: 'Hello World',      signature: '0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01'    }> msg.signature   "0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01"> msg.hash   "0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba"> msg.from   "0x1cad0b19bb29d4674531d6f115237e16afce377c"> msg.r   "0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c"> msg.s   "0x29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f"> msg.v   1
```

## Message.prototype.hash (getter) <a id="Message.js/hash (getter)"></a>

Getter of message hash include signature.> Note: calculate every time.

* **Returns**

`string` 

## Message.prototype.from (getter) <a id="Message.js/from (getter)"></a>

Getter of sender address.> Note: calculate every time.

* **Returns**

`string,undefined` If ECDSA recover success return address, else return undefined.

## Message.prototype.sign <a id="Message.js/sign"></a>

Sign message and set 'r','s','v' and 'hash'.

* **Parameters**

Name       | Type     | Required | Default | Description
-----------|----------|----------|---------|------------------------
privateKey | `string` | true     |         | Private key hex string.

* **Returns**

`Message` 

----------------------------------------

## Transaction <a id="Transaction.js/Transaction"></a>

*no description*

## Transaction.prototype.constructor <a id="Transaction.js/constructor"></a>

Create a transaction.

* **Parameters**

Name                 | Type            | Required | Default | Description
---------------------|-----------------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------
options              | `object`        | true     |         |
options.nonce        | `string,number` | true     |         | This allows to overwrite your own pending transactions that use the same nonce.
options.gasPrice     | `string,number` | true     |         | The price of gas for this transaction in drip.
options.gas          | `string,number` | true     |         | The amount of gas to use for the transaction (unused gas is refunded).
options.to           | `string`        | false    |         | The destination address of the message, left undefined for a contract-creation transaction.
options.value        | `string,number` | false    | 0       | The value transferred for the transaction in drip, also the endowment if it’s a contract-creation transaction.
options.storageLimit | `string,number` | true     |         | TODO
options.epochHeight  | `string,number` | true     |         | TODO
options.chainId      | `string,number` | false    | 0       | TODO
options.data         | `string,Buffer` | false    | '0x'    | Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
options.r            | `string,Buffer` | false    |         | ECDSA signature r
options.s            | `string,Buffer` | false    |         | ECDSA signature s
options.v            | `number`        | false    |         | ECDSA recovery id

* **Returns**

`Transaction` 

## Transaction.prototype.hash (getter) <a id="Transaction.js/hash (getter)"></a>

Getter of transaction hash include signature.> Note: calculate every time.

* **Returns**

`string,undefined` If transaction has r,s,v return hex string, else return undefined.

## Transaction.prototype.from (getter) <a id="Transaction.js/from (getter)"></a>

Getter of sender address.> Note: calculate every time.

* **Returns**

`string,undefined` If ECDSA recover success return address, else return undefined.

## Transaction.prototype.sign <a id="Transaction.js/sign"></a>

Sign transaction and set 'r','s','v'.

* **Parameters**

Name       | Type     | Required | Default | Description
-----------|----------|----------|---------|------------------------
privateKey | `string` | true     |         | Private key hex string.

* **Returns**

`Transaction` 

## Transaction.prototype.recover <a id="Transaction.js/recover"></a>

Recover public key from signed Transaction.

* **Returns**

`string` 

## Transaction.prototype.encode <a id="Transaction.js/encode"></a>

Encode rlp.

* **Parameters**

Name             | Type      | Required | Default | Description
-----------------|-----------|----------|---------|-----------------------------------------
includeSignature | `boolean` | false    | false   | Whether or not to include the signature.

* **Returns**

`Buffer` 

## Transaction.prototype.serialize <a id="Transaction.js/serialize"></a>

Get the raw tx hex string.

* **Returns**

`string` Hex string

----------------------------------------

## Contract <a id="contract/Contract.js/Contract"></a>

Contract with all its methods and events defined in its abi.

## Contract.prototype.constructor <a id="contract/Contract.js/constructor"></a>

*no description*

* **Parameters**

Name             | Type      | Required | Default | Description
-----------------|-----------|----------|---------|-----------------------------------------------------------------------------------------------------
cfx              | `Conflux` | true     |         | Conflux instance.
options          | `object`  | true     |         |
options.abi      | `array`   | true     |         | The json interface for the contract to instantiate
options.address  | `string`  | false    |         | The address of the smart contract to call, can be added later using `contract.address = '0x1234...'`
options.bytecode | `string`  | false    |         | The byte code of the contract, can be added later using `contract.constructor.code = '0x1234...'`

* **Returns**

`object` 

* **Examples**

```
> const contract = cfx.Contract({ abi, bytecode });> contract.constructor.bytecode; // input code   "0x6080604052600080..."
```

```
> const contract = cfx.Contract({ abi, address });> contract.address   "0xc3ed1a06471be1d3bcd014051fbe078387ec0ad8"> await contract.count(); // call a method without parameter, get decoded return value.   100n> await contract.inc(1); // call a method with parameters, get decoded return value.   101n> await contract.count().call({ from: account }); // call a method from a account.   100n> await contract.count().estimateGas();   21655n> await contract.count().estimateGas({ from: ADDRESS, nonce: 68 }); // if from is a address string, nonce is required   21655n// send transaction from account instance, then wait till confirmed, and get receipt.> await contract.inc(1)   .sendTransaction({ from: account1 })   .confirmed({ threshold: 0.01, timeout: 30 * 1000 });   {     "blockHash": "0xba948c8925f6d7f14faf540c3b9e6d24d33c78168b2dd81a6021a50949d9f0d7",     "index": 0,     "transactionHash": "0x8a5f48c2de0f1bdacfe90443810ad650e4b327a0d19ce49a53faffb224883e42",     "outcomeStatus": 0,     ...   }> tx = await cfx.getTransactionByHash('0x8a5f48c2de0f1bdacfe90443810ad650e4b327a0d19ce49a53faffb224883e42');> await contract.abi.decodeData(tx.data)   {      name: 'inc',      fullName: 'inc(uint256 num)',      type: 'inc(uint256)',      signature: '0x7f98a45e',      array: [ JSBI.BigInt(101) ],      object: { num: JSBI.BigInt(101) }   }> await contract.count(); // data in block chain changed by transaction.   JSBI.BigInt(101)> logs = await contract.SelfEvent(account1.address).getLogs()   [   {      address: '0xc3ed1a06471be1d3bcd014051fbe078387ec0ad8',      blockHash: '0xc8cb678891d4914aa66670e3ebd7a977bb3e38d2cdb1e2df4c0556cb2c4715a4',      data: '0x000000000000000000000000000000000000000000000000000000000000000a',      epochNumber: 545896,      logIndex: 0,      removed: false,      topics: [        '0xc4c01f6de493c58245fb681341f3a76bba9551ce81b11cbbb5d6d297844594df',        '0x000000000000000000000000bbd9e9be525ab967e633bcdaeac8bd5723ed4d6b'      ],      transactionHash: '0x9100f4f84f711aa358e140197e9d2e5aab1f99751bc26a660d324a8282fc54d0',      transactionIndex: 0,      transactionLogIndex: 0,      type: 'mined',      params: [ '0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b', '10' ]     }   ]> contract.abi.decodeLog(logs[0]);   {      name: 'SelfEvent',      fullName: 'SelfEvent(address indexed sender, uint256 current)',      type: 'SelfEvent(address,uint256))',      signature: '0xc4c01f6de493c58245fb681341f3a76bba9551ce81b11cbbb5d6d297844594df',      array: [ '0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b', JSBI.BigInt(100) ],      object: {        sender: '0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b',        current: JSBI.BigInt(100),      },    }
```
