pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-auth/Ecosystem.sol";
import "commons-collections/Mappings.sol";
import "commons-collections/MappingsLib.sol";

/**
 * @title DefaultEcosystem
 * @dev The default Ecosystem implementation
 */
contract DefaultEcosystem is Ecosystem {

    using MappingsLib for Mappings.Bytes32AddressMap;
    
    mapping (address => bool) publicKeys;
    Mappings.Bytes32AddressMap userAccounts;

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

    function addUserAccount(bytes32 _id, address _userAccount) 
        external
    {
        ErrorsLib.revertIf(
            userAccounts.exists(_id), 
            ErrorsLib.RESOURCE_ALREADY_EXISTS(),
            "DefaultEcosystem.addUserAccount",
            "User with same ID already exists in given ecosystem"
        );
        ErrorsLib.revertIf(
            (_id == "" || _userAccount == 0x0), 
            ErrorsLib.RESOURCE_ALREADY_EXISTS(),
            "DefaultEcosystem.addUserAccount",
            "User ID and account address both are required fields"
        );
        uint error = userAccounts.insert(_id, _userAccount);
        ErrorsLib.revertIf(
            error != BaseErrors.NO_ERROR(), 
            ErrorsLib.RESOURCE_ALREADY_EXISTS(),
            "DefaultEcosystem.addUserAccount",
            "User with same ID already exists in given ecosystem"
        );
    }

    function getUserAccount(bytes32 _id)
        external
        view
        returns (address _account) 
    {
        return userAccounts.get(_id);
    }
}