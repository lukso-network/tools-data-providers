export default {
  abi: [
    {
      type: "function",
      name: "getData",
      inputs: [
        {
          name: "dataKey",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "dataValue",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getDataBatch",
      inputs: [
        {
          name: "dataKeys",
          type: "bytes32[]",
          internalType: "bytes32[]",
        },
      ],
      outputs: [
        {
          name: "dataValues",
          type: "bytes[]",
          internalType: "bytes[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "setData",
      inputs: [
        {
          name: "dataKey",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "dataValue",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "setDataBatch",
      inputs: [
        {
          name: "dataKeys",
          type: "bytes32[]",
          internalType: "bytes32[]",
        },
        {
          name: "dataValues",
          type: "bytes[]",
          internalType: "bytes[]",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "DataChanged",
      inputs: [
        {
          name: "dataKey",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "dataValue",
          type: "bytes",
          indexed: false,
          internalType: "bytes",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "ERC725Y_DataKeysValuesEmptyArray",
      inputs: [],
    },
    {
      type: "error",
      name: "ERC725Y_DataKeysValuesLengthMismatch",
      inputs: [],
    },
    {
      type: "error",
      name: "ERC725Y_MsgValueDisallowed",
      inputs: [],
    },
    {
      type: "error",
      name: "LSP4TokenNameNotEditable",
      inputs: [],
    },
    {
      type: "error",
      name: "LSP4TokenSymbolNotEditable",
      inputs: [],
    },
    {
      type: "error",
      name: "LSP4TokenTypeNotEditable",
      inputs: [],
    },
    {
      type: "error",
      name: "OwnableCallerNotTheOwner",
      inputs: [
        {
          name: "callerAddress",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "OwnableCannotSetZeroAddressAsOwner",
      inputs: [],
    },
  ],
  bytecode: {
    object: "0x",
    sourceMap: "",
    linkReferences: {},
  },
  deployedBytecode: {
    object: "0x",
    sourceMap: "",
    linkReferences: {},
  },
  methodIdentifiers: {
    "getData(bytes32)": "54f6127f",
    "getDataBatch(bytes32[])": "dedff9c6",
    "owner()": "8da5cb5b",
    "renounceOwnership()": "715018a6",
    "setData(bytes32,bytes)": "7f23690c",
    "setDataBatch(bytes32[],bytes[])": "97902421",
    "supportsInterface(bytes4)": "01ffc9a7",
    "transferOwnership(address)": "f2fde38b",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.24+commit.e11b9ed9"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"ERC725Y_DataKeysValuesEmptyArray","type":"error"},{"inputs":[],"name":"ERC725Y_DataKeysValuesLengthMismatch","type":"error"},{"inputs":[],"name":"ERC725Y_MsgValueDisallowed","type":"error"},{"inputs":[],"name":"LSP4TokenNameNotEditable","type":"error"},{"inputs":[],"name":"LSP4TokenSymbolNotEditable","type":"error"},{"inputs":[],"name":"LSP4TokenTypeNotEditable","type":"error"},{"inputs":[{"internalType":"address","name":"callerAddress","type":"address"}],"name":"OwnableCallerNotTheOwner","type":"error"},{"inputs":[],"name":"OwnableCannotSetZeroAddressAsOwner","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"dataKey","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"dataValue","type":"bytes"}],"name":"DataChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"bytes32","name":"dataKey","type":"bytes32"}],"name":"getData","outputs":[{"internalType":"bytes","name":"dataValue","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"dataKeys","type":"bytes32[]"}],"name":"getDataBatch","outputs":[{"internalType":"bytes[]","name":"dataValues","type":"bytes[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"dataKey","type":"bytes32"},{"internalType":"bytes","name":"dataValue","type":"bytes"}],"name":"setData","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"dataKeys","type":"bytes32[]"},{"internalType":"bytes[]","name":"dataValues","type":"bytes[]"}],"name":"setDataBatch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"author":"Matthew Stevens","details":"Standard Implementation of the LSP4 standard.","errors":{"ERC725Y_DataKeysValuesEmptyArray()":[{"details":"Reverts when one of the array parameter provided to {setDataBatch} function is an empty array."}],"ERC725Y_DataKeysValuesLengthMismatch()":[{"details":"Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the {setDataBatch} function."}],"ERC725Y_MsgValueDisallowed()":[{"details":"Reverts when sending value to the {setData} or {setDataBatch} function."}],"LSP4TokenNameNotEditable()":[{"details":"Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed / initialized. The `LSP4TokenName` data key is located inside the ERC725Y data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed / initialized."}],"LSP4TokenSymbolNotEditable()":[{"details":"Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed / initialized. The `LSP4TokenSymbol` data key is located inside the ERC725Y data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed / initialized."}],"LSP4TokenTypeNotEditable()":[{"details":"Reverts when trying to edit the data key `LSP4TokenType` after the digital asset contract has been deployed / initialized. The `LSP4TokenType` data key is located inside the ERC725Y data key-value store of the digital asset contract. It can be set only once inside the constructor / initializer when the digital asset contract is being deployed / initialized."}],"OwnableCallerNotTheOwner(address)":[{"details":"Reverts when only the owner is allowed to call the function.","params":{"callerAddress":"The address that tried to make the call."}}],"OwnableCannotSetZeroAddressAsOwner()":[{"details":"Reverts when trying to set `address(0)` as the contract owner when deploying the contract, initializing it or transferring ownership of the contract."}]},"events":{"DataChanged(bytes32,bytes)":{"details":"Emitted when data at a specific `dataKey` was changed to a new value `dataValue`.","params":{"dataKey":"The data key for which a bytes value is set.","dataValue":"The value to set for the given data key."}}},"kind":"dev","methods":{"getData(bytes32)":{"details":"Get in the ERC725Y storage the bytes data stored at a specific data key `dataKey`.","params":{"dataKey":"The data key for which to retrieve the value."},"returns":{"dataValue":"The bytes value stored under the specified data key."}},"getDataBatch(bytes32[])":{"details":"Get in the ERC725Y storage the bytes data stored at multiple data keys `dataKeys`.","params":{"dataKeys":"The array of keys which values to retrieve"},"returns":{"dataValues":"The array of data stored at multiple keys"}},"owner()":{"details":"Returns the address of the current owner."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"setData(bytes32,bytes)":{"custom:events":"{DataChanged} event.","custom:requirements":"- SHOULD only be callable by the {owner}.","custom:warning":"**Note for developers:** despite the fact that this function is set as `payable`, the function is not intended to receive value (= native tokens). **An additional check has been implemented to ensure that `msg.value` sent was equal to 0**. If you want to allow this function to receive value in your inheriting contract, this function can be overriden to remove this check.","details":"Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.","params":{"dataKey":"The data key for which to set a new value.","dataValue":"The new bytes value to set."}},"setDataBatch(bytes32[],bytes[])":{"custom:events":"{DataChanged} event **for each data key/value pair set**.","custom:requirements":"- SHOULD only be callable by the {owner} of the contract.","custom:warning":"**Note for developers:** despite the fact that this function is set as `payable`, the function is not intended to receive value (= native tokens). **An additional check has been implemented to ensure that `msg.value` sent was equal to 0**. If you want to allow this function to receive value in your inheriting contract, this function can be overriden to remove this check.","details":"Batch data setting function that behaves the same as {setData} but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.","params":{"dataKeys":"An array of data keys to set bytes values for.","dataValues":"An array of bytes values to set for each `dataKeys`."}},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"title":"Implementation of a LSP4DigitalAssetMetadata contract that stores the **Token-Metadata** (`LSP4TokenName` and `LSP4TokenSymbol`) in its ERC725Y data store.","version":1},"userdoc":{"events":{"DataChanged(bytes32,bytes)":{"notice":"The following data key/value pair has been changed in the ERC725Y storage: Data key: `dataKey`, data value: `dataValue`."}},"kind":"user","methods":{"getData(bytes32)":{"notice":"Reading the ERC725Y storage for data key `dataKey` returned the following value: `dataValue`."},"getDataBatch(bytes32[])":{"notice":"Reading the ERC725Y storage for data keys `dataKeys` returned the following values: `dataValues`."},"setData(bytes32,bytes)":{"notice":"Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`."},"setDataBatch(bytes32[],bytes[])":{"notice":"Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`."}},"version":1}},"settings":{"compilationTarget":{"lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4DigitalAssetMetadataCore.sol":"LSP4DigitalAssetMetadataCore"},"evmVersion":"paris","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@/=lib/lsp-smart-contracts/node_modules/@/",":@erc725/smart-contracts/=lib/ERC725/implementations/",":@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/",":@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/",":@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/",":@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/",":@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/",":@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/",":@openzeppelin/=lib/openzeppelin/",":@openzeppelin/contracts/=lib/openzeppelin/contracts/",":ERC725/=lib/ERC725/",":ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/",":eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/",":forge-std/=lib/forge-std/src/",":hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/",":hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/",":lsp-smart-contracts/=lib/lsp-smart-contracts/",":openzeppelin/=lib/openzeppelin/",":solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/"]},"sources":{"lib/ERC725/implementations/contracts/ERC725YCore.sol":{"keccak256":"0xe10e15c0ef7ee99bab505723ab6e16a547b09a95b0c95d0064d1459a624a2e7a","license":"Apache-2.0","urls":["bzz-raw://e3b1205b4c8d73d9cc2abea9ec741e44ef3451ddc13875459828bf049bf2ad9b","dweb:/ipfs/Qmf9hVwRf4eDpqLNPS7ZffCsw2sRGsRPmx42VfQBfC3VBb"]},"lib/ERC725/implementations/contracts/constants.sol":{"keccak256":"0x37da1619e580b6af6a68e91b4784f7945ee2344fad3a96b6dfb2592e35fedb60","license":"Apache-2.0","urls":["bzz-raw://fb9436bd587d7b38c532f317dbd4bc5f178b50906b1a5e29adf24908f27b2c47","dweb:/ipfs/QmW2vTCNM7Mr4vW5t9yBK7Zmh1FtaVjPwdAbyFcPNBSZYL"]},"lib/ERC725/implementations/contracts/custom/OwnableUnset.sol":{"keccak256":"0xa9c83adb0239b86c0ff6251a03bc70115470c7ae10eb99276d6dd33636054b36","license":"MIT","urls":["bzz-raw://95a0109837bdffe887b6568b7f9bbde2b20cfd0c4db638805cf61ada5743b24d","dweb:/ipfs/QmYH2erMtqiEYjRznWnc6NbBbwxvy6ArE45jtXYEyWi3Bc"]},"lib/ERC725/implementations/contracts/errors.sol":{"keccak256":"0xaafdb4370450b8874224b3c0b2b712149da97a50c9a47f56e4b654aa57eb87c5","license":"Apache-2.0","urls":["bzz-raw://a4e40b0f64613e5bbd62575facc72d2bcad249595e9397b5bff063dc5a81e757","dweb:/ipfs/QmXx5yDvPxWzKXFYK7HDAbSNDBKRskYLoDwgrThmAimzDL"]},"lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol":{"keccak256":"0xa47c9e3eba0c733a1685b9fa309f753540c89ad2dca73236a2c953e7f5680e7b","license":"CC0-1.0","urls":["bzz-raw://59076395f660838919a2068cb7792c0fa70533642bbc5b4e3cc3cbb2c9ec7b50","dweb:/ipfs/QmQqew3mDuyHCBdd4v1JiwRiKEbzk3LeHchzTHSdyhYg5b"]},"lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4Constants.sol":{"keccak256":"0xdf9b7c688d39a92cb3238136a9f56554245d5ae9b6568dcd6164d0e15c6f56c7","license":"Apache-2.0","urls":["bzz-raw://bb36a427cdfa0f394d2d78014f85152ab383499fc3c3d6285d4b801c656e7c3f","dweb:/ipfs/QmZJehfeWKfHLyZLufhs9u4ZyVztGCUNWXzFgfZSU837vU"]},"lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4DigitalAssetMetadataCore.sol":{"keccak256":"0xc442e52d34bb98acc1494675856b1f1d124af1375d8e23a9bfcc3b6c1865e1fc","license":"Apache-2.0","urls":["bzz-raw://84254359ed929c1991136f9c3e934ddfa74cd85684de6c44cb70afa70d12f837","dweb:/ipfs/QmWfmionUJJYyYDoeSQLGUHhou2sWxhWzwtU5GVjpumiSS"]},"lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4Errors.sol":{"keccak256":"0x3db7fd252ed02ce27686141125c3d65d3ff682a32601e1e8611becd9357a57b5","license":"Apache-2.0","urls":["bzz-raw://5aded62a160ed7f9860996004d1656e8592b3f97d478d8597f8ad6afbe4f34b7","dweb:/ipfs/QmcnmLVt8cmz1iRNaX5c6iNYckRgUXGz8YkjHW9T1KNB5A"]},"lib/openzeppelin/contracts/utils/introspection/ERC165.sol":{"keccak256":"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e","license":"MIT","urls":["bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9","dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"]},"lib/openzeppelin/contracts/utils/introspection/IERC165.sol":{"keccak256":"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c","license":"MIT","urls":["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e","dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"]}},"version":1}',
  metadata: {
    compiler: {
      version: "0.8.24+commit.e11b9ed9",
    },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [],
          type: "error",
          name: "ERC725Y_DataKeysValuesEmptyArray",
        },
        {
          inputs: [],
          type: "error",
          name: "ERC725Y_DataKeysValuesLengthMismatch",
        },
        {
          inputs: [],
          type: "error",
          name: "ERC725Y_MsgValueDisallowed",
        },
        {
          inputs: [],
          type: "error",
          name: "LSP4TokenNameNotEditable",
        },
        {
          inputs: [],
          type: "error",
          name: "LSP4TokenSymbolNotEditable",
        },
        {
          inputs: [],
          type: "error",
          name: "LSP4TokenTypeNotEditable",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "callerAddress",
              type: "address",
            },
          ],
          type: "error",
          name: "OwnableCallerNotTheOwner",
        },
        {
          inputs: [],
          type: "error",
          name: "OwnableCannotSetZeroAddressAsOwner",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dataKey",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "bytes",
              name: "dataValue",
              type: "bytes",
              indexed: false,
            },
          ],
          type: "event",
          name: "DataChanged",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "previousOwner",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
              indexed: true,
            },
          ],
          type: "event",
          name: "OwnershipTransferred",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dataKey",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "getData",
          outputs: [
            {
              internalType: "bytes",
              name: "dataValue",
              type: "bytes",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32[]",
              name: "dataKeys",
              type: "bytes32[]",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "getDataBatch",
          outputs: [
            {
              internalType: "bytes[]",
              name: "dataValues",
              type: "bytes[]",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "function",
          name: "renounceOwnership",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dataKey",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "dataValue",
              type: "bytes",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "setData",
        },
        {
          inputs: [
            {
              internalType: "bytes32[]",
              name: "dataKeys",
              type: "bytes32[]",
            },
            {
              internalType: "bytes[]",
              name: "dataValues",
              type: "bytes[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "setDataBatch",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "transferOwnership",
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "getData(bytes32)": {
            details:
              "Get in the ERC725Y storage the bytes data stored at a specific data key `dataKey`.",
            params: {
              dataKey: "The data key for which to retrieve the value.",
            },
            returns: {
              dataValue: "The bytes value stored under the specified data key.",
            },
          },
          "getDataBatch(bytes32[])": {
            details:
              "Get in the ERC725Y storage the bytes data stored at multiple data keys `dataKeys`.",
            params: {
              dataKeys: "The array of keys which values to retrieve",
            },
            returns: {
              dataValues: "The array of data stored at multiple keys",
            },
          },
          "owner()": {
            details: "Returns the address of the current owner.",
          },
          "renounceOwnership()": {
            details:
              "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.",
          },
          "setData(bytes32,bytes)": {
            "custom:events": "{DataChanged} event.",
            "custom:requirements": "- SHOULD only be callable by the {owner}.",
            "custom:warning":
              "**Note for developers:** despite the fact that this function is set as `payable`, the function is not intended to receive value (= native tokens). **An additional check has been implemented to ensure that `msg.value` sent was equal to 0**. If you want to allow this function to receive value in your inheriting contract, this function can be overriden to remove this check.",
            details:
              "Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.",
            params: {
              dataKey: "The data key for which to set a new value.",
              dataValue: "The new bytes value to set.",
            },
          },
          "setDataBatch(bytes32[],bytes[])": {
            "custom:events":
              "{DataChanged} event **for each data key/value pair set**.",
            "custom:requirements":
              "- SHOULD only be callable by the {owner} of the contract.",
            "custom:warning":
              "**Note for developers:** despite the fact that this function is set as `payable`, the function is not intended to receive value (= native tokens). **An additional check has been implemented to ensure that `msg.value` sent was equal to 0**. If you want to allow this function to receive value in your inheriting contract, this function can be overriden to remove this check.",
            details:
              "Batch data setting function that behaves the same as {setData} but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.",
            params: {
              dataKeys: "An array of data keys to set bytes values for.",
              dataValues:
                "An array of bytes values to set for each `dataKeys`.",
            },
          },
          "supportsInterface(bytes4)": {
            details: "See {IERC165-supportsInterface}.",
          },
          "transferOwnership(address)": {
            details:
              "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.",
          },
        },
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {
          "getData(bytes32)": {
            notice:
              "Reading the ERC725Y storage for data key `dataKey` returned the following value: `dataValue`.",
          },
          "getDataBatch(bytes32[])": {
            notice:
              "Reading the ERC725Y storage for data keys `dataKeys` returned the following values: `dataValues`.",
          },
          "setData(bytes32,bytes)": {
            notice:
              "Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`.",
          },
          "setDataBatch(bytes32[],bytes[])": {
            notice:
              "Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`.",
          },
        },
        version: 1,
      },
    },
    settings: {
      remappings: [
        "@/=lib/lsp-smart-contracts/node_modules/@/",
        "@erc725/smart-contracts/=lib/ERC725/implementations/",
        "@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/",
        "@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/",
        "@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/",
        "@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/",
        "@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/",
        "@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/",
        "@openzeppelin/=lib/openzeppelin/",
        "@openzeppelin/contracts/=lib/openzeppelin/contracts/",
        "ERC725/=lib/ERC725/",
        "ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/",
        "eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/",
        "forge-std/=lib/forge-std/src/",
        "hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/",
        "hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/",
        "lsp-smart-contracts/=lib/lsp-smart-contracts/",
        "openzeppelin/=lib/openzeppelin/",
        "solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4DigitalAssetMetadataCore.sol":
          "LSP4DigitalAssetMetadataCore",
      },
      evmVersion: "paris",
      libraries: {},
    },
    sources: {
      "lib/ERC725/implementations/contracts/ERC725YCore.sol": {
        keccak256:
          "0xe10e15c0ef7ee99bab505723ab6e16a547b09a95b0c95d0064d1459a624a2e7a",
        urls: [
          "bzz-raw://e3b1205b4c8d73d9cc2abea9ec741e44ef3451ddc13875459828bf049bf2ad9b",
          "dweb:/ipfs/Qmf9hVwRf4eDpqLNPS7ZffCsw2sRGsRPmx42VfQBfC3VBb",
        ],
        license: "Apache-2.0",
      },
      "lib/ERC725/implementations/contracts/constants.sol": {
        keccak256:
          "0x37da1619e580b6af6a68e91b4784f7945ee2344fad3a96b6dfb2592e35fedb60",
        urls: [
          "bzz-raw://fb9436bd587d7b38c532f317dbd4bc5f178b50906b1a5e29adf24908f27b2c47",
          "dweb:/ipfs/QmW2vTCNM7Mr4vW5t9yBK7Zmh1FtaVjPwdAbyFcPNBSZYL",
        ],
        license: "Apache-2.0",
      },
      "lib/ERC725/implementations/contracts/custom/OwnableUnset.sol": {
        keccak256:
          "0xa9c83adb0239b86c0ff6251a03bc70115470c7ae10eb99276d6dd33636054b36",
        urls: [
          "bzz-raw://95a0109837bdffe887b6568b7f9bbde2b20cfd0c4db638805cf61ada5743b24d",
          "dweb:/ipfs/QmYH2erMtqiEYjRznWnc6NbBbwxvy6ArE45jtXYEyWi3Bc",
        ],
        license: "MIT",
      },
      "lib/ERC725/implementations/contracts/errors.sol": {
        keccak256:
          "0xaafdb4370450b8874224b3c0b2b712149da97a50c9a47f56e4b654aa57eb87c5",
        urls: [
          "bzz-raw://a4e40b0f64613e5bbd62575facc72d2bcad249595e9397b5bff063dc5a81e757",
          "dweb:/ipfs/QmXx5yDvPxWzKXFYK7HDAbSNDBKRskYLoDwgrThmAimzDL",
        ],
        license: "Apache-2.0",
      },
      "lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol": {
        keccak256:
          "0xa47c9e3eba0c733a1685b9fa309f753540c89ad2dca73236a2c953e7f5680e7b",
        urls: [
          "bzz-raw://59076395f660838919a2068cb7792c0fa70533642bbc5b4e3cc3cbb2c9ec7b50",
          "dweb:/ipfs/QmQqew3mDuyHCBdd4v1JiwRiKEbzk3LeHchzTHSdyhYg5b",
        ],
        license: "CC0-1.0",
      },
      "lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4Constants.sol":
        {
          keccak256:
            "0xdf9b7c688d39a92cb3238136a9f56554245d5ae9b6568dcd6164d0e15c6f56c7",
          urls: [
            "bzz-raw://bb36a427cdfa0f394d2d78014f85152ab383499fc3c3d6285d4b801c656e7c3f",
            "dweb:/ipfs/QmZJehfeWKfHLyZLufhs9u4ZyVztGCUNWXzFgfZSU837vU",
          ],
          license: "Apache-2.0",
        },
      "lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4DigitalAssetMetadataCore.sol":
        {
          keccak256:
            "0xc442e52d34bb98acc1494675856b1f1d124af1375d8e23a9bfcc3b6c1865e1fc",
          urls: [
            "bzz-raw://84254359ed929c1991136f9c3e934ddfa74cd85684de6c44cb70afa70d12f837",
            "dweb:/ipfs/QmWfmionUJJYyYDoeSQLGUHhou2sWxhWzwtU5GVjpumiSS",
          ],
          license: "Apache-2.0",
        },
      "lib/lsp-smart-contracts/packages/lsp4-contracts/contracts/LSP4Errors.sol":
        {
          keccak256:
            "0x3db7fd252ed02ce27686141125c3d65d3ff682a32601e1e8611becd9357a57b5",
          urls: [
            "bzz-raw://5aded62a160ed7f9860996004d1656e8592b3f97d478d8597f8ad6afbe4f34b7",
            "dweb:/ipfs/QmcnmLVt8cmz1iRNaX5c6iNYckRgUXGz8YkjHW9T1KNB5A",
          ],
          license: "Apache-2.0",
        },
      "lib/openzeppelin/contracts/utils/introspection/ERC165.sol": {
        keccak256:
          "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e",
        urls: [
          "bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9",
          "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf",
        ],
        license: "MIT",
      },
      "lib/openzeppelin/contracts/utils/introspection/IERC165.sol": {
        keccak256:
          "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        urls: [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX",
        ],
        license: "MIT",
      },
    },
    version: 1,
  },
  id: 33,
} as const;
