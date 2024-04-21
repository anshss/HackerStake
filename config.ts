export const signProtocolAddress = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";
export const signProtocolSchemaId = 13;

export const contractAddress = `0xa79A6326251B0051788DCa2337137afc678c2A7B`;

export const contractAbi = `
[
	  {
		"inputs": [
		  {
			"internalType": "string",
			"name": "_name",
			"type": "string"
		  },
		  {
			"internalType": "string",
			"name": "_symbol",
			"type": "string"
		  }
		],
		"stateMutability": "payable",
		"type": "constructor"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "spender",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		  }
		],
		"name": "Approval",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		  }
		],
		"name": "Transfer",
		"type": "event"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "owner",
			"type": "address"
		  },
		  {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		  }
		],
		"name": "allowance",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		  }
		],
		"name": "approve",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "balanceOf",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_amount",
			"type": "uint256"
		  },
		  {
			"internalType": "uint64",
			"name": "_attestationId",
			"type": "uint64"
		  }
		],
		"name": "borrowAmount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"name": "borrowedAmount",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes",
			"name": "receipent",
			"type": "bytes"
		  }
		],
		"name": "convertReceipentToAddress",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "pure",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "decimals",
		"outputs": [
		  {
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "subtractedValue",
			"type": "uint256"
		  }
		],
		"name": "decreaseAllowance",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint8",
			"name": "c",
			"type": "uint8"
		  }
		],
		"name": "fromHexChar",
		"outputs": [
		  {
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		  }
		],
		"stateMutability": "pure",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint64",
			"name": "attestationId",
			"type": "uint64"
		  }
		],
		"name": "getAttestation",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "string",
			"name": "s",
			"type": "string"
		  }
		],
		"name": "hexStringToAddress",
		"outputs": [
		  {
			"internalType": "bytes",
			"name": "",
			"type": "bytes"
		  }
		],
		"stateMutability": "pure",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "spender",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "addedValue",
			"type": "uint256"
		  }
		],
		"name": "increaseAllowance",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "_owner",
			"type": "address"
		  },
		  {
			"internalType": "address",
			"name": "_signProtocolAddress",
			"type": "address"
		  },
		  {
			"internalType": "uint64",
			"name": "_schemaId",
			"type": "uint64"
		  }
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "isInitialized",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "_user",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "_amount",
			"type": "uint256"
		  }
		],
		"name": "mintTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "name",
		"outputs": [
		  {
			"internalType": "string",
			"name": "",
			"type": "string"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "owner",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_amount",
			"type": "uint256"
		  }
		],
		"name": "repayAmount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "signProtocolAddress",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "symbol",
		"outputs": [
		  {
			"internalType": "string",
			"name": "",
			"type": "string"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "string",
			"name": "s",
			"type": "string"
		  }
		],
		"name": "toAddress",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "pure",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "to",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		  }
		],
		"name": "transfer",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "from",
			"type": "address"
		  },
		  {
			"internalType": "address",
			"name": "to",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		  }
		],
		"name": "transferFrom",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "nonpayable",
		"type": "function"
	  }
	]
`;
