export default {
  "abi": [],
  "bytecode": {
    "object": "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e08dc758e589297ad61d694f4c5c23834f3ab7dd031c4798e9624e2a5b281e5764736f6c63430008180033",
    "sourceMap": "1330:11640:42:-:0;;;;;;;;;;;;;;;-1:-1:-1;;;1330:11640:42;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e08dc758e589297ad61d694f4c5c23834f3ab7dd031c4798e9624e2a5b281e5764736f6c63430008180033",
    "sourceMap": "1330:11640:42:-:0;;;;;;;;",
    "linkReferences": {}
  },
  "methodIdentifiers": {},
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.24+commit.e11b9ed9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"Library for managing https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive types. Sets have the following properties: - Elements are added, removed, and checked for existence in constant time (O(1)). - Elements are enumerated in O(n). No guarantees are made on the ordering. ```solidity contract Example {     // Add the library methods     using EnumerableSet for EnumerableSet.AddressSet;     // Declare a set state variable     EnumerableSet.AddressSet private mySet; } ``` As of v3.3.0, sets of type `bytes32` (`Bytes32Set`), `address` (`AddressSet`) and `uint256` (`UintSet`) are supported. [WARNING] ==== Trying to delete such a structure from storage will likely result in data corruption, rendering the structure unusable. See https://github.com/ethereum/solidity/pull/11843[ethereum/solidity#11843] for more info. In order to clean an EnumerableSet, you can either remove all elements one by one or create a fresh instance using an array of EnumerableSet. ====\",\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"lib/openzeppelin/contracts/utils/structs/EnumerableSet.sol\":\"EnumerableSet\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@/=lib/lsp-smart-contracts/node_modules/@/\",\":@erc725/smart-contracts/=lib/ERC725/implementations/\",\":@lukso/lsp1-contracts/=lib/lsp-smart-contracts/packages/lsp1-contracts/\",\":@lukso/lsp2-contracts/=lib/lsp-smart-contracts/packages/lsp2-contracts/\",\":@lukso/lsp3-contracts/=lib/lsp-smart-contracts/packages/lsp3-contracts/\",\":@lukso/lsp4-contracts/=lib/lsp-smart-contracts/packages/lsp4-contracts/\",\":@lukso/lsp5-contracts/=lib/lsp-smart-contracts/packages/lsp5-contracts/\",\":@lukso/lsp6-contracts/=lib/lsp-smart-contracts/packages/lsp6-contracts/\",\":@openzeppelin/=lib/openzeppelin/\",\":@openzeppelin/contracts/=lib/openzeppelin/contracts/\",\":ERC725/=lib/ERC725/\",\":ds-test/=lib/lsp-smart-contracts/lib/forge-std/lib/ds-test/src/\",\":eth-gas-reporter/=lib/lsp-smart-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":hardhat-deploy/=lib/lsp-smart-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/lsp-smart-contracts/node_modules/hardhat/\",\":lsp-smart-contracts/=lib/lsp-smart-contracts/\",\":openzeppelin/=lib/openzeppelin/\",\":solidity-bytes-utils/=lib/lsp-smart-contracts/node_modules/solidity-bytes-utils/\"]},\"sources\":{\"lib/openzeppelin/contracts/utils/structs/EnumerableSet.sol\":{\"keccak256\":\"0x86c1470cbfd878491e5de030072b647352d36bd27122cffb928970b1945282aa\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ad85dd393ee0a1917c57046abc5155f51f77844b2c6a42c05c1b8dd26d6ff3c1\",\"dweb:/ipfs/QmNqYc8To2NdnpP6E1tGz7t6A7beuENde5yovwov5pW1fA\"]}},\"version\":1}",
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
        "lib/openzeppelin/contracts/utils/structs/EnumerableSet.sol": "EnumerableSet"
      },
      "evmVersion": "paris",
      "libraries": {}
    },
    "sources": {
      "lib/openzeppelin/contracts/utils/structs/EnumerableSet.sol": {
        "keccak256": "0x86c1470cbfd878491e5de030072b647352d36bd27122cffb928970b1945282aa",
        "urls": [
          "bzz-raw://ad85dd393ee0a1917c57046abc5155f51f77844b2c6a42c05c1b8dd26d6ff3c1",
          "dweb:/ipfs/QmNqYc8To2NdnpP6E1tGz7t6A7beuENde5yovwov5pW1fA"
        ],
        "license": "MIT"
      }
    },
    "version": 1
  },
  "id": 42
} as const;