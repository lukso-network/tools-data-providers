export default {
  "abi": [
    {
      "type": "function",
      "name": "getData",
      "inputs": [
        {
          "name": "dataKey",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "dataValue",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDataBatch",
      "inputs": [
        {
          "name": "dataKeys",
          "type": "bytes32[]",
          "internalType": "bytes32[]"
        }
      ],
      "outputs": [
        {
          "name": "dataValues",
          "type": "bytes[]",
          "internalType": "bytes[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "setData",
      "inputs": [
        {
          "name": "dataKey",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "dataValue",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "setDataBatch",
      "inputs": [
        {
          "name": "dataKeys",
          "type": "bytes32[]",
          "internalType": "bytes32[]"
        },
        {
          "name": "dataValues",
          "type": "bytes[]",
          "internalType": "bytes[]"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "DataChanged",
      "inputs": [
        {
          "name": "dataKey",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "dataValue",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    }
  ],
  "bytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x",
    "sourceMap": "",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "getData(bytes32)": "54f6127f",
    "getDataBatch(bytes32[])": "dedff9c6",
    "setData(bytes32,bytes)": "7f23690c",
    "setDataBatch(bytes32[],bytes[])": "97902421",
    "supportsInterface(bytes4)": "01ffc9a7"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.24+commit.e11b9ed9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"dataKey\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"dataValue\",\"type\":\"bytes\"}],\"name\":\"DataChanged\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"dataKey\",\"type\":\"bytes32\"}],\"name\":\"getData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"dataValue\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"dataKeys\",\"type\":\"bytes32[]\"}],\"name\":\"getDataBatch\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"dataValues\",\"type\":\"bytes[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"dataKey\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"dataValue\",\"type\":\"bytes\"}],\"name\":\"setData\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"dataKeys\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes[]\",\"name\":\"dataValues\",\"type\":\"bytes[]\"}],\"name\":\"setDataBatch\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"ERC725Y provides the ability to set arbitrary data key/value pairs that can be changed over time. It is intended to standardise certain data key/value pairs to allow automated read and writes from/to the contract storage.\",\"events\":{\"DataChanged(bytes32,bytes)\":{\"details\":\"Emitted when data at a specific `dataKey` was changed to a new value `dataValue`.\",\"params\":{\"dataKey\":\"The data key for which a bytes value is set.\",\"dataValue\":\"The value to set for the given data key.\"}}},\"kind\":\"dev\",\"methods\":{\"getData(bytes32)\":{\"details\":\"Get in the ERC725Y storage the bytes data stored at a specific data key `dataKey`.\",\"params\":{\"dataKey\":\"The data key for which to retrieve the value.\"},\"returns\":{\"dataValue\":\"The bytes value stored under the specified data key.\"}},\"getDataBatch(bytes32[])\":{\"details\":\"Get in the ERC725Y storage the bytes data stored at multiple data keys `dataKeys`.\",\"params\":{\"dataKeys\":\"The array of keys which values to retrieve\"},\"returns\":{\"dataValues\":\"The array of data stored at multiple keys\"}},\"setData(bytes32,bytes)\":{\"details\":\"Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.\",\"params\":{\"dataKey\":\"The data key for which to set a new value.\",\"dataValue\":\"The new bytes value to set.\"}},\"setDataBatch(bytes32[],bytes[])\":{\"details\":\"Batch data setting function that behaves the same as {setData} but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.\",\"params\":{\"dataKeys\":\"An array of data keys to set bytes values for.\",\"dataValues\":\"An array of bytes values to set for each `dataKeys`.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"}},\"title\":\"The interface for ERC725Y sub-standard, a generic data key/value store.\",\"version\":1},\"userdoc\":{\"events\":{\"DataChanged(bytes32,bytes)\":{\"notice\":\"The following data key/value pair has been changed in the ERC725Y storage: Data key: `dataKey`, data value: `dataValue`.\"}},\"kind\":\"user\",\"methods\":{\"getData(bytes32)\":{\"notice\":\"Reading the ERC725Y storage for data key `dataKey` returned the following value: `dataValue`.\"},\"getDataBatch(bytes32[])\":{\"notice\":\"Reading the ERC725Y storage for data keys `dataKeys` returned the following values: `dataValues`.\"},\"setData(bytes32,bytes)\":{\"notice\":\"Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`.\"},\"setDataBatch(bytes32[],bytes[])\":{\"notice\":\"Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol\":\"IERC725Y\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@/=lib/lsp-smart-contracts/node_modules/@/\",\":@erc725/smart-contracts/=lib/ERC725/implementations/\",\":@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/\",\":@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/\",\":@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/\",\":@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/\",\":@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/\",\":@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/\",\":@openzeppelin/=lib/openzeppelin/\",\":@openzeppelin/contracts/=lib/openzeppelin/contracts/\",\":ERC725/=lib/ERC725/\",\":ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/\",\":eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/\",\":lsp-smart-contracts/=lib/lsp-smart-contracts/\",\":openzeppelin/=lib/openzeppelin/\",\":solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/\"]},\"sources\":{\"lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol\":{\"keccak256\":\"0xa47c9e3eba0c733a1685b9fa309f753540c89ad2dca73236a2c953e7f5680e7b\",\"license\":\"CC0-1.0\",\"urls\":[\"bzz-raw://59076395f660838919a2068cb7792c0fa70533642bbc5b4e3cc3cbb2c9ec7b50\",\"dweb:/ipfs/QmQqew3mDuyHCBdd4v1JiwRiKEbzk3LeHchzTHSdyhYg5b\"]},\"lib/openzeppelin/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e\",\"dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.24+commit.e11b9ed9"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "dataKey",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes",
              "name": "dataValue",
              "type": "bytes",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "DataChanged",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "dataKey",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getData",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "dataValue",
              "type": "bytes"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32[]",
              "name": "dataKeys",
              "type": "bytes32[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getDataBatch",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "dataValues",
              "type": "bytes[]"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "dataKey",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "dataValue",
              "type": "bytes"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "setData"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32[]",
              "name": "dataKeys",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes[]",
              "name": "dataValues",
              "type": "bytes[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "setDataBatch"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "getData(bytes32)": {
            "details": "Get in the ERC725Y storage the bytes data stored at a specific data key `dataKey`.",
            "params": {
              "dataKey": "The data key for which to retrieve the value."
            },
            "returns": {
              "dataValue": "The bytes value stored under the specified data key."
            }
          },
          "getDataBatch(bytes32[])": {
            "details": "Get in the ERC725Y storage the bytes data stored at multiple data keys `dataKeys`.",
            "params": {
              "dataKeys": "The array of keys which values to retrieve"
            },
            "returns": {
              "dataValues": "The array of data stored at multiple keys"
            }
          },
          "setData(bytes32,bytes)": {
            "details": "Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.",
            "params": {
              "dataKey": "The data key for which to set a new value.",
              "dataValue": "The new bytes value to set."
            }
          },
          "setDataBatch(bytes32[],bytes[])": {
            "details": "Batch data setting function that behaves the same as {setData} but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.",
            "params": {
              "dataKeys": "An array of data keys to set bytes values for.",
              "dataValues": "An array of bytes values to set for each `dataKeys`."
            }
          },
          "supportsInterface(bytes4)": {
            "details": "Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas."
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "getData(bytes32)": {
            "notice": "Reading the ERC725Y storage for data key `dataKey` returned the following value: `dataValue`."
          },
          "getDataBatch(bytes32[])": {
            "notice": "Reading the ERC725Y storage for data keys `dataKeys` returned the following values: `dataValues`."
          },
          "setData(bytes32,bytes)": {
            "notice": "Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`."
          },
          "setDataBatch(bytes32[],bytes[])": {
            "notice": "Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`."
          }
        },
        "version": 1
      }
    },
    "settings": {
      "remappings": [
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
        "solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/"
      ],
      "optimizer": {
        "enabled": true,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs"
      },
      "compilationTarget": {
        "lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol": "IERC725Y"
      },
      "evmVersion": "paris",
      "libraries": {}
    },
    "sources": {
      "lib/ERC725/implementations/contracts/interfaces/IERC725Y.sol": {
        "keccak256": "0xa47c9e3eba0c733a1685b9fa309f753540c89ad2dca73236a2c953e7f5680e7b",
        "urls": [
          "bzz-raw://59076395f660838919a2068cb7792c0fa70533642bbc5b4e3cc3cbb2c9ec7b50",
          "dweb:/ipfs/QmQqew3mDuyHCBdd4v1JiwRiKEbzk3LeHchzTHSdyhYg5b"
        ],
        "license": "CC0-1.0"
      },
      "lib/openzeppelin/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        "urls": [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"
        ],
        "license": "MIT"
      }
    },
    "version": 1
  },
  "id": 4
} as const;