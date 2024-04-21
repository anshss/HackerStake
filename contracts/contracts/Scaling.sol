//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

enum DataLocation {
    ONCHAIN,
    ARWEAVE,
    IPFS,
    CUSTOM
}

struct Attestation {
    uint64 schemaId;
    uint64 linkedAttestationId;
    uint64 attestTimestamp;
    uint64 revokeTimestamp;
    address attester;
    uint64 validUntil;
    DataLocation dataLocation;
    bool revoked;
    bytes[] recipients;
    bytes data;
}

interface ISP {
    function getAttestation(uint64 attestationId) external view returns (Attestation memory);
}

contract Scaling is ERC20 {

    address public owner;    
    address public signProtocolAddress;
    uint64 schemaId;
    bool public isInitialized;

    mapping (address => uint) public borrowedAmount;

    constructor(string memory _name, string memory _symbol) ERC20("TUSDT", "TestUSDT") payable {}

    function initialize(address _owner, address _signProtocolAddress, uint64 _schemaId) public {
        require(!isInitialized, "Already initialized");
        isInitialized = true;
        owner = _owner;      
        signProtocolAddress = _signProtocolAddress;
        schemaId = _schemaId;
    }

    function mintTo(address _user, uint _amount) public {
        _mint(_user, _amount * 10 ** 18);
    }

    function borrowAmount(uint _amount, uint64 _attestationId) public payable{
        require(getAttestation(_attestationId) == msg.sender);
        borrowedAmount[msg.sender] = _amount;
        mintTo(msg.sender, _amount);
    }

    function repayAmount(uint _amount) public payable{
        require(_amount == msg.value);
        borrowedAmount[msg.sender] = borrowedAmount[msg.sender] - _amount;
    }

    function getAttestation(uint64 attestationId) public view returns (address) {
        Attestation memory attestation = ISP(signProtocolAddress).getAttestation(attestationId);
        address receipent = convertReceipentToAddress(attestation.recipients[0]);
        return receipent;
    }

    function convertReceipentToAddress(bytes memory receipent) public pure returns (address) {
        return toAddress(abi.decode(receipent, (string)));
    }

    function toAddress(string memory s) public pure returns (address) {
        bytes memory _bytes = hexStringToAddress(s);
        require(_bytes.length >= 1 + 20, "toAddress_outOfBounds");
        address tempAddress;
        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), 1)), 0x1000000000000000000000000)
        }
        return tempAddress;
    }

    function hexStringToAddress(string memory s) public pure returns (bytes memory) {
        bytes memory ss = bytes(s);
        require(ss.length%2 == 0); // length must be even
        bytes memory r = new bytes(ss.length/2);
        for (uint i=0; i<ss.length/2; ++i) {
            r[i] = bytes1(fromHexChar(uint8(ss[2*i])) * 16 +
                        fromHexChar(uint8(ss[2*i+1])));
        }
        return r;
    }

    function fromHexChar(uint8 c) public pure returns (uint8) {
        if (bytes1(c) >= bytes1('0') && bytes1(c) <= bytes1('9')) {
            return c - uint8(bytes1('0'));
        }
        if (bytes1(c) >= bytes1('a') && bytes1(c) <= bytes1('f')) {
            return 10 + c - uint8(bytes1('a'));
        }
        if (bytes1(c) >= bytes1('A') && bytes1(c) <= bytes1('F')) {
            return 10 + c - uint8(bytes1('A'));
        }
        return 0;
    }
}