export default {
  "abi": [
    {
      "type": "function",
      "name": "universalReceiver",
      "inputs": [
        {
          "name": "typeId",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "event",
      "name": "UniversalReceiver",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "typeId",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "receivedData",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        },
        {
          "name": "returnedValue",
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
    "universalReceiver(bytes32,bytes)": "6bb56a14"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.24+commit.e11b9ed9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"typeId\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"receivedData\",\"type\":\"bytes\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"returnedValue\",\"type\":\"bytes\"}],\"name\":\"UniversalReceiver\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"typeId\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"universalReceiver\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"payable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"LSP1UniversalReceiver allows to receive arbitrary messages and to be informed when assets are sent or received.\",\"events\":{\"UniversalReceiver(address,uint256,bytes32,bytes,bytes)\":{\"details\":\"Emitted when the {universalReceiver} function was called with a specific `typeId` and some `receivedData`\",\"params\":{\"from\":\"The address of the EOA or smart contract that called the {universalReceiver(...)} function.\",\"receivedData\":\"Any arbitrary data that was sent to the {universalReceiver(...)} function.\",\"returnedValue\":\"The value returned by the {universalReceiver(...)} function.\",\"typeId\":\"A `bytes32` unique identifier (= _\\\"hook\\\"_)that describe the type of notification, information or transaction received by the contract. Can be related to a specific standard or a hook.\",\"value\":\"The amount sent to the {universalReceiver(...)} function.\"}}},\"kind\":\"dev\",\"methods\":{\"universalReceiver(bytes32,bytes)\":{\"custom:events\":\"{UniversalReceiver} event.\",\"details\":\"Generic function that can be used to notify the contract about specific incoming transactions or events like asset transfers, vault transfers, etc. Allows for custom on-chain and off-chain reactions based on the `typeId` and `data`.\",\"params\":{\"data\":\"The arbitrary data received with the call.\",\"typeId\":\"The hash of a specific standard or a hook.\"}}},\"title\":\"Interface of the LSP1 - Universal Receiver standard, an entry function for a contract to receive arbitrary information.\",\"version\":1},\"userdoc\":{\"events\":{\"UniversalReceiver(address,uint256,bytes32,bytes,bytes)\":{\"notice\":\"Address `from` called the `universalReceiver(...)` function while sending `value` LYX. Notification type (typeId): `typeId` - Data received: `receivedData`.\"}},\"kind\":\"user\",\"methods\":{\"universalReceiver(bytes32,bytes)\":{\"notice\":\"Reacted on received notification with `typeId` & `data`.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/lsp-smart-contracts/packages/lsp1-contracts/contracts/ILSP1UniversalReceiver.sol\":\"ILSP1UniversalReceiver\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@/=lib/lsp-smart-contracts/node_modules/@/\",\":@erc725/smart-contracts/=lib/ERC725/implementations/\",\":@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/\",\":@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/\",\":@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/\",\":@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/\",\":@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/\",\":@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/\",\":@openzeppelin/=lib/openzeppelin/\",\":@openzeppelin/contracts/=lib/openzeppelin/contracts/\",\":ERC725/=lib/ERC725/\",\":ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/\",\":eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/\",\":lsp-smart-contracts/=lib/lsp-smart-contracts/\",\":openzeppelin/=lib/openzeppelin/\",\":solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/\"]},\"sources\":{\"lib/lsp-smart-contracts/packages/lsp1-contracts/contracts/ILSP1UniversalReceiver.sol\":{\"keccak256\":\"0x5b8764a678dc9d6673eafa8ad0ee6053cdea30acb58015bdf9c93f9f1788b49b\",\"license\":\"Apache-2.0\",\"urls\":[\"bzz-raw://0e26dcf5d66120b7a0895ddcaec92207e17c63344fca885d2b7e3fe953ec027c\",\"dweb:/ipfs/QmetAuz9etfz9BG9oPJCwMthnhfd8XvZYLBmMfrPNUm3qV\"]}},\"version\":1}",
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
              "internalType": "address",
              "name": "from",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "typeId",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes",
              "name": "receivedData",
              "type": "bytes",
              "indexed": false
            },
            {
              "internalType": "bytes",
              "name": "returnedValue",
              "type": "bytes",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "UniversalReceiver",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "typeId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "universalReceiver",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ]
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "universalReceiver(bytes32,bytes)": {
            "custom:events": "{UniversalReceiver} event.",
            "details": "Generic function that can be used to notify the contract about specific incoming transactions or events like asset transfers, vault transfers, etc. Allows for custom on-chain and off-chain reactions based on the `typeId` and `data`.",
            "params": {
              "data": "The arbitrary data received with the call.",
              "typeId": "The hash of a specific standard or a hook."
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "universalReceiver(bytes32,bytes)": {
            "notice": "Reacted on received notification with `typeId` & `data`."
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
        "lib/lsp-smart-contracts/packages/lsp1-contracts/contracts/ILSP1UniversalReceiver.sol": "ILSP1UniversalReceiver"
      },
      "evmVersion": "paris",
      "libraries": {}
    },
    "sources": {
      "lib/lsp-smart-contracts/packages/lsp1-contracts/contracts/ILSP1UniversalReceiver.sol": {
        "keccak256": "0x5b8764a678dc9d6673eafa8ad0ee6053cdea30acb58015bdf9c93f9f1788b49b",
        "urls": [
          "bzz-raw://0e26dcf5d66120b7a0895ddcaec92207e17c63344fca885d2b7e3fe953ec027c",
          "dweb:/ipfs/QmetAuz9etfz9BG9oPJCwMthnhfd8XvZYLBmMfrPNUm3qV"
        ],
        "license": "Apache-2.0"
      }
    },
    "version": 1
  },
  "id": 28
} as const;