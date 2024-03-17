export default {
  "abi": [],
  "bytecode": {
    "object": "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220d9724181c11cdee1b6264bbe8fc2ea041f085bd0db7e93b000d58fdcc06721ca64736f6c63430008180033",
    "sourceMap": "525:69152:20:-:0;;;;;;;;;;;;;;;-1:-1:-1;;;525:69152:20;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220d9724181c11cdee1b6264bbe8fc2ea041f085bd0db7e93b000d58fdcc06721ca64736f6c63430008180033",
    "sourceMap": "525:69152:20:-:0;;;;;;;;",
    "linkReferences": {}
  },
  "methodIdentifiers": {},
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.24+commit.e11b9ed9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"The original console.sol uses `int` and `uint` for computing function selectors, but it should use `int256` and `uint256`. This modified version fixes that. This version is recommended over `console.sol` if you don't need compatibility with Hardhat as the logs will show up in forge stack traces. If you do need compatibility with Hardhat, you must use `console.sol`. Reference: https://github.com/NomicFoundation/hardhat/issues/2178\",\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/forge-std/src/console2.sol\":\"console2\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@/=lib/lsp-smart-contracts/node_modules/@/\",\":@erc725/smart-contracts/=lib/ERC725/implementations/\",\":@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/\",\":@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/\",\":@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/\",\":@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/\",\":@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/\",\":@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/\",\":@openzeppelin/=lib/openzeppelin/\",\":@openzeppelin/contracts/=lib/openzeppelin/contracts/\",\":ERC725/=lib/ERC725/\",\":ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/\",\":eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/\",\":lsp-smart-contracts/=lib/lsp-smart-contracts/\",\":openzeppelin/=lib/openzeppelin/\",\":solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/\"]},\"sources\":{\"lib/forge-std/src/console2.sol\":{\"keccak256\":\"0x954646445d1014c3cd85c7918f5e7adeeca5ee44b68c00bafa237e597a4e35ea\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://516fa3be52da4763147175bfba4be0aa011fadbb0c1afb01f97265bd4cee7973\",\"dweb:/ipfs/QmdixAyMJefx7qePChgdxcBH5MxhmN7vsqPuPLx3CgrVmF\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.24+commit.e11b9ed9"
    },
    "language": "Solidity",
    "output": {
      "abi": [],
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {},
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
        "lib/forge-std/src/console2.sol": "console2"
      },
      "evmVersion": "paris",
      "libraries": {}
    },
    "sources": {
      "lib/forge-std/src/console2.sol": {
        "keccak256": "0x954646445d1014c3cd85c7918f5e7adeeca5ee44b68c00bafa237e597a4e35ea",
        "urls": [
          "bzz-raw://516fa3be52da4763147175bfba4be0aa011fadbb0c1afb01f97265bd4cee7973",
          "dweb:/ipfs/QmdixAyMJefx7qePChgdxcBH5MxhmN7vsqPuPLx3CgrVmF"
        ],
        "license": "MIT"
      }
    },
    "version": 1
  },
  "id": 20
} as const;