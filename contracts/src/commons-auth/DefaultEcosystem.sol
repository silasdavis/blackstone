pragma solidity ^0.4.23;

import "commons-auth/Ecosystem.sol";

/**
 * @title DefaultEcosystem
 * @dev The default Ecosystem implementation
 */
contract DefaultEcosystem is Ecosystem {

    mapping (address => bool) publicKeys;

    constructor() public {
        owner = msg.sender;
    }

    function addExternalAddress(address _address)
        external
        pre_onlyByOwner
    {
        publicKeys[_address] = true;
    }

    function removeExternalAddress(address _address)
        external
        pre_onlyByOwner
    {
        delete publicKeys[_address];
    }

    function isKnownExternalAddress(address _address)
        external view
        returns (bool)
    {
        return publicKeys[_address];
    }
}