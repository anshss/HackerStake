export const signProtocolAddress = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";
export const signProtocolSchemaId = 13;

export const contractAddress = ``

export const contractAbi = `[
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
				"components": [
					{
						"internalType": "uint64",
						"name": "schemaId",
						"type": "uint64"
					},
					{
						"internalType": "uint64",
						"name": "linkedAttestationId",
						"type": "uint64"
					},
					{
						"internalType": "uint64",
						"name": "attestTimestamp",
						"type": "uint64"
					},
					{
						"internalType": "uint64",
						"name": "revokeTimestamp",
						"type": "uint64"
					},
					{
						"internalType": "address",
						"name": "attester",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "validUntil",
						"type": "uint64"
					},
					{
						"internalType": "enum DataLocation",
						"name": "dataLocation",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "revoked",
						"type": "bool"
					},
					{
						"internalType": "bytes[]",
						"name": "recipients",
						"type": "bytes[]"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct Attestation",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`